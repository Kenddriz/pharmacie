import {CREATE_UNIT, CreateUnitData} from './create.unit.sdl';
import {CreateUnitInput, MutationCreateUnitArgs} from '../../types';
import {ajoutUnitCache} from '../updateUnitCache';
import {useMutation} from '@vue/apollo-composable';

export const createUnitService = () => {

 const { mutate, loading } = useMutation<
   CreateUnitData,
   MutationCreateUnitArgs
   >(CREATE_UNIT, () => ({
      update: (cache, { data }) => {
        if(data?.createUnit) ajoutUnitCache(cache, data.createUnit);
      }
    }));
 const createUnit = async (input: CreateUnitInput) => {
   await mutate({ input });
 }
  return { createUnit, loading }
}
