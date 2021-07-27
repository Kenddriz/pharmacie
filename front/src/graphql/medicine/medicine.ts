import { CreateMedicineInput } from '../types';
import { MEDICINE_FORM } from '../medicineForm/medicineForm';
export const MEDICINE = `
  id
  designation
`;
export const MEDICINE_PARAMS = `
  ${MEDICINE}
  medicineForms{${MEDICINE_FORM}}
`;
export const defaultMedicineInput: CreateMedicineInput = {
  designation: 'nouveau médicament',
  medicineForms: [],
}
