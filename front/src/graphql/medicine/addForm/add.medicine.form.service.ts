import { reactive, ref } from 'vue';
import { CreateMedicineFormInput, Medicine, MutationAddMedicineFormArgs } from '../../types';
import { useMutation } from '@vue/apollo-composable';
import { ADD_MEDICINE_FORM, AddMedicineFormData } from './add.medicine.form.sdl';
import { formatDate } from '../../../shared/date';

export const useAddMedForm = () => {
  const addMedFormInput = reactive<CreateMedicineFormInput>({
    medicineId: 0,
    formId: 0,
    unitId: 0,
    expiration: formatDate(Date.now(), 'DATE_ONLY'),
    price: 0,
    quantity: 0,
    vat: 0,
  });
  const existForms = ref<number[]>([]);
  const showAddMedForm = ref<boolean>(false);
  const setMedicine = (med: Medicine) => {
    existForms.value = med.medicineForms.map(f => f.form.id);
    addMedFormInput.medicineId = med.id;
    showAddMedForm.value = true;
  }
  const { mutate } = useMutation<
    AddMedicineFormData,
    MutationAddMedicineFormArgs
    >(ADD_MEDICINE_FORM);
  const AddMedForm = async () => {
    await mutate({ input: addMedFormInput });
    showAddMedForm.value = false;
  }
  return {addMedFormInput, setMedicine, AddMedForm, showAddMedForm, existForms }
}
