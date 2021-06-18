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
    unit { id }
    form { id }
  }
`;
export const defaultMedicineInput: CreateMedicineInput = {
  designation: 'nouveau médicament',
  medicineForms: [],
}
