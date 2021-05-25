import {Unit} from '../../types';
import {gql} from '@apollo/client/core';
import {UNIT} from '../units/units.sdl';

export type UpdateUnitData = {
  updateUnit: Unit
}
export const UPDATE_UNIT = gql`
  mutation UpdateUnit($input: UpdateUnitInput!) {
    updateUnit(input: $input){
      ${ UNIT }
    }
  }
`;
