import { Unit } from '../../types';
import { gql } from '@apollo/client/core';

export type UnitsData = {
  units: Unit[];
};

export const UNIT = `
    id
    parentId
    label
    description
`;
export const UNITS_QUERY = gql`
  query Units{
    units{
      ${UNIT}
    }
  }
`;
