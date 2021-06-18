import { Unit } from '../../types';
import { gql } from '@apollo/client/core';
import { UNIT } from '../unit';

export type UnitsData = {
  units: Unit[];
};

export const UNITS_QUERY = gql`
  query Units{
    units{
      ${UNIT}
    }
  }
`;
