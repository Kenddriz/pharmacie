import { useQuery, useResult } from '@vue/apollo-composable';
import { PAGINATE_COMMAND, PaginateCommandsData } from './paginate-commands.sdl';
import { InitialPagination } from '../../shared/pagination';
import { reactive, ref } from 'vue';
import { Command, PaginationInput, QueryPaginateCommandsArgs } from '../../types';
import { cloneDeep } from '../../shared/utils';

export const paginationInput = reactive<PaginationInput>({
  page: 1,
  limit: Math.ceil((screen.height - 150)/50),
});
export const usePaginateCommands = () => {
  const selectedCmd = ref<Command|undefined>(undefined);
  let selectedIndex = 0;
  const setSelectedCmd = (index: number) => {
    selectedCmd.value = cloneDeep(commands.value.items[index]);
    selectedIndex = index;
  }
  const { result, loading: paginateLoading } = useQuery<
    PaginateCommandsData,
    QueryPaginateCommandsArgs
    >(PAGINATE_COMMAND, { paginationInput });
  const commands = useResult(result, InitialPagination, res => {
    if(res.paginateCommands.items.length)
      selectedCmd.value =  cloneDeep(res.paginateCommands.items[selectedIndex]);
    return res.paginateCommands;
  });

  return { commands, paginateLoading, selectedCmd, setSelectedCmd }
}
