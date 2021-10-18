import { PACKAGING_PARAMS } from '../packaging/packaging.sdl';
import { DOSAGE_PARAMS } from '../dosage/dosage.sdl';
import { FORM_PARAMS } from '../form/form.sdl';
import { Article, SoftRemoveMedicineOutput, Medicine, MedicinePaginationOutput, MostConsumedMedicineOutput } from '../types';
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
  createdAt,
  updatedAt
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
export type MostConsumedMedicinesData = {
  mostConsumedMedicines: MostConsumedMedicineOutput;
}
export const MOST_CONSUMED_MEDICINES = gql`
    query MostConsumedMedicines($year: Int!) {
      mostConsumedMedicines(year: $year) {
        medicine {
          ${MEDICINE_PARAMS}
          article {id commercialName }
        }
        count
      }
    }
`;
export type PaginateDeletedMedicinesData = {
  paginateDeletedMedicines: MedicinePaginationOutput;
}
export const PAGINATE_DELETED_MEDICINES = gql`
  query PaginateDeletedMedicines($input: PaginationInput!){
    paginateDeletedMedicines(input: $input) {
      items{${MEDICINE_FIELDS} archivedAt article{ id commercialName }}
      ${PAGINATION_META}
    }
  }
`;
export type SoftRemoveMedicineData = {
  softRemoveMedicine: SoftRemoveMedicineOutput;
}
export const SOFT_REMOVE_MEDICINE = gql`
  mutation SoftRemoveMedicine($id: Int!) {
    softRemoveMedicine(id: $id) {
      article{
        id
        medicines{${MEDICINE_PARAMS}}
      }
      medicine {
        ${MEDICINE_FIELDS}
        archivedAt
        article{ id commercialName }
      }
    }
  }
`;
export type RemoveMedicineData = {
  removeMedicine: boolean;
}
export const REMOVE_MEDICINE = gql`
  mutation RemoveMedicine($id: Int!) {
    removeMedicine(id: $id)
  }
`;
export type RestoreMedicineData = {
  restoreMedicine: Article;
}
export const RESTORE_MEDICINE = gql`
  mutation RestoreMedicine($id: Int!) {
    restoreMedicine(id: $id) {
      id
      medicines{${MEDICINE_PARAMS}}
    }
  }
`;
