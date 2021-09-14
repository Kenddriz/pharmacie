import {gql} from '@apollo/client/core';
import { Provider, ProviderPagination } from '../types';
import { PAGINATION_META } from '../utils/pagination';

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

export type PaginateProvidersData = {
  paginateProviders: ProviderPagination;
}
export const PAGINATE_PROVIDERS = gql`
  query PaginateProviders($input:PaginationInput!){
    paginateProviders(input: $input){
      items{${PROVIDER}}
      ${PAGINATION_META}
    }
  }
`;
