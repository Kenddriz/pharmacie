import { useQuery } from '@vue/apollo-composable';
import { PAGINATE_COMMAND, PaginateCommandsData } from './command.sdl';
import { Command, CommandPagination, PaginationInput, QueryPaginateCommandsArgs } from '../types';
import { reactive, ref } from 'vue';
import { cloneDeep } from '../utils/utils';
import { InitialPagination } from '../utils/pagination';

export const paginationInput = reactive<PaginationInput>({
  page: 1,
  limit: Math.ceil((screen.height - 150)/50),
});
export const usePaginateCommands = () => {
  const { onResult, loading: paginateLoading } = useQuery<
    PaginateCommandsData,
    QueryPaginateCommandsArgs
    >(PAGINATE_COMMAND, { paginationInput });

  const selectedCmd = ref<Command|undefined>(undefined);
  const commands = reactive<CommandPagination>(InitialPagination);
  let selectedIndex = 0;
  const setSelectedCmd = (index: number) => {
    selectedCmd.value = cloneDeep(commands.items[index]);
    selectedIndex = index;
  }
  onResult(({ data }) => {
    if(data.paginateCommands && data.paginateCommands.items.length) {
      selectedCmd.value =  cloneDeep(data.paginateCommands.items[selectedIndex]);
      Object.assign(commands, data.paginateCommands);
    }
  });

  return { commands, paginateLoading, selectedCmd, setSelectedCmd }
}
