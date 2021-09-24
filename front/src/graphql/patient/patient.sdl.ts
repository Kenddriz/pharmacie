import { Patient } from '../types';
import { gql } from '@apollo/client/core';

export const PATIENT_FIELDS = `
  id
  name
  phone
`;

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
