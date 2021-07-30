import { useMutation } from '@vue/apollo-composable';
import { CREATE_CMD, CreateCommandData } from './create.command.sdl';
import { Command, MutationCreateCommandArgs } from '../../types';
import { reactive } from 'vue';
import { addCommandCache } from '../updateCommandCache';

export const useCreateCommand = () => {
  const createdCmd = reactive<Pick<Command, 'id'|'commandLines'>>({
    id: 0,
    commandLines: []
  });
  const {loading: createCmdLoading, mutate } = useMutation<
    CreateCommandData,
    MutationCreateCommandArgs
    >(CREATE_CMD, {
      update: (cache, {data}) => {
        if(data?.createCommand) {
          createdCmd.id = data.createCommand.id;
          addCommandCache(cache, data.createCommand);
        }
      }
  });
  const createCommand = async(providerId: number) => {
    if(createdCmd.id === 0) await mutate({ input: {providerId} });
  }
  return { createCmdLoading, createCommand, createdCmd }
}
