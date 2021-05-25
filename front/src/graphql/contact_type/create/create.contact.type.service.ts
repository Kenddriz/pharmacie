import { reactive } from 'vue';
import {CreateContactTypeInput} from '../../types';

export const useCreateContactTypeService = () => {
  const input = reactive<CreateContactTypeInput>({
    label: ''
  });
  return { input }
}
