import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { reactive, ref } from 'vue';
import {
  CreateInvoiceInput,
  Invoice,
  MutationCreateInvoiceArgs,
  PaginationInput,
  QueryPaginateCommandsArgs,
} from '../types';
import {
  CREATE_INVOICE,
  CreateInvoiceData,
  PAGINATE_INVOICES,
  PaginateInvoicesData,
} from './incoice.sdl';
import { InitialPagination } from '../utils/pagination';
import { cloneDeep } from '../utils/utils';

export const paginationInput = reactive<PaginationInput>({
  page: 1,
  limit: Math.ceil((screen.height - 150)/50),
});
export const usePaginateInvoices = () => {
  const selectedInvoice = ref<Invoice|undefined>(undefined);
  let selectedIndex = 0;
  const setSelectedInvoice = (index: number) => {
    selectedInvoice.value = cloneDeep(invoices.value?.items[index]);
    selectedIndex = index;
  }
  const { result, loading: paginateLoading } = useQuery<
    PaginateInvoicesData,
    QueryPaginateCommandsArgs
    >(PAGINATE_INVOICES, { paginationInput });
  const invoices = useResult(result, InitialPagination, res => {
    if(res?.paginateInvoices?.items?.length)
      selectedInvoice.value =  cloneDeep(res.paginateInvoices.items[selectedIndex]);
    return res?.paginateInvoices;
  });

  return { invoices, paginateLoading, selectedInvoice, setSelectedInvoice }
}

export const useCreateInvoice = () => {
  const { mutate, loading: createInvoiceLoading} = useMutation<
    CreateInvoiceData,
    MutationCreateInvoiceArgs
    >(CREATE_INVOICE);
  const invoiceDialog = ref<boolean>(false)
  const createInvoice = async(input: CreateInvoiceInput) => {
    await mutate({ input });
    invoiceDialog.value = false;
  }
  return { createInvoiceLoading,createInvoice, invoiceDialog }
}

