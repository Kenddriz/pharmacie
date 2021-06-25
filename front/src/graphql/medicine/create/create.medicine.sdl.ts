import { Medicine } from '../../types';
import { gql } from '@apollo/client/core';
import { MEDICINE_PARAMS } from '../medicine';

export type CreateMedicineData = {
  createMedicine: Medicine
}

export const CREATE_MEDICINE = gql`
  mutation CreateMedicine($input: CreateMedicineInput!) {
    createMedicine(input: $input) {
      ${MEDICINE_PARAMS}
    }
  }
`;
