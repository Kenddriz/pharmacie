import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  CREATE_PACKAGING,
  CreatePackagingData,
  PACKAGING,
  PackagingData,
  UPDATE_PACKAGING,
  UpdatePackagingData
} from './packaging.sdl';
import {
  CreatePackagingInput,
  MutationCreatePackagingArgs,
  MutationUpdatePackagingArgs,
  Packaging,
  UpdatePackagingInput,
} from '../types';
import {reactive, ref} from 'vue';
import {cloneDeep} from '../utils/utils';
import { notify } from '../../shared/notification';

export const useListPackaging = () => {
  const { result,  loading: loadList } = useQuery<PackagingData>(PACKAGING);
  const selectedPk = reactive<Packaging>({ id: 0, units: [] });
  const packagingList = useResult<PackagingData|undefined, Packaging[], Packaging[]>(result, [], res => {
    if(res?.packaging && res.packaging.length){
      Object.assign(selectedPk, cloneDeep(res.packaging[0]));
      return res.packaging;
    }
    return [];
  })
  return { loadList, packagingList, selectedPk }
}
export const useUpdatePackaging = () => {
  const { mutate, onDone } = useMutation<
    UpdatePackagingData,
    MutationUpdatePackagingArgs
    >(UPDATE_PACKAGING);
  onDone(({ data }) => {
    if(data?.updatePackaging)notify('Mise à jour avec succès !');
  })
  function updatePackage(input: UpdatePackagingInput) {
    void mutate({ input });
  }
  return { updatePackage }
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
