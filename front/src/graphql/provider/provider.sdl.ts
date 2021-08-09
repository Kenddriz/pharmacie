import {gql} from '@apollo/client/core';
import { Provider } from '../types';

const PROVIDER = `
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
export type CreateProviderData = {
  createProvider: Provider
}

export const CREATE_PROVIDER = gql`
  mutation CreateProvider($input: CreateProviderInput!) {
    createProvider(input: $input) {
      ${ PROVIDER }
    }
  }
`;
