import { useMutation } from '@vue/apollo-composable';
import { UpdateCommandLineData, UPDATE_CMD_LINE } from './update.command-line.sdl';
import { Command, CreateOrUpdateCommandLineInput, MutationUpdateCommandLineArgs } from '../../types';

export const useUpdateCommandLine = () => {

  const { loading: updateCmdLineLoading, mutate } = useMutation<
    UpdateCommandLineData,
    MutationUpdateCommandLineArgs
    >(UPDATE_CMD_LINE);
  const updateCmdLine = async (cmd: Command) => {
    const input: CreateOrUpdateCommandLineInput = {
      commandId: cmd.id,
      commandLines: cmd.commandLines.map(c => {
        return {
          id: c.id,
          medicine: c.medicine,
          price: c.price,
          quantity: c.quantity,
          vat: c.vat,
          formId: c.form.id,
          unitId: c.unit.id
        }
      })
    }
    await mutate({ input })
  }
  return { updateCmdLine, updateCmdLineLoading }
}
