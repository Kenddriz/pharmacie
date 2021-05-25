import {ContactType} from '../../types';
import {gql} from '@apollo/client/core';
import {CONTACT_TYPES} from '../contact.type';

export type ContactTypesData = {
  contactTypes: ContactType[]
}

export const CONTACT_TYPES_QUERY = gql`
  query ContactTypes {
    contactTypes {
      ${ CONTACT_TYPES }
    }
  }
`;
