import { reactive } from 'vue';
import { CreateMedicineInput } from '../../types';
import { formatDate } from '../../../shared/date';

export const useCreateMedicine = () => {
  const createInput = reactive<CreateMedicineInput>({
    designation: 'mon médicament',
    medicineForms: []
  });
  const addForm = (forms: number[], unitId = 0) => {
    /**add if not exist**/
    forms.forEach(formId => {
      if(!createInput.medicineForms.find(form => form.formId === formId)) {
        createInput.medicineForms.push({
          formId,
          unitId,
          expiration: formatDate(Date.now(), 'DATE_ONLY'),
          price: 0,
          quantity: 0,
          vat: 0,
        })
      }
    });
    /**finally, filter to get updated forms: delete all non correspondence to current chosen forms**/
    createInput.medicineForms = createInput.medicineForms.filter(form => forms.includes(form.formId));
  }
  return {createInput, addForm }
}
