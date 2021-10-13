import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { reactive, ref } from 'vue';
import {
  CreateInvoiceInput,
  Invoice,
  MutationCreateInvoiceArgs,
  MutationRemoveInvoiceArgs,
  MutationRestoreInvoiceArgs,
  MutationSoftRemoveInvoiceArgs,
  MutationUpdateInvoiceArgs,
  PaginationInput,
  QueryPaginateCommandsArgs,
  QueryPaginateDeletedInvoicesArgs,
  UpdateInvoiceInput,
} from '../types';
import {
  CREATE_INVOICE,
  CreateInvoiceData,
  PAGINATE_DELETED_INVOICES,
  PAGINATE_INVOICES,
  PaginateDeletedInvoicesData,
  PaginateInvoicesData, REMOVE_INVOICE,
  RemoveInvoiceData,
  RESTORE_INVOICE,
  RestoreInvoiceData,
  SOFT_REMOVE_INVOICE,
  SoftRemoveInvoiceData,
  UPDATE_INVOICE,
  UpdateInvoiceData,
} from './incoice.sdl';
import { addPaginationCache, deletePaginationCache, InitialPagination } from '../utils/pagination';
import { cloneDeep, removeDialog } from '../utils/utils';
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

export const usePaginateDeletedInvoices = () => {
  const input = reactive<PaginationInput>({
    page: 1,
    limit : 5
  });
  const { loading, result } = useQuery<
    PaginateDeletedInvoicesData,
    QueryPaginateDeletedInvoicesArgs
    >(PAGINATE_DELETED_INVOICES, { input });
  const invoice = useResult(result, InitialPagination, pick => pick?.paginateDeletedInvoices||InitialPagination)
  return {
    input,
    loading,
    invoice
  }
}
export const useSoftRemoveInvoice = () => {
  const { onDone, mutate } = useMutation<
    SoftRemoveInvoiceData,
    MutationSoftRemoveInvoiceArgs
    >(SOFT_REMOVE_INVOICE);
  onDone(() => {
    Loading.hide();
    notify('suppression avec succès !');
  });
  function softRemoveInvoice(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Suppression ...' });
      void mutate({ id }, {
        update(cache, { data }) {
          if(data?.softRemoveInvoice) {
            cache.modify({
              fields: {
                paginateInvoices(existingRef: any, {readField, toReference}){
                  return deletePaginationCache(id, existingRef, readField, toReference);
                },
                paginateDeletedSales(existingRef: any, { readField }) {
                  return addPaginationCache(data.softRemoveInvoice, existingRef, readField);
                }
              }
            })
          }
        }
      })
    })
  }
  return { softRemoveInvoice }
}
export const useRestoreInvoice = () => {
  const { mutate, onDone } = useMutation<
    RestoreInvoiceData,
    MutationRestoreInvoiceArgs
    >(RESTORE_INVOICE);
  onDone(({ data }) => {
    Loading.hide();
    notify(data?.restoreInvoice ? 'Restauration avec succès !' : 'Echec de restauration');
  });
  function restore(id: number) {
    Loading.show({ message: 'Restauration ...'});
    void mutate({ id }, {
      update: (cache, { data }) => {
        if(data?.restoreInvoice) {
          cache.modify({
            fields: {
              paginateInvoices(existingRef: any, {toReference}) {
                return addPaginationCache(data.restoreInvoice, existingRef, toReference);
              },
              paginateDeletedInvoices(existingRef: any, {readField, toReference}) {
                return deletePaginationCache(id, existingRef, readField,  toReference);
              }
            }
          })
        }
      }
    })
  }
  return { restore }
}
export const useRemoveInvoice = () => {
  const { onDone, mutate} = useMutation<
    RemoveInvoiceData,
    MutationRemoveInvoiceArgs
    >(REMOVE_INVOICE);
  onDone(() => {
    Loading.hide();
    notify('suppression avec succès !');
  });
  function remove(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Exécution de l\'opération ...' });
      void mutate({ id }, {
        update(cache, { data }) {
          if(data?.removeInvoice) {
            cache.modify({
              fields: {
                paginateDeletedInvoices(existingRef: any, { readField, toReference }) {
                  return deletePaginationCache(id, existingRef, readField, toReference);
                }
              }
            })
          }
        }
      })
    }, 'removeForever')
  }
  return { remove }
}
