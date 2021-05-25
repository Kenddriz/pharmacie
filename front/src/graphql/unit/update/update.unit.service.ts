import { useMutation } from '@vue/apollo-composable';
import {UPDATE_UNIT, UpdateUnitData} from './update.unit.sdl';
import {MutationUpdateUnitArgs, UpdateUnitInput} from '../../types';
import { notify } from '../../../shared/notification';

export const updateUnitService = () => {
  const { mutate, onDone, loading } = useMutation<
    UpdateUnitData,
    MutationUpdateUnitArgs
    >(UPDATE_UNIT);

  const updateUnit = async(input: UpdateUnitInput) => {
    await mutate({ input })
  };

  onDone(res => {
    if(res.data) {
      if(res.data.updateUnit)
        notify('L\'unité ' + 'n°' + String(res.data.updateUnit.id) + ' a été mise à jour.')
    }
  })
  return { updateUnit, loading }
}
