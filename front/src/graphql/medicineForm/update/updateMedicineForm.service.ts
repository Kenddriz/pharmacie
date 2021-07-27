import { reactive, ref } from 'vue';
import {
  MedicineForm,
  MutationUpdateMedicineFormArgs,
  UpdateMedicineFormInput,
} from '../../types';
import { useMutation } from '@vue/apollo-composable';
import { UPDATE_MEDICINE_FORM, UpdateMedicineFormData } from './updateMedicineForm.sdl';

export const useUpdateMedicineForm = () => {
  const showUpdateMedForm = ref<boolean>(false);
  const typeMedFormLabel = ref<string>('');
  const updateMedFormInput = reactive<UpdateMedicineFormInput>({
    id: 0,
    medicineId: 0,
    formId: 0,
    unitId: 0,
    expiration: '',
    price: 0,
    stock: 0,
    shop: 0,
    vat: 0,
  });
  const setUpdateMedFormInput = (input: MedicineForm) => {
    const {unit, form, ...res } = input;
    delete res.__typename;
    Object.assign(updateMedFormInput, res);
    updateMedFormInput.unitId = unit.id;
    updateMedFormInput.formId = form.id;
    showUpdateMedForm.value = true;
    typeMedFormLabel.value = form.label;
  }
  const { mutate } = useMutation<
    UpdateMedicineFormData,
    MutationUpdateMedicineFormArgs
    >(UPDATE_MEDICINE_FORM);

  const updateMedForm = async () => {
    await mutate({ input: updateMedFormInput });
  }

  return { updateMedFormInput, typeMedFormLabel, setUpdateMedFormInput, updateMedForm, showUpdateMedForm }
}
