import { Contact } from '../../types';
import { gql } from '@apollo/client/core';
import { CONTACT } from '../contact';

export type UpdateContactData = {
  updateContact: Contact
}

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($input: UpdateContactInput!) {
    updateContact(input: $input) {
      ${CONTACT}
    }
  }
`
