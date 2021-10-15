import { Patient, PaginatePatientOutput, PaginatePatientSalesOutput } from '../types';
import { gql } from '@apollo/client/core';
import { PAGINATION_META } from '../utils/pagination';
import { STOCK_MVT_DTO } from '../invoice/incoice.sdl';
import { SALE_FIELDS } from '../sale/sale.sdl';
import { PATIENT_FIELDS } from '../prescription/prescription.sdl';

export type FindSuggestedPatientsData = {
  findSuggestedPatients: Patient[];
}
export const FIND_SUGGESTED_PATIENTS = gql`
    query FindSuggestedPatients($keyword: String!) {
      findSuggestedPatients(keyword: $keyword){
        ${PATIENT_FIELDS}
      }
    }
`;

export type PaginatePatientsData = {
  paginatePatients: PaginatePatientOutput;
}
export const PAGINATE_PATIENTS = gql`
    query PaginatePatients($input: PaginationInput!) {
      paginatePatients(input: $input) {
        items {${PATIENT_FIELDS} createdAt}
        ${PAGINATION_META}
      }
    }
`;
export type PaginatePatientSalesData = {
  paginatePatientSales: PaginatePatientSalesOutput;
}
export const PAGINATE_PATIENT_SALES = gql`
  query PaginatePrescriptions($input: PaginatePatientSalesInput!) {
    paginatePatientSales(input: $input) {
      items{
        ${SALE_FIELDS}
        ${STOCK_MVT_DTO()}
      }
      ${PAGINATION_META}
    }
  }
`;

export type UpdatePatientData = {
  updatePatient: Patient;
}
export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($input: CreatePatientInput!) {
    updatePatient(input: $input) {
      ${PATIENT_FIELDS}
    }
  }
`
