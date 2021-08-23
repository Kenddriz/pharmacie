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
