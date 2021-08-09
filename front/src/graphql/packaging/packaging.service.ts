import {useMutation, useQuery} from '@vue/apollo-composable';
import {
  CREATE_PACKAGING,
  CreatePackagingData,
  PACKAGING,
  PackagingData,
  UPDATE_PACKAGING,
  UpdatePackagingData
} from './packaging.sdl';
import {CreatePackagingInput, MutationCreatePackagingArgs, MutationUpdatePackagingArgs, Packaging} from '../types';
import {reactive, ref} from 'vue';
import {cloneDeep} from '../utils/utils';

export const useListPackaging = () => {
  const packagingList = ref<Packaging[]>([]);
  const { onResult, loading: loadList } = useQuery<PackagingData>(PACKAGING);
  onResult(res => {
    if(res?.data?.packaging) packagingList.value = cloneDeep(res.data.packaging);
  });

  const { mutate, loading: loadUpdate } = useMutation<
    UpdatePackagingData,
    MutationUpdatePackagingArgs
    >(UPDATE_PACKAGING);
  function updatePackage(index: number) {
    const { id, units } = packagingList.value[index];
    void mutate({ input: { id, units: units.map(u => ({ label: u.label, multiplicity: u.multiplicity }))} });
  }
  function removeUnit(indexP: number, indexU: number) {
    packagingList.value[indexP].units.splice(indexU, 1);
    updatePackage(indexP);
  }
  return {
    loadList,
    packagingList,
    updatePackage,
    removeUnit,
    loadUpdate
  }
}

export const useCreatePackaging = () => {
  const creationInput = ref<CreatePackagingInput[]>([]);
  const unit = reactive<CreatePackagingInput>({ label: 'inconu', multiplicity: 1 });
  const { mutate, loading: loadCreation } = useMutation<
    CreatePackagingData,
    MutationCreatePackagingArgs
    >(CREATE_PACKAGING, {
    update(cache, { data }) {
      if(data?.createPackaging) {
        cache.modify({
          fields: {
            packaging(existing: Packaging[], {toReference}) {
              return [...existing, toReference(data.createPackaging)];
            }
          }
        });
        creationInput.value.length = 0;
      }
    }
  });
  return {
    loadCreation,
    creationInput,
    unit,
    submitCreation: () => void mutate({ input: creationInput.value })
  }
}
