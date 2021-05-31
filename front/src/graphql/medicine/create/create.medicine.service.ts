import { reactive, ref } from 'vue';
import { CreateMedicineInput, Form } from '../../types';
import { cloneDeep } from '@apollo/client/utilities';
import { defaultMedicineInput } from '../medicine';

export const useCreateMedicine = () => {
  const createInput = reactive<CreateMedicineInput>(cloneDeep(defaultMedicineInput));
  const formLabels = ref<string[]>([]);
  const setCreateForm = (forms: Form[]) => {
    formLabels.value = [];
    createInput.medicineForms = forms.map((form) => {
      formLabels.value.push(form.label);
      return {
        formId: form.id,
        unitId: 0,
        price: 0,
        quantity: 0,
        vat: 0,
      }
    });
  }
  return { createInput, setCreateForm, formLabels }
}
