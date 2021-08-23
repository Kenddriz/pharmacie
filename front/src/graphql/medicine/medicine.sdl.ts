import { PACKAGING_PARAMS } from '../packaging/packaging.sdl';
import { DOSAGE_PARAMS } from '../dosage/dosage.sdl';
import { FORM_PARAMS } from '../form/form.sdl';
import { Medicine } from '../types';
import { gql } from '@apollo/client/core';

export const MEDICINE_PARAMS = `
  id
  form{${FORM_PARAMS}}
  dosage{${DOSAGE_PARAMS}}
  packaging{${PACKAGING_PARAMS}}
`;

export type SaveMedicineData = {
  saveMedicine: Medicine
}

export const SAVE_MEDICINE = gql`
    mutation SaveMedicine($input:MedicineInput!) {
      saveMedicine(input: $input) {
        article { id }
        ${MEDICINE_PARAMS}
      }
    }
`;

