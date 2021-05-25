import { gql } from '@apollo/client/core';
import {UNIT} from '../units/units.sdl';
import {Unit} from '../../types';

export type CreateUnitData = {
  createUnit: Unit
}

export const CREATE_UNIT = gql`
  mutation CreateUnit($input: CreateUnitInput!) {
    createUnit(input: $input) {
      ${ UNIT }
    }
  }
`;
