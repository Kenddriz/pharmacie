import {gql} from '@apollo/client/core';
import { CommandPagination, Provider, ProviderCommandsChart, ProviderPagination } from '../types';
import { PAGINATION_META } from '../utils/pagination';
import { COMMAND_FIELDS, INVOICE_FIELDS, PROVIDER_FIELDS } from '../invoice/incoice.sdl';

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
export type ProviderCommandsData = {
  providerCommands: CommandPagination;
}
export const PROVIDER_COMMANDS = gql`
  query ProviderCommands($input: ProviderCommandsInput!){
    providerCommands(input: $input){
      items{
        ${COMMAND_FIELDS}
        invoice{${INVOICE_FIELDS}}
      }
      ${PAGINATION_META}
    }
  }
`;

export type ProviderCommandsChartData = {
  providerCommandsChart: ProviderCommandsChart[]
}
export const PROVIDER_COMMANDS_CHART = gql`
  query ProviderCommandsChart($input: ProviderCommandsChartInput!) {
    providerCommandsChart(input: $input) {
      month
      invoice
      command
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
