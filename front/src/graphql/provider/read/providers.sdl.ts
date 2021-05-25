import {gql} from '@apollo/client/core';
import { Provider } from '../../types';
import {PROVIDER} from '../provider';

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
