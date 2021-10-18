import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { reactive, ref } from 'vue';
import {
  CreateInvoiceInput,
  MutationCreateInvoiceArgs,
  MutationRemoveInvoiceArgs,
  MutationRestoreInvoiceArgs,
  MutationSoftRemoveInvoiceArgs,
  MutationUpdateInvoiceArgs,
  PaginationInput,
  QueryPaginateInvoicesArgs,
  QueryPaginateDeletedInvoicesArgs,
  UpdateInvoiceInput,
  PaginateInvoiceInput
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
import { removeDialog } from '../utils/utils';
import { notify } from '../../shared/notification';
import { Loading } from 'quasar';

/**args
 * withSales: fetch movements of a batch
 * **/
export const usePaginateInvoices = (withSales: boolean, paymentId = 0) => {
  const paginationInput = reactive<PaginateInvoiceInput>({
    page: 1,
    limit: Math.ceil((screen.height - 250)/50),
    keyword: ''
  });
  if(paymentId > 0) Object.assign(paginationInput, { paymentId });
  const { result, loading, refetch } = useQuery<
    PaginateInvoicesData,
    QueryPaginateInvoicesArgs
    >(PAGINATE_INVOICES(withSales), { input: { ...paginationInput } });
  const invoices = useResult(result, InitialPagination, res => res?.paginateInvoices||InitialPagination);
  function findInvoices() {
    loading.value = true;
    refetch({ input: paginationInput })?.finally(() => loading.value = false);
  }
  return {
    findInvoices,
    paginationInput,
    loading,
    invoices
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
      message: 'Création ...'
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
      Loading.show({ message: 'Mise à jour ...'})
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
                paginateDeletedInvoices(existingRef: any, { readField }) {
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
