import {ApolloCache} from '@apollo/client';
import {Unit} from '../types';
import { cloneDeep } from 'lodash';
import {CreateUnitData} from './create/create.unit.sdl';
import {UNITS_QUERY, UnitsData} from './units/units.sdl';

export const ajoutUnitCache = (cache: ApolloCache<CreateUnitData>, unit: Unit) => {
  let unitsCache = cache.readQuery<UnitsData>({
    query: UNITS_QUERY
  });
  if(unitsCache?.units) {
    unitsCache = cloneDeep(unitsCache);
    unitsCache.units.unshift(unit);
    cache.writeQuery<UnitsData>({
      query: UNITS_QUERY,
      data: unitsCache
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
