import {gql} from '@apollo/client/core';
import { Provider, ProviderCommandsChart, ProviderPagination } from '../types';
import { PAGINATION_META } from '../utils/pagination';
import { PROVIDER_FIELDS } from '../invoice/incoice.sdl';

export type SaveProviderData = {
  saveProvider: Provider
}
export const CREATE_PROVIDER = gql`
  mutation SaveProvider($input: SaveProviderInput!) {
    saveProvider(input: $input) {
      ${ PROVIDER_FIELDS }
    }
  }
`;
export type PaginateProvidersData = {
  paginateProviders: ProviderPagination;
}
export const PAGINATE_PROVIDERS = gql`
  query PaginateProviders($input:PaginationInput!){
    paginateProviders(input: $input){
      items{${PROVIDER_FIELDS}}
      ${PAGINATION_META}
    }
  }
`;
export type ProviderCommandsChartData = {
  providerCommandsChart: ProviderCommandsChart[]
}
export const PROVIDER_COMMANDS_CHART = gql`
  query ProviderCommandsChart($input: ProviderCommandsInput!) {
    providerCommandsChart(input: $input) {
      month
      invoice
      command
    }
  }
`;
export type UpdateProviderAvatarData = {
  updateProviderAvatar: Provider;
}
export const UPDATE_PROVIDER_AVATAR = gql`
  mutation UpdateProviderAvatar($avatar: Upload!, $id: Int!) {
    updateProviderAvatar(avatar: $avatar, id: $id){
      id
      updatedAt
      avatar
    }
  }
`;

export type PaginateDeletedProvidersData = {
  paginateDeletedProviders: ProviderPagination;
}
export const PAGINATE_DELETED_PROVIDERS = gql`
  query PaginateDeletedProviders($input: PaginationInput!){
    paginateDeletedProviders(input: $input) {
      items{ id name address avatar archivedAt}
      ${PAGINATION_META}
    }
  }
`;
export type SoftRemoveProviderData = {
  softRemoveProvider: Provider;
}
export const SOFT_REMOVE_PROVIDER = gql`
    mutation SoftRemoveProvider($id: Int!){
      softRemoveProvider(id: $id) {
        id name address avatar archivedAt
      }
    }
`;
export type RestoreProviderData = {
  restoreProvider: Provider;
}
export const RESTORE_PROVIDER = gql`
    mutation RestoreProvider($id: Int!) {
      restoreProvider(id: $id){
        ${PROVIDER_FIELDS}
      }
    }
`;
export type RemoveProviderData = {
  removeProvider: boolean;
}
export const REMOVE_PROVIDER = gql`
  mutation RemoveProvider($id: Int!) {
    removeProvider(id: $id)
  }
`;
