import { Provider } from '../../types';
import { PROVIDER } from '../../provider/provider';
import { gql } from '@apollo/client/core';

export type AddContactData = {
  addContacts: Provider
}

export const ADD_CONTACT = gql`
 mutation AddContact($input: AddContactInput!) {
  addContacts(input: $input) {
    ${ PROVIDER }
  }
 }
`
