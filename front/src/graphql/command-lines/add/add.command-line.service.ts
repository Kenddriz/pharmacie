import { useMutation } from '@vue/apollo-composable';
import { ADD_COMMAND_LINE, CreateCommandLineData } from './add.command-line.sdl';
import { CreateOrUpdateCommandLineInput, MutationAddCommandLineArgs } from '../../types';
import { reactive } from 'vue';

export const useCreateCommandLine = () => {
  const input = reactive<CreateOrUpdateCommandLineInput>({
    commandId: 0,
    commandLines: []
  });
  function addAddCmdLine () {
    input.commandLines.push({ formId: 0, medicine: '', price: 0, quantity: 0, unitId: 0, vat: 0 });
  }
  function removeCmdLine(index: number) {
    input.commandLines.splice(index, 1);
  }
  const { mutate, onDone, loading: addCmdLineLoading} = useMutation<
    CreateCommandLineData,
    MutationAddCommandLineArgs
    >(ADD_COMMAND_LINE);
  onDone(() => input.commandLines.length = 0);
  async function submitAddCommandLine(cmdId: number) {
    input.commandId = cmdId;
    const lines = await mutate({ input });
    return lines.data?.addCommandLine?.commandLines||[];
  }
  return { submitAddCommandLine, input, addCmdLineLoading, addAddCmdLine,removeCmdLine }
}
