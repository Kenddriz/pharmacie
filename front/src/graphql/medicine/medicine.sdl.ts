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
        ${MEDICINE_PARAMS}
      }
    }
`;


export type SoftRemoveMedicineData = {
  softRemoveMedicine: boolean;
}
export const SOFT_REMOVE_MEDICINE = gql`
  mutation SoftRemoveMedicine($id: Int!) {
    softRemoveMedicine(id: $id)
  }
`;

export type DeleteMedicineData = {
  softRemoveMedicine: boolean;
}
export const DELETE_MEDICINE = gql`
    mutation DeleteMedicine($id: Int!) {
      deleteMedicine(id: $id)
    }
`;

export type RecoverMedicineData = {
  recoverMedicine: boolean;
}
export const RECOVER_MEDICINE = gql`
  mutation RecoverMedicine($id: Int!) {
    recoverMedicine(id: $id)
  }
`;

