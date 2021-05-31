import { Form } from '../../types';
import { gql } from '@apollo/client/core';
import { MEDICINE_FORM_PARAMS } from '../form';

export type MedicineFormData = {
  forms: Form[]
}

export const MEDICINE_FORMS = gql`
  query forms {
    forms {
      ${ MEDICINE_FORM_PARAMS }
    }
  }
`;
