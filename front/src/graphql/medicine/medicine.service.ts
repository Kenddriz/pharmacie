import {
  MutationDeleteMedicineArgs,
  MutationRecoverMedicineArgs,
  MutationCreateMedicineArgs,
  MutationSoftRemoveMedicineArgs,
  MutationUpdateMedicineArgs,
  MedicineFormInput,
  QueryFindMedicinesByMeasureArgs,
  FindByMeasureInput, MedicinePaginationOutput, QueryMostConsumedMedicinesArgs,
} from '../types';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  CREATE_MEDICINE,
  CreateMedicineData,
  SOFT_REMOVE_MEDICINE,
  SoftRemoveMedicineData,
  DeleteMedicineData,
  DELETE_MEDICINE,
  RecoverMedicineData,
  UPDATE_MEDICINE,
  UpdateMedicineData,
  FindMedicinesByMeasureData,
  FIND_MEDICINES_BY_MEASURE, MOST_CONSUMED_MEDICINES, MostConsumedMedicinesData,
} from './medicine.sdl';
import { removeDialog } from '../utils/utils';
import { reactive, ref } from 'vue';
import { InitialPagination } from '../utils/pagination';
import { Loading } from 'quasar';
import { notify } from '../../shared/notification';

export const useCreateMedicine = () => {
  const { mutate, onDone } = useMutation<
    CreateMedicineData,
    MutationCreateMedicineArgs
    >(CREATE_MEDICINE);
  onDone(() => {
    Loading.hide();
    notify('Création avec succès !');
  })
  function createMedicine(articleId: number, form: MedicineFormInput) {
    Loading.show({
      message: 'Exécution de l\opération ...'
    });
    void mutate({ input: { articleId, form } });
  }
  return { createMedicine }
}

export const useUpdateMedicine = () => {
  const { mutate, onDone } = useMutation<
    UpdateMedicineData,
    MutationUpdateMedicineArgs
    >(UPDATE_MEDICINE);
  onDone(() => {
    Loading.hide();
    notify('Mise à jour avec succès !');
  })
  function updateMedicine(id: number, form: MedicineFormInput) {
    Loading.show({ message: 'Exécution de l\'opération ...'});
    void mutate({ input: {id, form} });
  }
  return { updateMedicine }
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

export const useFindMedicinesByMeasure = (measureId: number, foreignKey: string) => {
  const input = reactive<FindByMeasureInput>({
    measureId,
    foreignKey,
    page: 1,
    limit: 5
  });
  const { loading, result } = useQuery<
    FindMedicinesByMeasureData,
    QueryFindMedicinesByMeasureArgs
    >(FIND_MEDICINES_BY_MEASURE, { input }, { fetchPolicy: 'no-cache' });
  const medicines = useResult<
    FindMedicinesByMeasureData|undefined,
    MedicinePaginationOutput,
    MedicinePaginationOutput
    >(result, InitialPagination, res => res?.findMedicinesByMeasure||InitialPagination);
  return { medicines, loading, input }
}

export const useMostConsumedMedicines = () => {
  const year = ref<number>(new Date().getFullYear());
  const { loading, result } = useQuery<
    MostConsumedMedicinesData,
    QueryMostConsumedMedicinesArgs
    >(MOST_CONSUMED_MEDICINES, { year: year.value }, { fetchPolicy: 'no-cache' });
  const consumed = useResult(result, [], pick => pick?.mostConsumedMedicines);
  return {
    loading,
    consumed,
    year
  }
}
