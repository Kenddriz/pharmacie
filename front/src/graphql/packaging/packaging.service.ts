import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  CREATE_PACKAGING,
  CreatePackagingData,
  DELETED_PACKAGING,
  DeletedPackagingData,
  PACKAGING,
  PackagingData,
  REMOVE_PACKAGING,
  RemovePackagingData, RESTORE_PACKAGING,
  RestorePackagingData,
  SOFT_REMOVE_PACKAGING,
  SoftRemovePackagingData,
  UPDATE_PACKAGING,
  UpdatePackagingData,
} from './packaging.sdl';
import {
  CreatePackagingInput,
  MutationCreatePackagingArgs,
  MutationRemovePackagingArgs,
  MutationRestorePackagingArgs,
  MutationSoftRemovePackagingArgs,
  MutationUpdatePackagingArgs,
  Packaging,
  UpdatePackagingInput,
} from '../types';
import {reactive, ref} from 'vue';
import { cloneDeep, removeDialog } from '../utils/utils';
import { notify } from '../../shared/notification';
import { Loading } from 'quasar';

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
            packaging(existing: any, {toReference}) {
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
export const useDeletedPackaging = () => {
  const { result,  loading } = useQuery<DeletedPackagingData>(DELETED_PACKAGING);
  const list = useResult<
    DeletedPackagingData|undefined,
    Packaging[],
    Packaging[]
    >(result, [], res => res?.deletedPackaging||[])
  return { loading, list }
}
export const useSoftRemovePackaging = () => {
  const { mutate, onDone } = useMutation<
    SoftRemovePackagingData,
    MutationSoftRemovePackagingArgs
    >(SOFT_REMOVE_PACKAGING);
  onDone(() => {
    Loading.hide();
    notify('Suppression avec succès');
  });
  function softRemovePackaging(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Suppression ...'});
      void mutate({ id }, {
        update(cache, { data }) {
          if(data?.softRemovePackaging) {
            cache.modify({
              fields: {
                packaging(existingRef: any, { readField }) {
                  return existingRef.filter((eRef: any) => readField('id', eRef) !== id)
                },
                deletedPackaging(existing: any, {toReference}) {
                  return [...existing, toReference(data.softRemovePackaging)];
                }
              }
            })
          }
        }
      });
    });
  }
  return { softRemovePackaging }
}
export const useRestorePackaging = () => {
  const { mutate, onDone } = useMutation<
    RestorePackagingData,
    MutationRestorePackagingArgs
    >(RESTORE_PACKAGING);
  onDone(({ data }) => {
    Loading.hide();
    notify(data?.restorePackaging ? 'Restauration avec succès !' : 'Echec de restauration !');
  });
  function restore(id: number) {
    Loading.show({ message: 'Restauration ...'});
    void mutate({ id }, {
      update(cache, { data }) {
        if(data?.restorePackaging) {
          cache.modify({
            fields: {
              deletedPackaging(existingRef: any, { readField }) {
                return existingRef.filter((eRef: any) => readField('id', eRef) !== id)
              },
              packaging(existing: any, {toReference}) {
                return [...existing, toReference(data.restorePackaging)];
              }
            }
          })
        }
      }
    });
  }
  return { restore }
}
export const useRemovePackaging = () => {
  const { mutate, onDone } = useMutation<
    RemovePackagingData,
    MutationRemovePackagingArgs
    >(REMOVE_PACKAGING);
  onDone(() => {
    Loading.hide();
    notify('Suppression avec succès');
  });
  function remove(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Suppression ...'});
      void mutate({ id }, {
        update(cache, { data }) {
          if(data?.removePackaging) {
            cache.modify({
              fields: {
                deletedPackaging(existingRef: any, { readField }) {
                  return existingRef.filter((eRef: any) => readField('id', eRef) !== id)
                }
              }
            })
          }
        }
      });
    }, 'removeForever');
  }
  return {
    remove
  }
}
