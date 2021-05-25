import { User } from '../../types';
import { gql } from '@apollo/client/core';
import {USER} from '../user';

export type WhoAmIData = {
  whoAmI: User
}
export const CURRENT_USER = gql`
    query WhoAmI {
      whoAmI {
        ${ USER }
      }
    }
`;
