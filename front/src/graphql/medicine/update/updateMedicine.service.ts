import { MutationUpdateMedicineArgs, UpdateMedicineInput } from '../../types';
import { useMutation } from '@vue/apollo-composable';
import { UPDATE_MEDICINE, UpdateMedicineData } from './updateMedicine.sdl';

export const useUpdateMedicine = () => {
  const { mutate } = useMutation<UpdateMedicineData, MutationUpdateMedicineArgs>(UPDATE_MEDICINE);
  const updateMedicine = async (input: UpdateMedicineInput) => {
    await mutate({ input })
  }
  return {updateMedicine}
}
