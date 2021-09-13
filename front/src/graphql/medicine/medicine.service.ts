import {
  MedicineInputForm,
  MutationDeleteMedicineArgs,
  MutationRecoverMedicineArgs,
  MutationCreateMedicineArgs,
  MutationSoftRemoveMedicineArgs,
  MutationUpdateMedicineArgs,
} from '../types';
import { useMutation } from '@vue/apollo-composable';
import {
  CREATE_MEDICINE,
  CreateMedicineData,
  SOFT_REMOVE_MEDICINE,
  SoftRemoveMedicineData,
  DeleteMedicineData,
  DELETE_MEDICINE, RecoverMedicineData, UPDATE_MEDICINE, UpdateMedicineData,
} from './medicine.sdl';
import { removeDialog } from '../utils/utils';
import { ref } from 'vue';

/*export const useMedicines = () => {
  const medicines = ref<Medicine[]>([]);
  const { loading: medLoading, onResult } = useQuery<MedicinesData>(MEDICINES);
  onResult(({ data }) => {
    if(data.medicines) medicines.value = data.medicines;
  })
  return { medicines, medLoading }
}*/
export const useCreateMedicine = () => {
  const { mutate, loading: cmLoading } = useMutation<
    CreateMedicineData,
    MutationCreateMedicineArgs
    >(CREATE_MEDICINE);
  function createMedicine(input: MedicineInputForm) {
    void mutate({ input });
  }
  return { createMedicine, cmLoading }
}

export const useUpdateMedicine = () => {
  const { mutate, loading: umLoading } = useMutation<
    UpdateMedicineData,
    MutationUpdateMedicineArgs
    >(UPDATE_MEDICINE);
  const updateDialog = ref<boolean>(false);
  function updateMedicine(id: number, form: MedicineInputForm) {
    void mutate({ input: {id, form} });
    updateDialog.value = false;
  }
  return { updateMedicine, umLoading, updateDialog }
}

export const useSoftRemoveMedicine = () => {
  const { mutate, loading: srmLoading } = useMutation<
    SoftRemoveMedicineData,
    MutationSoftRemoveMedicineArgs
    >(SOFT_REMOVE_MEDICINE);
  return {
    srmLoading,
    softRemoveMedicine: (articleId: number, medicineId: number) => {
      removeDialog(() => void mutate({ input: { articleId, medicineId } }))
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
