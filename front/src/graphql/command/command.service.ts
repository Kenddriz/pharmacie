import { useQuery, useMutation, useResult } from '@vue/apollo-composable';
import { CREATE_COMMAND, CreateCommandData, PAGINATE_COMMAND, PaginateCommandsData } from './command.sdl';
import {
  Command,
  CommandLineInput,
  MutationCreateCommandArgs,
  PaginationInput,
  QueryPaginateCommandsArgs,
} from '../types';
import { reactive, ref } from 'vue';
import { cloneDeep } from '../utils/utils';
import { InitialPagination } from '../utils/pagination';
import { notify } from '../../shared/notification';

export const usePaginateCommands = () => {
  const paginationInput = reactive<PaginationInput>({
    page: 1,
    limit: Math.ceil((screen.height - 150)/50),
  });

  const { result, loading: paginateLoading } = useQuery<
    PaginateCommandsData,
    QueryPaginateCommandsArgs
    >(PAGINATE_COMMAND, { paginationInput });

  const selectedCmd = ref<Command|undefined>(undefined);
  const commands = useResult(result, InitialPagination, res => {
    if(res?.paginateCommands && res?.paginateCommands.items.length) {
      selectedCmd.value = cloneDeep(res.paginateCommands.items[0]);
      return res.paginateCommands;
    }
    return InitialPagination
  });
  const setSelectedCmd = (index: number) => {
    Object.assign(selectedCmd.value, commands.value.items[index]);
  }
  return { commands, paginateLoading, selectedCmd, setSelectedCmd }
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
