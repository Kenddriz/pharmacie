import { formatDate } from '../../shared/date';
import { CreateMedicineInput } from '../types';

export const defaultMedicineInput: CreateMedicineInput = {
  designation: 'nouveau médicament',
  expiration: formatDate(Date.now(), 'DATE_ONLY'),
  medicineForms: [],
}
