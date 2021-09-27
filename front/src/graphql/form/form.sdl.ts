import { Form } from '../types';
import { gql } from '@apollo/client/core';

export type FormsData = {
  forms: Form[];
}
export const FORM_PARAMS = `
  id
  label
`;

export const FORMS = gql`
    query Forms {
      forms {
        ${FORM_PARAMS}
      }
    }
`;

export type CreateFormData = {
  createForm: Form;
}
export const CREATE_FORM = gql`
  mutation CreateForm($input: CreateFormInput!) {
    createForm(input: $input){
      ${FORM_PARAMS}
    }
  }
`;
export type UpdateFormData = {
  updateForm: Form;
}
export const UPDATE_FORM = gql`
    mutation UpdateForm($input: UpdateFormInput!) {
      updateForm(input: $input) {
        ${FORM_PARAMS}
      }
    }
`;

export type DeleteFormData = {
  deleteForm: boolean;
}
export const DELETE_FORM = gql`
  mutation DeleteForm($id: Int!) {
    deleteForm(id:$id)
  }
`;
