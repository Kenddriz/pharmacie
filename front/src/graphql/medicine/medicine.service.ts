import {
  MutationDeleteMedicineArgs,
  MutationRecoverMedicineArgs,
  MutationCreateMedicineArgs,
  MutationSoftRemoveMedicineArgs,
  MutationUpdateMedicineArgs,
  MedicineFormInput,
  QueryFindMedicinesByMeasureArgs,
  FindByMeasureInput, MedicinePaginationOutput,
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
  FIND_MEDICINES_BY_MEASURE,
} from './medicine.sdl';
import { removeDialog } from '../utils/utils';
import { reactive } from 'vue';
import { InitialPagination } from '../utils/pagination';

export const useCreateMedicine = () => {
  const { mutate, loading: cmLoading } = useMutation<
    CreateMedicineData,
    MutationCreateMedicineArgs
    >(CREATE_MEDICINE);
  function createMedicine(articleId: number, form: MedicineFormInput) {
    void mutate({ input: { articleId, form } });
  }
  return { createMedicine, cmLoading }
}

export const useUpdateMedicine = () => {
  const { mutate, loading: umLoading } = useMutation<
    UpdateMedicineData,
    MutationUpdateMedicineArgs
    >(UPDATE_MEDICINE);
  const updateDialog = reactive({
    id: 0,
    show: false,
    price: 0,
    vat: 0
  });
  function updateMedicine(form: MedicineFormInput) {
    void mutate({ input: {id: updateDialog.id, form} });
    updateDialog.show = false;
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
