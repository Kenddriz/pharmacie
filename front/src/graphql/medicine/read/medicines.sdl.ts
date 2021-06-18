import { Medicine } from '../../types';
import { gql } from '@apollo/client/core';
import { MEDICINE_PARAMS } from '../medicine';

export type MedicinesData = {
  medicines: Medicine[]
}
export const MEDICINES = gql`
  query Medicines {
    medicines {
      ${MEDICINE_PARAMS}
    }
  }
`;
