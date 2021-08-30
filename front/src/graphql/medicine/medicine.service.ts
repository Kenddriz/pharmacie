import {
  Medicine,
  MutationDeleteMedicineArgs,
  MutationRecoverMedicineArgs,
  MutationSaveMedicineArgs,
  MutationSoftRemoveMedicineArgs,
} from '../types';
import { useMutation, useQuery } from '@vue/apollo-composable';
import {
  SAVE_MEDICINE,
  SaveMedicineData,
  SOFT_REMOVE_MEDICINE,
  SoftRemoveMedicineData,
  DeleteMedicineData,
  DELETE_MEDICINE, RecoverMedicineData, MedicinesData, MEDICINES,
} from './medicine.sdl';
import { softRemoveDialog } from '../utils/utils';
import { ref } from 'vue';

export const  useMedicines = () => {
  const medicines = ref<Medicine[]>([]);
  const { loading: medLoading, onResult } = useQuery<MedicinesData>(MEDICINES);
  onResult(({ data }) => {
    if(data.medicines) medicines.value = data.medicines;
  })
  return { medicines, medLoading }
}
export const useSaveMedicine = () => {
  const { mutate, loading: saveLoading } = useMutation<SaveMedicineData, MutationSaveMedicineArgs>(SAVE_MEDICINE);
  function addMedicine(articleId: number, formId: number, dosageId: number, packagingId: number) {
    void mutate({ input: {id: 0, articleId, formId, dosageId, packagingId} });
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
    softRemoveMedicine: (articleId: number, medicineId: number) => {
      softRemoveDialog(() => void mutate({ input: { articleId, medicineId } }))
    }
  }
}

export const useDeleteMedicine = () => {
  const { mutate, loading: deleteMedicineLoading } = useMutation<
    DeleteMedicineData,
    MutationDeleteMedicineArgs
    >(DELETE_MEDICINE);
  return {
    deleteMedicine: (articleId: number, medicineId: number) => mutate({ input: { articleId, medicineId }  }),
    deleteMedicineLoading
  }
}

export const useRecoverMedicine = () => {
  const { mutate, loading: recoverMedicineLoading } = useMutation<
    RecoverMedicineData,
    MutationRecoverMedicineArgs
    >(DELETE_MEDICINE);
  return {
    recoverMedicine: (articleId: number, medicineId: number) => mutate({ input: { articleId, medicineId }  }),
    recoverMedicineLoading
  }
}
