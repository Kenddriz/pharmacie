import { reactive, ref } from 'vue';
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
  const usedUnits = ref<{quantity: number, unit: number, price: number}[]>([]);
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
        usedUnits.value.push({quantity: 0, unit: unitId, price: 0});
      }
    });
    /**finally, filter to get updated forms: delete all non correspondence to current chosen forms**/
    createInput.medicineForms.forEach((form, index) => {
      if(!forms.includes(form.formId)) {
        createInput.medicineForms.splice(index, 1);
        usedUnits.value.splice(index, 1);
      }
    })
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
  return {createInput, addForm, creationLoading, submitCreation, usedUnits }
}
