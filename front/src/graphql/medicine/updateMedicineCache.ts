import {ApolloCache} from '@apollo/client';
import { Medicine } from '../types';
import { cloneDeep } from 'lodash';
import { MEDICINES, MedicinesData } from './read/medicines.sdl';
import { CreateMedicineData } from './create/create.medicine.sdl';

export const addMedicineCache = (cache: ApolloCache<CreateMedicineData>, medicine: Medicine) => {
  let medicinesCache = cache.readQuery<MedicinesData>({
    query: MEDICINES
  });
  if(medicinesCache?.medicines) {
    medicinesCache = cloneDeep(medicinesCache);
    medicinesCache.medicines.unshift(medicine);
    cache.writeQuery<MedicinesData>({
      query: MEDICINES,
      data: medicinesCache
    })
  }
}

/*export const deleteUnitFromCache = (cache: ApolloCache<DeleteUnitData>, id: number|undefined) => {
  const unitsCache = cloneDeep(cache.readQuery<UnitsData>({
    query: UNITS_QUERY
  }));
  if(unitsCache?.units) {
    unitsCache.units = unitsCache.units.filter(cat => cat.id !== id);
    cache.writeQuery<UnitsData>({
      query: UNITS_QUERY,
      data: unitsCache
    })
  }
}*/
