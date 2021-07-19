import { MedicineForm } from '../../types';
import { gql } from '@apollo/client/core';
import { MEDICINE_FORM } from '../medicineForm';

export type UpdateMedicineFormData = {
  updateMedicineForm: MedicineForm
}

export const UPDATE_MEDICINE_FORM = gql`
  mutation UpdateMedicineForm($input: UpdateMedicineFormInput!) {
    updateMedicineForm(input: $input) {
      ${MEDICINE_FORM}
    }
  }
`;
