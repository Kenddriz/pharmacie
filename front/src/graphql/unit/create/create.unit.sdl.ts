import { gql } from '@apollo/client/core';
import {Unit} from '../../types';
import { UNIT } from '../unit';

export type CreateUnitData = {
  createUnit: Unit
}

export const CREATE_UNIT = gql`
  mutation CreateUnit($input: CreateUnitInput!) {
    createUnit(input: $input) {
      ${UNIT}
    }
  }
`;
