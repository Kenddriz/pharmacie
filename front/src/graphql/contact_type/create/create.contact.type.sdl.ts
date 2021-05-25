import {ContactType} from '../../types';
import {gql} from '@apollo/client/core';
import {CONTACT_TYPES} from '../contact.type';

export type CreateContactTypeData = {
  createContactType: ContactType
}

export const CREATE_CONTACT_TYPES = gql`
  mutation CreateContactType($input: CreateContactTypeInput!) {
    createContactType(input: $input) {
      ${CONTACT_TYPES}
    }
  }
`;
