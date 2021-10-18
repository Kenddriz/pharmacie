import { useMutation } from '@vue/apollo-composable';
import {
  ADD_COMMAND_LINE,
  AddCommandLineData,
  REMOVE_COMMAND_LINE,
  RemoveCommandLineData,
  UPDATE_COMMAND_LINE,
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
import { Loading } from 'quasar';

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
  const { mutate, onDone } = useMutation<
    UpdateCommandLineData,
    MutationUpdateCommandLineArgs
    >(UPDATE_COMMAND_LINE);
  onDone(({ data }) => {
    Loading.hide();
    if(data?.updateCommandLine)notify('Mise à jour avec succès');
  });
  function updateCommandLine(id: string, commandLine: CommandLineInput) {
    Loading.show({ message: 'Mise à jour ...' });
    void mutate({ input: {id, commandLine} });
  }
  return { updateCommandLine }
}
export const useRemoveCommandLine = () => {
  const { mutate, onDone } = useMutation<
    RemoveCommandLineData,
    MutationRemoveCommandLineArgs
    >(REMOVE_COMMAND_LINE);
  onDone(() => {
    Loading.hide();
    notify('Suppression avec succès !');
  });
  function removeCommandLine (id: string) {
    removeDialog(
      () => {
        Loading.show({ message: 'Suppression ...'});
        void mutate({ id })
      },
      'removeForever'
    );
  }
  return { removeCommandLine }
}
