import { useMutation } from '@vue/apollo-composable';
import { CREATE_CMD, CreateCommandData } from './create.command.sdl';
import { MutationCreateCommandArgs } from '../../types';
import { ref } from 'vue';
import { addCommandCache } from '../updateCommandCache';

export const useCreateCommand = () => {
  const createdCmd = ref<number>(0);
  const {loading: createCmdLoading, mutate } = useMutation<
    CreateCommandData,
    MutationCreateCommandArgs
    >(CREATE_CMD, {
      update: (cache, {data}) => {
        if(data?.createCommand) {
          createdCmd.value = data.createCommand.id;
          addCommandCache(cache, data.createCommand);
        }
      }
  });
  const createCommand = async(providerId: number) => {
    if(createdCmd.value === 0) await mutate({ input: {providerId} });
  }
  return { createCmdLoading, createCommand, createdCmd }
}
