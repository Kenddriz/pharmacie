import { Unit } from '../../types';
import { gql } from '@apollo/client/core';

export type UnitsData = {
  units: Unit[];
};

export const UNIT = `
    id
    parentId
    multiplicity
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
