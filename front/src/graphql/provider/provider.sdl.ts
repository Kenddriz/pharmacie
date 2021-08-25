import {gql} from '@apollo/client/core';
import { Provider } from '../types';

export const PROVIDER = `
  id
  name
  address
  logo
  contacts {
    type
    list
  }
  createdAt
  updatedAt
`

export type ProvidersData = {
  providers: Provider[]
}

export const PROVIDERS = gql`
  query Providers {
    providers {
       ${PROVIDER}
    }
  }
`;
export type SaveProviderData = {
  saveProvider: Provider
}

export const CREATE_PROVIDER = gql`
  mutation SaveProvider($input: SaveProviderInput!) {
    saveProvider(input: $input) {
      ${ PROVIDER }
    }
  }
`;
