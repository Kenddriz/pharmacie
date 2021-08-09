import {gql} from '@apollo/client/core';
import {Packaging} from '../types';

export type PackagingData = {
  packaging: Packaging[]
}
const UNIT_PARAMS = `
  id
  units{
    label
    multiplicity
  }
`;
export const PACKAGING = gql`
  query Packaging{
    packaging{
      ${UNIT_PARAMS}
    }
  }
`;

export type CreatePackagingData = {
  createPackaging: Packaging
}
export const CREATE_PACKAGING = gql`
  mutation CreatePackaging($input: [CreatePackagingInput!]!){
    createPackaging(input: $input){
      ${UNIT_PARAMS}
    }
  }
`;

export type UpdatePackagingData = {
  updatePackaging: Packaging
}
export const UPDATE_PACKAGING = gql`
  mutation UpdatePackaging($input:UpdatePackagingInput!){
    updatePackaging(input:$input){
      ${UNIT_PARAMS}
    }
  }
`;
