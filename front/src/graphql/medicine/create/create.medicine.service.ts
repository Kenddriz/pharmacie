import { reactive } from 'vue';
import { CreateMedicineInput, MutationCreateMedicineArgs } from '../../types';
import { formatDate } from '../../../shared/date';
import { useMutation } from '@vue/apollo-composable';
import { CREATE_MEDICINE, CreateMedicineData } from './create.medicine.sdl';
import { addMedicineCache } from '../updateMedicineCache';

export const useCreateMedicine = () => {
  const createInput = reactive<CreateMedicineInput>({
    designation: '',
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
        });
      }
    });
    /**finally, filter to get updated forms: delete all non correspondence to current chosen forms**/
    createInput.medicineForms = createInput.medicineForms.filter(form => forms.includes(form.formId));
  }
  const { loading: creationLoading, mutate } = useMutation<
    CreateMedicineData,
    MutationCreateMedicineArgs
    >(CREATE_MEDICINE, {
    update: (cache, { data }) => {
      if(data?.createMedicine) addMedicineCache(cache, data.createMedicine)
    }
  });
  async function submitCreation() {
     await mutate({ input: createInput });
  }
  return {createInput, addForm, creationLoading, submitCreation }
}
