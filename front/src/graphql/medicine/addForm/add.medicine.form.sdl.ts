import { Medicine } from '../../types';
import { gql } from '@apollo/client/core';
import { MEDICINE_PARAMS } from '../medicine';

export type AddMedicineFormData = {
  addMedicineForm: Medicine
}

export const ADD_MEDICINE_FORM = gql`
  mutation AddMedicineForm($input: CreateMedicineFormInput!) {
    addMedicineForm(input: $input) {
      ${MEDICINE_PARAMS}
    }
  }
`;
