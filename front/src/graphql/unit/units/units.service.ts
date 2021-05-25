import { useQuery, useResult } from '@vue/apollo-composable';
import { UNITS_QUERY, UnitsData } from './units.sdl';
import {Unit} from '../../types';

export type Arbre = Unit & {
  children?: Unit[]
}

const makeNode = (unit: Arbre): Arbre => {

  return {
    ...unit,
    children: unit.children ? unit.children : []
  };
};

export const unitNodes = (
  units: Arbre[],
  parentId: number
): Arbre[] => {
  const out = [];
  for (const unit of units) {
    if (unit.parentId === parentId) {
      const subunits = unitNodes(units, unit.id);
      if (subunits.length) unit['children'] = subunits;
      out.push(makeNode(unit));
    }
  }
  return out;
};

export const useUnits = () => {
  const {result} = useQuery<UnitsData>(UNITS_QUERY);
  const units = useResult(result,[], res => res.units);
  const findUnit: any = (id: number) => units.value.find(u => u.id === id);
  return {
    units,
    findUnit
  }
}
