import { Medicine } from '../../types';
import { gql } from '@apollo/client/core';
import { MEDICINE } from '../medicine';

export type UpdateMedicineData = {
  updateMedicine: Medicine
}

export const UPDATE_MEDICINE = gql`
  mutation UpdateMedicine($input:UpdateMedicineInput!) {
      updateMedicine(input: $input) {
      ${MEDICINE}
    }
  }
`;
