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
export type MedicinesData = {
  medicines: Medicine[];
}
export const MEDICINES = gql`
  query Medicines {
    medicines {
      ${MEDICINE_PARAMS}
      article {commercialName}
    }
  }
`;
export type SaveMedicineData = {
  saveMedicine: Medicine
}

export const SAVE_MEDICINE = gql`
    mutation SaveMedicine($input:MedicineInput!) {
      saveMedicine(input: $input) {
        id
        medicines{${MEDICINE_PARAMS}}
      }
    }
`;


export type SoftRemoveMedicineData = {
  softRemoveMedicine: boolean;
}
export const SOFT_REMOVE_MEDICINE = gql`
  mutation SoftRemoveMedicine($input: DeleteMedicineInput!) {
    softRemoveMedicine(input: $input) {
      id
      medicines{${MEDICINE_PARAMS}}
    }
  }
`;

export type DeleteMedicineData = {
  softRemoveMedicine: boolean;
}
export const DELETE_MEDICINE = gql`
    mutation DeleteMedicine($input: DeleteMedicineInput!) {
      deleteMedicine(input: $input) {
        id
        medicines{${MEDICINE_PARAMS}}
      }
    }
`;

export type RecoverMedicineData = {
  recoverMedicine: boolean;
}
export const RECOVER_MEDICINE = gql`
  mutation RecoverMedicine($input: DeleteMedicineInput!) {
    recoverMedicine(input: $input) {
      id
      medicines{${MEDICINE_PARAMS}}
    }
  }
`;

