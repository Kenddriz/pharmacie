import { useQuery } from '@vue/apollo-composable';
import { FORMS, FormsData } from './form.sdl';
import { Form } from '../types';
import { reactive, ref } from 'vue';

export const useForms = () => {
  const { onResult } = useQuery<FormsData>(FORMS);
  const forms = ref<Form[]>([]);
  const selectedForm = reactive<Form>({
    id: 0,
    label: ''
  });
  onResult(({ data }) => {
    if(data?.forms && data.forms.length){
      forms.value = data.forms;
      Object.assign(selectedForm, data.forms[0]);
    }
  })

  return { forms, selectedForm }
}
