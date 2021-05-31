import {CREATE_UNIT, CreateUnitData} from './create.unit.sdl';
import {CreateUnitInput, MutationCreateUnitArgs} from '../../types';
import {ajoutUnitCache} from '../updateUnitCache';
import {useMutation} from '@vue/apollo-composable';
import { cloneDeep } from 'lodash';
import { defaultUnit } from '../unit';
import { reactive, ref } from 'vue';

export const createUnitService = () => {

 const { mutate, loading: createLoading } = useMutation<
   CreateUnitData,
   MutationCreateUnitArgs
   >(CREATE_UNIT, () => ({
      update: (cache, { data }) => {
        if(data?.createUnit) ajoutUnitCache(cache, data.createUnit);
      }
    }));
 const createInput = reactive<CreateUnitInput>(cloneDeep(defaultUnit));
 const createDialog = ref<boolean>(false);
 const setPrentId = (pId: number) => { createInput.parentId = pId;  createDialog.value = true; }
 const createUnit = async () => {
   await mutate({ input: createInput });
 }
  return { createUnit, createLoading, createInput, createDialog, setPrentId }
}
