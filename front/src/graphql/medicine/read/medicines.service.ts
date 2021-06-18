import { useQuery, useResult } from '@vue/apollo-composable';
import { MedicinesData, MEDICINES } from './medicines.sdl';

export const useMedicines = () => {
  const { result, loading: medicinesLoading } = useQuery<MedicinesData>(MEDICINES);
  return {
    medicines: useResult(result, [], res => res.medicines),
    medicinesLoading
  }
}
