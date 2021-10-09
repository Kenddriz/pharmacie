import { User } from '../../types';
import { gql } from '@apollo/client/core';
import { USER_FIELDS } from '../user.sdl';

export type WhoAmIData = {
  whoAmI: User
}

export const CURRENT_USER = gql`
    query WhoAmI {
      whoAmI {
        ${ USER_FIELDS }
      }
    }
`;
