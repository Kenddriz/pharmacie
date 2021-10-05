import { useLazyQuery, useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  FIND_SUGGESTED_PATIENTS,
  FindSuggestedPatientsData, PAGINATE_PATIENT_SALES,
  PAGINATE_PATIENTS, PaginatePatientSalesData,
  PaginatePatientsData, UPDATE_PATIENT, UpdatePatientData,
} from './patient.sdl';
import {
  QueryFindSuggestedPatientsArgs,
  Patient,
  QueryPaginatePatientsArgs,
  PaginationInput,
  PaginatePatientSalesOutput,
  PaginatePatientSalesInput,
  QueryPaginatePatientSalesArgs,
  MutationUpdatePatientArgs,
  CreatePatientInput, Sale,
} from '../types';
import { reactive, ref } from 'vue';
import { InitialPagination } from '../utils/pagination';
import { cloneDeep } from '../utils/utils';
import { Loading } from 'quasar';
import { notify } from '../../shared/notification';

export const defaultPatientInput = {
  id: 0,
  name: '',
  phone: ''
}

export const useFindSuggestions = () => {
  const { result, loading: fgpLoading, load } = useLazyQuery<
    FindSuggestedPatientsData,
    QueryFindSuggestedPatientsArgs
    >(FIND_SUGGESTED_PATIENTS);
  function findSuggestions(keyword: string) {
    void load(FIND_SUGGESTED_PATIENTS, { keyword }, { fetchPolicy: 'no-cache' });
  }
  const patients = useResult<
    FindSuggestedPatientsData|undefined,
    Patient[],
    Patient[]
    >(result, [], res => res?.findSuggestedPatients||[]);
  return {
    patients,
    fgpLoading,
    findSuggestions
  }
}

export const usePaginatePatients = () => {
  const ppInput = reactive<PaginationInput>({
    keyword: '',
    limit: Math.ceil((screen.height - 150)/50),
    page: 1
  });
  const selected = ref<Patient[]>([]);
  const { loading: ppLoading, refetch, result } = useQuery<
    PaginatePatientsData,
    QueryPaginatePatientsArgs
    >(PAGINATE_PATIENTS, { input: cloneDeep(ppInput) });

  const patients = useResult(result, InitialPagination, res => {
    if(res?.paginatePatients) {
      const id = selected.value[0]?.id;
      selected.value.length = 0;
      const find = res.paginatePatients.items.find(item => item.id === id)||res.paginatePatients.items[0];
      if(find)selected.value = [cloneDeep(find)];
      return res.paginatePatients;
    }
    return InitialPagination
  });
  function setSelected(index: number) {
    Object.assign(selected.value[0], patients.value.items[index]);
  }
  function findPatients() { void refetch({ input: ppInput }); }
  return {
    ppLoading,
    setSelected,
    patients,
    selected,
    findPatients,
    ppInput
  }
}

export const usePaginatePatientSales = () => {
  const psInput = reactive<PaginatePatientSalesInput>({
    patientId: 0,
    limit: Math.ceil((screen.height - 150)/50),
    page: 1
  });
  const sSale = reactive<{ show: boolean, sale: Sale[]}>({
    show: false,
    sale: []
  });
  const { loading: psLoading, result, load } = useLazyQuery<
    PaginatePatientSalesData,
    QueryPaginatePatientSalesArgs
    >(PAGINATE_PATIENT_SALES);
  function loadSales() {
    void load(PAGINATE_PATIENT_SALES, { input: psInput });
  }
  const sale = useResult<
    PaginatePatientSalesData|undefined,
    PaginatePatientSalesOutput,
    PaginatePatientSalesOutput
    >(result, InitialPagination, res => {
      if(res?.paginatePatientSales) {
        const id = sSale.sale[0]?.id;
        sSale.sale.length = 0;
        const find = res.paginatePatientSales.items.find(item => item.id === id)||res.paginatePatientSales.items[0];
        if(find)sSale.sale = [cloneDeep(find)];
        return res?.paginatePatientSales;
      }
      return InitialPagination;
  });
  function setSelectedSale(index: number) {
    sSale.show = true;
    Object.assign(sSale.sale[0], sale.value.items[index]);
  }
  return {
    psInput,
    loadSales,
    psLoading,
    sale,
    setSelectedSale,
    sSale
  }
}

export const useUpdatePatient = (patient: Patient) => {
  const { id, phone, name } = patient;
  const upInput = reactive<CreatePatientInput>({ id, phone, name } );
  const { mutate, onDone } = useMutation<
    UpdatePatientData,
    MutationUpdatePatientArgs
    >(UPDATE_PATIENT);
  onDone(() => {
    Loading.hide();
    notify('Mise à jour avec succès !');
  })
  function updatePatient() {
    Loading.show({ message: 'Exécution de l\'opération ...'});
    void mutate({ input: upInput });
  }
  return {
    upInput,
    updatePatient
  }
}
