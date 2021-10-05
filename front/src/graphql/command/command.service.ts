import { useQuery, useMutation, useResult } from '@vue/apollo-composable';
import {
  COMMANDS_MONTHLY,
  CommandsMonthlyData,
  CREATE_COMMAND,
  CreateCommandData,
  DELETE_COMMAND,
  DeleteCommandData,
  PAGINATE_COMMAND,
  PaginateCommandsData,
} from './command.sdl';
import {
  Command,
  CommandLineInput, Meta,
  MutationCreateCommandArgs, MutationDeleteCommandArgs,
  PaginationInput, QueryCommandsMonthlyArgs,
  QueryPaginateCommandsArgs,
} from '../types';
import { reactive, ref } from 'vue';
import { cloneDeep, removeDialog } from '../utils/utils';
import { InitialPagination } from '../utils/pagination';
import { notify } from '../../shared/notification';
import { deleteCommandCache } from './update.cache';

export type Serie = {
  name: string,
  type: string,
  data: Array<number>
}
export const usePaginateCommands = () => {
  const paginationInput = reactive<PaginationInput>({
    page: 1,
    limit: Math.ceil((screen.height - 150)/50),
  });
  const selectedCmd = ref<Command[]>([]);

  const { result, loading: pcLoading } = useQuery<
    PaginateCommandsData,
    QueryPaginateCommandsArgs
    >(PAGINATE_COMMAND, { paginationInput });

  const commands = useResult(result, InitialPagination, res => {
    if(res?.paginateCommands) {
      const id = selectedCmd.value[0]?.id;
      selectedCmd.value.length = 0;
      const find = res.paginateCommands.items.find(item => item.id === id)||res.paginateCommands.items[0];
      if(find)selectedCmd.value = [cloneDeep(find)];
      return res.paginateCommands;
    }
    return InitialPagination
  });
  function setSelectedCmd(index: number) {
    Object.assign(selectedCmd.value[0], commands.value.items[index]);
  }
  return {
    commands,
    pcLoading,
    selectedCmd,
    setSelectedCmd,
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
              return {
                ...existing,
                items: [...existing.items, toReference(data.createCommand)]
              }
            },
            providerCommands(existingRef: any, { toReference }){
              const meta: Meta = { ...existingRef.meta };
              meta.totalItems += 1;
              meta.totalPages += 1;
              return {
                ...existingRef,
                meta: toReference(meta)
              }
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
export const useDeleteCommand = () => {
  const { loading:dcLoading, mutate, onDone} = useMutation<
    DeleteCommandData,
    MutationDeleteCommandArgs
    >(DELETE_COMMAND);
  onDone(({ data }) => {
    if(data?.deleteCommand)
      notify('La commande a été supprimée');
    else notify('La suppression a echouée, veuillez réessayer');
  });
  function deleteCommand(id: number) {
    removeDialog(
      () => {
        void mutate({id}, {
          update(cache, { data}){
            if(data?.deleteCommand) {
              cache.modify({
                fields: {
                  paginateCommands(existingRef: any, { readField }) {
                    return deleteCommandCache(existingRef, readField, id);
                  },
                  providerCommands(existingRef: any, { readField }) {
                    return deleteCommandCache(existingRef, readField, id);
                  }
                }
              })
            }
          }
        })
      },
      'removeForever'
    );
  }
  return {
    dcLoading,
    deleteCommand
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
