import { Prescription, Sale } from '../types';
import { gql } from '@apollo/client/core';

export const PATIENT_FIELDS = `
  id
  name
  phone
`;

export const PRESCRIPTION_FIELDS = `
  id
  reference
  description
  patient{${PATIENT_FIELDS}}
`;

export type CreatePrescriptionData = {
  createPrescription: Sale
}

export const CREATE_PRESCRIPTION = gql`
  mutation CreatePrescription($input: CreatePrescriptionInput!){
    createPrescription(input: $input) {
      id
      prescription {${PRESCRIPTION_FIELDS}}
    }
  }
`;

export type UpdatePrescriptionData = {
  updatePrescription: Prescription;
}

export const UPDATE_PRESCRIPTION = gql`
  mutation UpdatePrescription($input: UpdatePrescriptionInput!){
    updatePrescription(input: $input) {
      ${PRESCRIPTION_FIELDS}
    }
  }
`;

export type DeletePrescriptionData = {
  deletePrescription: Sale
}
export const DELETE_PRESCRIPTION = gql`
 mutation DeletePrescription($input: DeletePrescriptionInput!) {
   deletePrescription(input: $input) {
     id
     prescription { id }
   }
 }
`;

