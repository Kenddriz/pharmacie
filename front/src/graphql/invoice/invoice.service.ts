import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { reactive, ref } from 'vue';
import {
  CreateInvoiceInput,
  Invoice,
  MutationCreateInvoiceArgs, MutationUpdateInvoiceArgs,
  PaginationInput,
  QueryPaginateCommandsArgs, UpdateInvoiceInput,
} from '../types';
import {
  CREATE_INVOICE,
  CreateInvoiceData,
  PAGINATE_INVOICES,
  PaginateInvoicesData,
  UPDATE_INVOICE,
  UpdateInvoiceData,
} from './incoice.sdl';
import { InitialPagination } from '../utils/pagination';
import { cloneDeep } from '../utils/utils';
import { notify } from '../../shared/notification';
import { Loading } from 'quasar';

export const usePaginateInvoices = () => {
  const paginationInput = reactive<PaginationInput>({
    page: 1,
    limit: Math.ceil((screen.height - 250)/50),
    keyword: ''
  });
  const selectedInvoice = ref<Invoice[]>([]);
  const setSelectedInvoice = (index: number) => {
    Object.assign(selectedInvoice.value[0], invoices.value.items[index]);
  }
  const { result, loading: paginateLoading, refetch } = useQuery<
    PaginateInvoicesData,
    QueryPaginateCommandsArgs
    >(PAGINATE_INVOICES, { paginationInput: { ...paginationInput } });
  const invoices = useResult(result, InitialPagination, res => {
    if(res?.paginateInvoices) {
      const id = selectedInvoice.value[0]?.id;
      selectedInvoice.value.length = 0;
      const find = res.paginateInvoices.items.find(item => item.id === id)||res.paginateInvoices.items[0];
      if(find)selectedInvoice.value = [cloneDeep(find)];
      return res.paginateInvoices;
    }
    return InitialPagination;
  });
  function findInvoices() { void refetch({ paginationInput })}
  return {
    invoices,
    paginateLoading,
    selectedInvoice,
    setSelectedInvoice,
    findInvoices,
    paginationInput
  }
}

export const useCreateInvoice = () => {
  const  ciDialog = ref<boolean>(false);
  const { mutate, onDone } = useMutation<
    CreateInvoiceData,
    MutationCreateInvoiceArgs
    >(CREATE_INVOICE);
  onDone(({ data }) => {
    Loading.hide();
    if(data?.createInvoice) {
      ciDialog.value = false;
      notify('La facture a été créée!');
    }
  })
  const createInvoice =(input: CreateInvoiceInput) => {
    Loading.show({
      message: 'Enregistrement des données ...'
    })
    void mutate({ input });
  }
  return { createInvoice, ciDialog }
}

export const useUpdateInvoice = () => {
  const { mutate, onDone } = useMutation<
    UpdateInvoiceData,
    MutationUpdateInvoiceArgs
    >(UPDATE_INVOICE);
  onDone(({ data }) => {
    Loading.hide();
    if(data?.updateInvoice)notify('Mise à jour avec succès');
  })
  return {
    updateInvoice: (input: UpdateInvoiceInput) => {
      Loading.show({ message: 'Enregistrement des modifications ...'})
      void mutate({ input });
    }
  }
}

