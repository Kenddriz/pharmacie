import { useQuery, useResult } from '@vue/apollo-composable';
import { MEDICINE_FORMS, MedicineFormData } from './form.sdl';
import { Form } from '../../types';

export const useForms = () => {
  const { result, loading: medicineFormLoading } = useQuery<MedicineFormData>(MEDICINE_FORMS);
  return {
    forms: useResult<MedicineFormData, Form[], Form[]>(result, [], res => res.forms),
    medicineFormLoading
  }
}
