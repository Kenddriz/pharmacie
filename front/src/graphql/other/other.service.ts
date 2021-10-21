import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { COUNTER, CounterData, REMOVE_ALL_ARCHIVED, RemoveAllArchivedData } from './other.sdl';
import { MutationRemoveAllArchivedArgs } from '../types';
import { notify } from '../../shared/notification';
import { Loading } from 'quasar';
import { emptyPaginationCache } from '../utils/pagination';

export const useCounter = () => {
  const { result, loading } = useQuery<CounterData>(COUNTER, {}, {fetchPolicy: 'no-cache'});
  const counts = useResult(result, new CounterData(), res => res);
  return {
    counts,
    loading
  }
}
export const useRemoveAllArchived = () => {
  const { mutate, onDone } = useMutation<
    RemoveAllArchivedData,
    MutationRemoveAllArchivedArgs
    >(REMOVE_ALL_ARCHIVED);
  onDone(({ data }) => {
    Loading.hide();
    notify(data?.removeAllArchived ? 'Corbeille nettoyée !' : 'Nettoyage echoué !');
  });
  function clear(repo: string) {
    void mutate({ repo }, {
      update: (cache, { data }) => {
        if(data?.removeAllArchived) {
          switch (repo) {
            case 'Provider':
              cache.modify({
                fields: {
                  paginateDeletedProviders(existingRef: any, { toReference }) {
                    return emptyPaginationCache(existingRef, toReference);
                  }
                }
              })
              break;
            case 'Article':
              cache.modify({
                fields: {
                  paginateDeletedArticles(existingRef: any, { toReference }) {
                    return emptyPaginationCache(existingRef, toReference);
                  }
                }
              })
              break;
            case 'Medicine':
              cache.modify({
                fields: {
                  paginateDeletedMedicines(existingRef: any, { toReference }) {
                    return emptyPaginationCache(existingRef, toReference);
                  }
                }
              })
              break;
            case 'Packaging':
              cache.modify({
                fields: {
                  deletedPackaging(){
                    return [];
                  }
                }
              })
              break;
            case 'Batch':
              cache.modify({
                fields: {
                  paginateDeletedBatches(existingRef: any, { toReference }) {
                    return emptyPaginationCache(existingRef, toReference);
                  }
                }
              })
              break;
            case 'Command':
              cache.modify({
                fields: {
                  paginateDeletedCommands(existingRef: any, { toReference }) {
                    return emptyPaginationCache(existingRef, toReference);
                  }
                }
              })
              break;
            case 'Invoice':
              cache.modify({
                fields: {
                  paginateDeletedInvoices(existingRef: any, { toReference }) {
                    return emptyPaginationCache(existingRef, toReference);
                  }
                }
              })
              break;
            case 'Sale':
              cache.modify({
                fields: {
                  paginateDeletedSales(existingRef: any, { toReference }) {
                    return emptyPaginationCache(existingRef, toReference);
                  }
                }
              })
              break;
          }
        }
      }
    })
  }
  return { clear }
}
