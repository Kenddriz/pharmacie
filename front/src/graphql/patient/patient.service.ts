import { useLazyQuery, useResult } from '@vue/apollo-composable';
import { FIND_SUGGESTED_PATIENTS, FindSuggestedPatientsData } from './patient.sdl';
import { QueryFindSuggestedPatientsArgs, Patient } from '../types';

export const defaultPatientInput = {
  id: 0,
  name: '',
  phone: ''
}

export const useFindSuggestions = () => {
  const { result, loading: fgpLoading, load } = useLazyQuery<
    FindSuggestedPatientsData,
    QueryFindSuggestedPatientsArgs
    >(FIND_SUGGESTED_PATIENTS);
  function findSuggestions(keyword: string) {
    void load(FIND_SUGGESTED_PATIENTS, { keyword }, { fetchPolicy: 'no-cache' });
  }
  const patients = useResult<
    FindSuggestedPatientsData|undefined,
    Patient[],
    Patient[]
    >(result, [], res => res?.findSuggestedPatients||[]);
  return {
    patients,
    fgpLoading,
    findSuggestions
  }
}
