import {Unit} from '../../types';
import {gql} from '@apollo/client/core';
import { UNIT } from '../unit';

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
