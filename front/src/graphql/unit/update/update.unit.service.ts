import { useMutation } from '@vue/apollo-composable';
import {UPDATE_UNIT, UpdateUnitData} from './update.unit.sdl';
import { MutationUpdateUnitArgs, Unit, UpdateUnitInput } from '../../types';
import { reactive, ref } from 'vue';
import { cloneDeep } from 'lodash';
import { defaultUnit } from '../unit';
import { Arbre } from '../units/units.service';

export const updateUnitService = () => {
  const { mutate, loading: updateLoading } = useMutation<
    UpdateUnitData,
    MutationUpdateUnitArgs
    >(UPDATE_UNIT);
  const updateInput = reactive<UpdateUnitInput>({
    id: 0,
    ...cloneDeep(defaultUnit)
  });
  const updateDialog = ref<boolean>(false);
  const setUpdateInput = (unit: Arbre) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __typename, children, ...res} = unit;
    Object.assign(updateInput, res);
    updateDialog.value = true;
  }
  const updateUnit = async () => {
    await mutate({ input: updateInput });
  }

  const setMultiplicity = async (unit: Unit, multiplicity: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __typename, ...res} = unit;
    Object.assign(updateInput, res);
    updateInput.multiplicity = Number(multiplicity);
    await updateUnit();
  }
  return {
    updateUnit,
    updateLoading, setUpdateInput, updateDialog, updateInput, setMultiplicity }
}
