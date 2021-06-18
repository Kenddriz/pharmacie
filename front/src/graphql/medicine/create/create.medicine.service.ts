import { ref } from 'vue';
import { CreateMedicineInput } from '../../types';
import { formatDate } from '../../../shared/date';

export const useCreateMedicine = () => {
  const createInput = ref<CreateMedicineInput[]>([]);
  function addCreateInput() {
    createInput.value.push({
      designation: 'mon médicament',
      medicineForms: []
    })
  }
  const removeRow = (index: number) => {
    createInput.value.splice(index, 1);
  }
  const addForm = (forms: number[], index: number) => {
    createInput.value[index].medicineForms = forms.map(formId => {
      return {
        formId,
        unitId: 0,
        expiration: formatDate(Date.now(), 'DATE_ONLY'),
        price: 0,
        quantity: 0,
        vat: 0,
      }
    });
  }
  return {createInput, addCreateInput, addForm, removeRow }
}
