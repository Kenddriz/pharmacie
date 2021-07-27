import { useMutation } from '@vue/apollo-composable';
import { REMOVE_CMD_LINE, RemoveCommandLineData } from './remove.command-line.sdl';
import { MutationRemoveCommandLineArgs } from '../../types';

export const useRemoveCommandLine = () => {

  const { loading: removeCmdLineLoading, mutate } = useMutation<
    RemoveCommandLineData,
    MutationRemoveCommandLineArgs
    >(REMOVE_CMD_LINE);
  return {
    removeCmdLineLoading,
    removeCmdLine: async (id: number) => {
      await mutate({ id })
    }
  }
}
