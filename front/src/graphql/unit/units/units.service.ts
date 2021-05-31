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

const findPathToChild = (id: number, units: Unit[], path: Unit[] = []):Unit[] => {
  const child = units.find(u => u.id === id);
  if(child && !path.length)path.unshift(child);
  /**Find its parent*/
  const parent = units.find(u => u.id === child?.parentId);
  if(parent) {
      path.unshift(parent);
      /**parent becomes child*/
      return findPathToChild(parent.id, units.filter(u => u.id !== id), path)
  }
  return path;
};

export const useUnits = () => {
  const {result} = useQuery<UnitsData>(UNITS_QUERY);
  const units = useResult(result,[], res => res.units);

  function pathToChild (childId: number): Unit[] {
    return findPathToChild(childId, units.value.map((u: Unit) => u), [])
  }

  function orphanUnits(): Unit[] {
    const orphans: Unit[] = [];
    units.value.forEach(u => {
      if(!units.value.find((x: Unit) => x.parentId === u.id))/*if never parent**/
        orphans.push(u);
    });
    return orphans;
  }
  const findUnit = (id: number): Unit|undefined => units.value.find(u => u.id === id);

  return {
    units,
    pathToChild,
    orphanUnits,
    findUnit
  }
}
