import { useMutation } from '@vue/apollo-composable';
import {UPDATE_UNIT, UpdateUnitData} from './update.unit.sdl';
import { MutationUpdateUnitArgs, Unit, UpdateUnitInput } from '../../types';
import { notify } from '../../../shared/notification';
import { reactive, ref } from 'vue';
import { cloneDeep } from 'lodash';
import { defaultUnit } from '../unit';

export const updateUnitService = () => {
  const { mutate, onDone, loading: updateLoading } = useMutation<
    UpdateUnitData,
    MutationUpdateUnitArgs
    >(UPDATE_UNIT);
  const updateInput = reactive<UpdateUnitInput>({
    id: 0,
    ...cloneDeep(defaultUnit)
  });
  const updateDialog = ref<boolean>(false);
  const setUpateInput = (unit: Unit) => {
    const { id, label, description, parentId} = unit;
    Object.assign(updateInput, { id, label, description, parentId});
    updateDialog.value = true;
  }
  const updateUnit = async () => {
    await mutate({ input: updateInput });
  }

  onDone(res => {
    if(res.data) {
      if(res.data.updateUnit)
        notify('L\'unité ' + 'n°' + String(res.data.updateUnit.id) + ' a été mise à jour.')
    }
  })
  return { updateUnit, updateLoading, setUpateInput, updateDialog, updateInput }
}
