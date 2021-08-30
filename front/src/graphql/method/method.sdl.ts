import { gql } from '@apollo/client/core';
import { Method } from '../types';

export type MethodsData = {
  methods: Method[]
}
export const METHOD_PARAMS = `
  id
  label
`;
export const METHODS = gql`
  query Methods{
    methods{${METHOD_PARAMS}}
  }
`;

export type CreateMethodData = {
  createMethod: Method
}
export const CREATE_METHOD = gql`
  mutation CreateMethod($input:MethodInput!){
    createMethod(input:$input){${METHOD_PARAMS}}
  }
`;

export type UpdateMethodData = {
  updateMethod: Method
}
export const UPDATE_METHOD = gql`
  mutation UpdateMethod($input:MethodInput!){
    updateMethod(input:$input){${METHOD_PARAMS}}
  }
`;
