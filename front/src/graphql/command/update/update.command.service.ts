import { useMutation } from '@vue/apollo-composable';
import { UPDATE_CMD, UpdateCommandData } from './update.command.sdl';
import { reactive } from 'vue';
import { MutationUpdateCommandArgs, UpdateCommandInput } from '../../types';

export const useUpdateCommand = () => {
  const updateCmdInput = reactive<UpdateCommandInput>({
    id: 0,
    providerId: 0
  });
  const {loading: updateCmdLoading, mutate } = useMutation<
    UpdateCommandData,
    MutationUpdateCommandArgs
    >(UPDATE_CMD);
  const updateCommand = async() => {
    await mutate({ input: updateCmdInput });
  }
  return { updateCmdLoading, updateCommand, updateCmdInput }
}
