import { useMutation, useQuery, useResult, useLazyQuery } from '@vue/apollo-composable';
import { reactive, ref } from 'vue';
import {
  CreateInvoiceInput,
  Invoice,
  MutationCreateInvoiceArgs,
  PaginationInput, QueryFindOneInvoiceArgs,
  QueryPaginateCommandsArgs,
} from '../types';
import {
  CREATE_INVOICE,
  CreateInvoiceData,
  FIND_ONE_INVOICE, FindOneInvoiceData,
  PAGINATE_INVOICES,
  PaginateInvoicesData,
} from './incoice.sdl';
import { formatDate } from '../../shared/date';
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
  const createInvoiceInput = reactive<CreateInvoiceInput>({
    dueDate: formatDate(Date.now(), 'DATE_ONLY'),
    reference: '',
    commandId: 0
  });
  const invoiceDialog = ref<boolean>(false)
  const createInvoice = async(commandId: number) => {
    createInvoiceInput.commandId = commandId;
    await mutate({ input: createInvoiceInput });
    invoiceDialog.value = false;
  }
  return { createInvoiceLoading,createInvoiceInput,createInvoice, invoiceDialog }
}

export const useFindOneInvoice = () => {
  const { load, loading: findInvoiceLoading, result } = useLazyQuery<
    FindOneInvoiceData,
    QueryFindOneInvoiceArgs
    >(FIND_ONE_INVOICE);
  return {
    findOneInvoice: (commandId: number) => {
      load(FIND_ONE_INVOICE, {commandId}, {fetchPolicy: 'no-cache'})
    },
    cmdInvoice: useResult(result, null, res => res?.findOneInvoice),
    findInvoiceLoading
  }
}
