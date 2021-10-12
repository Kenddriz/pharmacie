import {gql} from '@apollo/client/core';
import {Packaging} from '../types';
export const PACKAGING_PARAMS = `
  id
  units{
    label
    multiplicity
  }
`;
export type PackagingData = {
  packaging: Packaging[]
}
export const PACKAGING = gql`
  query Packaging{
    packaging{
      ${PACKAGING_PARAMS}
    }
  }
`;
export type CreatePackagingData = {
  createPackaging: Packaging
}
export const CREATE_PACKAGING = gql`
  mutation CreatePackaging($input: [CreatePackagingInput!]!){
    createPackaging(input: $input){
      ${PACKAGING_PARAMS}
    }
  }
`;
export type UpdatePackagingData = {
  updatePackaging: Packaging
}
export const UPDATE_PACKAGING = gql`
  mutation UpdatePackaging($input:UpdatePackagingInput!){
    updatePackaging(input:$input){
      ${PACKAGING_PARAMS}
    }
  }
`;
export type DeletedPackagingData = {
  deletedPackaging: Packaging[]
}
export const DELETED_PACKAGING = gql`
  query DeletedPackaging{
    deletedPackaging{
      ${PACKAGING_PARAMS}
      archivedAt
    }
  }
`;
export type SoftRemovePackagingData = {
  softRemovePackaging: Packaging;
}
export const SOFT_REMOVE_PACKAGING = gql`
    mutation SoftRemovePackaging($id: Int!){
      softRemovePackaging(id: $id){
        ${PACKAGING_PARAMS}
        archivedAt
      }
    }
`;
export type RestorePackagingData = {
  restorePackaging: Packaging;
}
export const RESTORE_PACKAGING = gql`
  mutation RestorePackaging($id: Int!){
    restorePackaging(id: $id){
      ${PACKAGING_PARAMS}
    }
  }
`;
export type RemovePackagingData = {
  removePackaging: boolean;
}
export const REMOVE_PACKAGING = gql`
  mutation RemovePackaging($id: Int!) {
    removePackaging(id:$id)
  }
`;
