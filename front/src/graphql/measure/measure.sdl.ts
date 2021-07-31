import { gql } from '@apollo/client/core';
import { Measure } from '../types';

export type MeasuresData = {
  measures: Measure[]
}
const MEASURE_PARAMS = `
  id
  label
  parentId
`;
export const MEASURES_DATA = (measuresOnly: boolean) => gql`
  query Measures($measures: Boolean!){
    measures(measures:$measures){
      ${MEASURE_PARAMS}
      ${measuresOnly? `children{${MEASURE_PARAMS}}` : ''}
    }
  }
`;

export type SaveMeasureData = {
  saveMeasure: Measure
}
export const SAVE_MEASURE = gql`
  mutation SaveMeasure($input:SaveMeasureInput!){
    saveMeasure(input:$input){
      ${MEASURE_PARAMS}
      children{${MEASURE_PARAMS}}
    }
  }
`;
