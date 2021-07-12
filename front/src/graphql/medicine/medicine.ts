import { CreateMedicineInput } from '../types';

export const MEDICINE_PARAMS = `
  id
  designation
  medicineForms {
    id
    vat
    stock
    shop
    price
    expiration
    unit { id, label }
    form { id, label }
  }
`;
export const defaultMedicineInput: CreateMedicineInput = {
  designation: 'nouveau médicament',
  medicineForms: [],
}
