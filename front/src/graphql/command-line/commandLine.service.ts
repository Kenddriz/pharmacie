import { useMutation } from '@vue/apollo-composable';
import {
  ADD_COMMAND_LINE,
  AddCommandLineData,
  REMOVE_COMMAND_LINE,
  RemoveCommandLineData, UPDATE_COMMAND_LINE,
  UpdateCommandLineData,
} from './commandLine.sdl';
import {
  MutationAddCommandLineArgs,
  CommandLineInput,
  MutationRemoveCommandLineArgs,
  MutationUpdateCommandLineArgs,
} from '../types';
import { notify } from '../../shared/notification';
import { removeDialog } from '../utils/utils';

export const useAddCommandLine = () => {
  const { loading: aclLoading, mutate, onDone } = useMutation<
    AddCommandLineData,
    MutationAddCommandLineArgs
    >(ADD_COMMAND_LINE);
  onDone(() => notify('Une ligne de commande a été ajoutée'));
  function addCommandLine(commandId: number, commandLine: CommandLineInput) {
    void mutate({ input: {commandId, commandLine} });
  }
  return { aclLoading, addCommandLine }
}

export const useUpdateCommandLine = () => {
  const { loading: uclLoading, mutate, onDone } = useMutation<
    UpdateCommandLineData,
    MutationUpdateCommandLineArgs
    >(UPDATE_COMMAND_LINE);
  onDone(({ data }) => {
    if(data?.updateCommandLine)notify('Mise à jour avec succès');
  });
  function updateCommandLine(id: string, commandLine: CommandLineInput) {
    void mutate({ input: {id, commandLine} });
  }
  return { uclLoading, updateCommandLine }
}
export const useRemoveCommandLine = () => {
  const { loading: rclLoading, mutate, onDone } = useMutation<
    RemoveCommandLineData,
    MutationRemoveCommandLineArgs
    >(REMOVE_COMMAND_LINE);
  onDone(() => notify('Ligne de commande supprimée'));
  function removeCommandLine(commandId: number, commandLineId: string) {
    removeDialog(
      () => { void mutate({ input: { commandId, commandLineId } })},
      'removeForever'
    );
  }
  return { rclLoading, removeCommandLine }
}
