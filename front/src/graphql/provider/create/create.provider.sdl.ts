import {Provider} from '../../types';
import {gql} from '@apollo/client/core';
import {PROVIDER} from '../provider';

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
