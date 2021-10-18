import { useQuery, useMutation, useResult } from '@vue/apollo-composable';
import {
  COMMANDS_MONTHLY,
  CommandsMonthlyData,
  CREATE_COMMAND,
  CreateCommandData,
  PAGINATE_COMMAND, PAGINATE_DELETED_COMMANDS,
  PaginateCommandsData,
  PaginateDeletedCommandsData, REMOVE_COMMAND,
  RemoveCommandData,
  RESTORE_COMMAND,
  RestoreCommandData,
  SOFT_REMOVE_COMMAND,
  SoftRemoveCommandData,
} from './command.sdl';
import {
  Command,
  CommandLineInput,
  MutationCreateCommandArgs,
  MutationRemoveCommandArgs,
  MutationRestoreCommandArgs,
  MutationSoftRemoveCommandArgs,
  PaginationInput,
  QueryCommandsMonthlyArgs,
  QueryPaginateCommandsArgs,
  QueryPaginateDeletedCommandsArgs,
  PaginateProviderCommandsInput,
  ProviderCommandsInput
} from '../types';
import { reactive, ref } from 'vue';
import { removeDialog } from '../utils/utils';
import { addPaginationCache, deletePaginationCache, InitialPagination } from '../utils/pagination';
import { notify } from '../../shared/notification';
import { Loading } from 'quasar';

export type Serie = {
  name: string,
  type: string,
  data: Array<number>
}
const lim = Math.ceil((screen.height - 150)/50);
export const usePaginateCommands = (
  limit = lim, providerInput: ProviderCommandsInput|undefined = undefined
) => {
  const input = reactive<PaginateProviderCommandsInput>({
    page: 1,
    limit
  });
  if(providerInput) Object.assign(input, { providerInput });
  const selectedCmd = ref<Command[]>([]);
  const { result, loading: pcLoading } = useQuery<
    PaginateCommandsData,
    QueryPaginateCommandsArgs
    >(PAGINATE_COMMAND, { input });

  const commands = useResult(result, InitialPagination, pick => {
    if(pick?.paginateCommands) {
      const find = pick.paginateCommands.items.find(c => c.id === selectedCmd.value[0]?.id)||pick.paginateCommands.items[0];
      if(find){
        if(selectedCmd.value.length)Object.assign(selectedCmd.value[0], {...find});
        else selectedCmd.value.push({...find });
      }
      return pick.paginateCommands;
    }
    selectedCmd.value.length = 0;
    return InitialPagination;
  });
  function setSelectedCmd(index: number) {
    Object.assign(selectedCmd.value[0], commands.value.items[index]);
  }
  return {
    commands,
    pcLoading,
    selectedCmd,
    setSelectedCmd,
    input
  }
}
export const useCreateCommand = () => {
  const { loading: ccLoading, mutate, onDone } = useMutation<
    CreateCommandData,
    MutationCreateCommandArgs
    >(CREATE_COMMAND, {
    update(cache, { data }){
      if(data) {
        cache.modify({
          fields: {
            paginateCommands(existing: any, {toReference}) {
              return addPaginationCache(data.createCommand, existing, toReference);
            }
          }
        })
      }
    }
  });
  onDone(() => {
    notify('Commande enregistrée !');
  })
 function createCommand(providerId: number, commandLines: CommandLineInput[]) {
   void mutate({ input: { providerId, commandLines } });
 }
  return {
    ccLoading,
    createCommand
  }
}
export const useCommandsMonthly = () => {
  const year = ref<number>(new Date().getFullYear());
  const { loading, refetch, result } = useQuery<
    CommandsMonthlyData,
    QueryCommandsMonthlyArgs
    >(COMMANDS_MONTHLY, { year: year.value });
  function updateSeries() {
    void refetch({ year: year.value })
  }
  const chartSeries = useResult<
    CommandsMonthlyData|undefined,
    Serie[],
    Serie[]
    >(result, [], pick => {
    const series: Serie[] = [
      {
        name: 'Commandes ',
        type: 'column',
        data: []
      },
      {
        name: 'Livraisons ',
        type: 'line',
        data: []
      }
    ];
    if(pick?.commandsMonthly) {
      for (let i = 1; i <= 12; i++) {
        const pcChart = pick.commandsMonthly.find(p => p.month === i);
        series[0].data.push(pcChart?.command||0);
        series[1].data.push(pcChart?.invoice||0);
      }
    }
    return series;
  });
  return {
    loading,
    updateSeries,
    chartSeries
  }
}

export const usePaginateDeletedCommands = () => {
  const input = reactive<PaginationInput>({
    page: 1,
    limit : 5
  });
  const { loading, result } = useQuery<
    PaginateDeletedCommandsData,
    QueryPaginateDeletedCommandsArgs
    >(PAGINATE_DELETED_COMMANDS, { input });
  const command = useResult(result, InitialPagination, pick => pick?.paginateDeletedCommands||InitialPagination)
  return {
    input,
    loading,
    command
  }
}
export const useSoftRemoveCommand = () => {
  const { onDone, mutate } = useMutation<
    SoftRemoveCommandData,
    MutationSoftRemoveCommandArgs
    >(SOFT_REMOVE_COMMAND);
  onDone(() => {
    Loading.hide();
    notify('suppression avec succès !');
  });
  function softRemoveCommand(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Suppression ...' });
      void mutate({ id }, {
        update(cache, { data }) {
          if(data?.softRemoveCommand) {
            cache.modify({
              fields: {
                paginateCommands(existingRef: any, { readField, toReference }) {
                  return deletePaginationCache(id, existingRef, readField, toReference);
                },
                paginateDeletedCommands(existingRef: any, { readField }) {
                  return addPaginationCache(data.softRemoveCommand, existingRef, readField);
                }
              }
            })
          }
        }
      })
    })
  }
  return { softRemoveCommand }
}
export const useRestoreCommand = () => {
  const { mutate, onDone } = useMutation<
    RestoreCommandData,
    MutationRestoreCommandArgs
    >(RESTORE_COMMAND);
  onDone(({ data }) => {
    Loading.hide();
    notify(data?.restoreCommand ? 'Restauration avec succès !' : 'Echec de restauration');
  });
  function restore(id: number) {
    Loading.show({ message: 'Restauration ...'});
    void mutate({ id }, {
      update: (cache, { data }) => {
        if(data?.restoreCommand) {
          cache.modify({
            fields: {
              paginateCommands(existing: any, {toReference}) {
                return addPaginationCache(data.restoreCommand, existing, toReference);
              },
              paginateDeletedCommands(existing: any, {readField, toReference}) {
                return deletePaginationCache(id, existing, readField,  toReference);
              }
            }
          })
        }
      }
    })
  }
  return { restore }
}
export const useRemoveCommand = () => {
  const { onDone, mutate} = useMutation<
    RemoveCommandData,
    MutationRemoveCommandArgs
    >(REMOVE_COMMAND);
  onDone(() => {
    Loading.hide();
    notify('suppression avec succès !');
  });
  function remove(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Exécution de l\'opération ...' });
      void mutate({ id }, {
        update(cache, { data }) {
          if(data?.removeCommand) {
            cache.modify({
              fields: {
                paginateDeletedCommands(existingRef: any, { readField, toReference }) {
                  return deletePaginationCache(id, existingRef, readField, toReference);
                }
              }
            })
          }
        }
      })
    }, 'removeForever')
  }
  return { remove }
}
