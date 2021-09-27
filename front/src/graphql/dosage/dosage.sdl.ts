import { gql } from '@apollo/client/core';
import { Dosage } from '../types';

export type DosagesData = {
  dosages: Dosage[]
}
export const DOSAGE_PARAMS = `
  id
  label
  parentId
`;
export const DOSAGES_DATA = gql`
  query Dosages{
    dosages{
      ${DOSAGE_PARAMS}
    }
  }
`;

export type SaveDosageData = {
  saveDosage: Dosage
}
export const SAVE_DOSAGE = gql`
  mutation SaveDosage($input:SaveDosageInput!){
    saveDosage(input:$input){
      ${DOSAGE_PARAMS}
    }
  }
`;

export type DeleteDosageData = {
  deleteDosage: boolean;
}
export const DELETE_DOSAGE = gql`
    mutation DeleteDosage($id: Int!) {
      deleteDosage(id:$id)
    }
`;
