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

export type FindProvidersData = {
  findProviders: Provider[];
}
export const FIND_PROVIDERS = gql`
    query FindProviders($keyword: String!) {
      findProviders(keyword: $keyword) {
        ${PROVIDER}
      }
    }
`;
