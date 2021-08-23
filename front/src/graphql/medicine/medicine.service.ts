import {
  ArticlePagination,
  MutationDeleteMedicineArgs,
  MutationRecoverMedicineArgs,
  MutationSaveMedicineArgs,
  MutationSoftRemoveMedicineArgs,
} from '../types';
import { useMutation } from '@vue/apollo-composable';
import {
  SAVE_MEDICINE,
  SaveMedicineData,
  SOFT_REMOVE_MEDICINE,
  SoftRemoveMedicineData,
  DeleteMedicineData,
  DELETE_MEDICINE, RecoverMedicineData,
} from './medicine.sdl';
import { softRemoveDialog } from '../utils/utils';

export const useSaveMedicine = () => {
  const { mutate, loading: saveLoading } = useMutation<SaveMedicineData, MutationSaveMedicineArgs>(SAVE_MEDICINE);
  function addMedicine(articleId: number, formId: number, dosageId: number, packagingId: number) {
    void mutate({ input: {id: 0, articleId, formId, dosageId, packagingId} }, {
      update(cache, { data }) {
        if(data?.saveMedicine){
          cache.modify({
            fields: {
              paginateArticles(existing: ArticlePagination){
                const article = existing.items.find(a => a.id === data.saveMedicine.article.id);
                if(article){
                  article?.medicines?.push(data.saveMedicine);
                }
                return existing;
              }
            }
          })
        }
      }
    })
  }
  function updateMedicine(id: number, articleId: number, formId: number, dosageId: number, packagingId: number) {
    void mutate({ input: { id, articleId, formId, dosageId, packagingId }});
  }
  return { addMedicine, updateMedicine, saveLoading }
}

export const useSoftRemoveMedicine = () => {
  const { mutate, loading: softRemoveMedicineLoading } = useMutation<
    SoftRemoveMedicineData,
    MutationSoftRemoveMedicineArgs
    >(SOFT_REMOVE_MEDICINE);
  return {
    softRemoveMedicineLoading,
    softRemoveMedicine: (id: number) => {
      softRemoveDialog(() => void mutate({ id }, {
        update(cache, { data }) {
          if(data?.softRemoveMedicine) {
            cache.modify({
              fields: {
                paginateArticles(existingRef: any, { readField, toReference }){
                  const items = existingRef.items.filter((medRef: any) => id !== readField('id', medRef));
                  return {
                    ...existingRef,
                    items: toReference(items)
                  };
                }
              }
            })
          }
        }
      }))
    }
  }
}

export const useDeleteMedicine = () => {
  const { mutate, loading: deleteMedicineLoading } = useMutation<
    DeleteMedicineData,
    MutationDeleteMedicineArgs
    >(DELETE_MEDICINE);
  return {
    deleteMedicine: (id: number) => mutate({ id }),
    deleteMedicineLoading
  }
}

export const useRecoverMedicine = () => {
  const { mutate, loading: recoverMedicineLoading } = useMutation<
    RecoverMedicineData,
    MutationRecoverMedicineArgs
    >(DELETE_MEDICINE);
  return {
    recoverMedicine: (id: number) => mutate({ id }),
    recoverMedicineLoading
  }
}
