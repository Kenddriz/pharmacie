import { PACKAGING_PARAMS } from '../packaging/packaging.sdl';
import { DOSAGE_PARAMS } from '../dosage/dosage.sdl';
import { FORM_PARAMS } from '../form/form.sdl';
import { Article, Medicine, MedicinePaginationOutput } from '../types';
import { gql } from '@apollo/client/core';
import { PAGINATION_META } from '../utils/pagination';

export const MEDICINE_FIELDS = `
  id
  form{${FORM_PARAMS}}
  dosage{${DOSAGE_PARAMS}}
  packaging{${PACKAGING_PARAMS}}
`;
export const MEDICINE_PARAMS = `
  ${MEDICINE_FIELDS}
  currentSalePrice
  currentVat
  stockTotal
`;
export type CreateMedicineData = {
  createMedicine: Article
}

export const CREATE_MEDICINE = gql`
    mutation CreateMedicine($input: CreateMedicineInput!) {
      createMedicine(input: $input) {
        id
        medicines{${MEDICINE_PARAMS}}
      }
    }
`;

export type UpdateMedicineData = {
  updateMedicine: Medicine
}

export const UPDATE_MEDICINE = gql`
  mutation UpdateMedicine($input:UpdateMedicineInput!) {
    updateMedicine(input: $input) {
      ${MEDICINE_PARAMS}
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

export type FindMedicinesByMeasureData = {
  findMedicinesByMeasure: MedicinePaginationOutput;
}
export const FIND_MEDICINES_BY_MEASURE = gql`
  query FindMedicinesByMeasure($input: FindByMeasureInput!) {
    findMedicinesByMeasure(input: $input) {
      items {
        ${MEDICINE_PARAMS}
        article {id commercialName }
        archivedAt
      }
      ${PAGINATION_META}
    }
  }
`;
