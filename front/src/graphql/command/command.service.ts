import { useQuery, useMutation, useResult } from '@vue/apollo-composable';
import {
  CREATE_COMMAND,
  CreateCommandData,
  DELETE_COMMAND,
  DeleteCommandData,
  PAGINATE_COMMAND,
  PaginateCommandsData,
} from './command.sdl';
import {
  Command,
  CommandLineInput,
  MutationCreateCommandArgs, MutationDeleteCommandArgs,
  PaginationInput,
  QueryPaginateCommandsArgs,
} from '../types';
import { reactive, ref } from 'vue';
import { cloneDeep, removeDialog } from '../utils/utils';
import { InitialPagination } from '../utils/pagination';
import { notify } from '../../shared/notification';

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
                    return {
                      ...existingRef,
                      items: existingRef.items.filter((eRef: any) => readField('id', eRef) !== id)
                    }
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
