import { reactive, ref } from 'vue';
import { CreateMedicineInput, MutationCreateMedicineArgs } from '../../types';
import { cloneDeep } from '@apollo/client/utilities';
import { defaultMedicineInput } from '../medicine';
import { useMutation } from '@vue/apollo-composable';
import { CREATE_MEDICINE, CreateMedicineData } from './add.medicine.sdl';
import { SelectOption } from '../../../components/shared/select';
import { addMedicineCache } from '../updateMedicineCache';

export const useCreateMedicine = () => {
  const createInput = reactive<CreateMedicineInput>(cloneDeep(defaultMedicineInput));
  const formLabels = ref<string[]>([]);
  const setCreateForm = (forms: SelectOption[]) => {
    formLabels.value = [];
    createInput.medicineForms = forms.map((form) => {
      formLabels.value.push(form.label);
      return {
        formId: form.value,
        expiration: '',
        unitId: 0,
        price: 0,
        quantity: 0,
        vat: 0,
      }
    });
  }
  const { loading: creationLoading } = useMutation<
    CreateMedicineData,
    MutationCreateMedicineArgs
    >(CREATE_MEDICINE, {
      update: (cache, { data }) => {
        if(data?.createMedicine)
          addMedicineCache(cache, data.createMedicine)
      }
  });
   function submitCreation() {
    console.log(45);
  }
  return { createInput, setCreateForm, formLabels, submitCreation, creationLoading }
}
