import { gql } from '@apollo/client/core';
import { LoginDto } from '../../types';

export type LoginData = {
  login: LoginDto
};
export const LOGIN = gql`
  mutation Login($input: AuthInput!) {
    login(input: $input) {
      token
    }
  }
`;
