import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  CREATE_PROVIDER,
  SaveProviderData,
  PaginateProvidersData,
  PAGINATE_PROVIDERS,
  ProviderCommandsChartData,
  PROVIDER_COMMANDS_CHART,
  RemoveProviderData,
  REMOVE_PROVIDER,
  UpdateProviderAvatarData,
  UPDATE_PROVIDER_AVATAR,
  PaginateDeletedProvidersData,
  PAGINATE_DELETED_PROVIDERS,
  SoftRemoveProviderData,
  SOFT_REMOVE_PROVIDER, RestoreProviderData, RESTORE_PROVIDER,
} from './provider.sdl';
import {
  SaveProviderInput,
  MutationSaveProviderArgs,
  Provider,
  PaginationInput,
  QueryPaginateProvidersArgs,
  ProviderPagination,
  ProviderCommandsInput,
  QueryProviderCommandsChartArgs,
  MutationRemoveProviderArgs,
  MutationUpdateProviderAvatarArgs,
  QueryPaginateDeletedProvidersArgs,
  MutationSoftRemoveProviderArgs, MutationRestoreProviderArgs,
} from '../types';
import { reactive, ref } from 'vue';
import { cloneDeep, removeDialog } from '../utils/utils';
import { addPaginationCache, deletePaginationCache, InitialPagination } from '../utils/pagination';
import { Serie } from '../command/command.service';
import { Loading } from 'quasar';
import { notify } from '../../shared/notification';

export const defaultProviderInput: SaveProviderInput = {
  id: 0,
  name: '',
  address: '',
  contacts: []
}

export const useSaveProvider = () => {
  const { mutate, onDone } = useMutation<
    SaveProviderData,
    MutationSaveProviderArgs
    >(CREATE_PROVIDER);
  onDone(() => {
    Loading.hide();
    notify('Enregistrement avec succès !');
  })
  const updateInput = reactive<SaveProviderInput>(defaultProviderInput);
  function setUpdateInput(provider: Provider) {
    const { id, name, address, contacts } = cloneDeep(provider);
    Object.assign(updateInput, { id, name, address, contacts });
  }
  function createProvider(input: SaveProviderInput){
    Loading.show({ message: 'Enregistrement du nouveau fournisseur ...' });
    void mutate({ input }, {
      update: (cache, { data }) => {
        if(data?.saveProvider) {
          cache.modify({
            fields: {
              paginateProviders(existing: any, {toReference}) {
                return addPaginationCache(data.saveProvider, existing, toReference);
              }
            }
          })
        }
      }
    })
  }
  function updateProvider(input: SaveProviderInput) {
    Loading.show({ message: 'Enregistrement de vos modifications ...' });
    if(input.id > 0) void mutate({ input })
  }

  return {
    createProvider,
    updateProvider,
    setUpdateInput,
    updateInput,
  }
}
export const usePaginateProviders = (limit = 5) => {
  const paginateInput = reactive<PaginationInput>({
    keyword: '',
    page: 1,
    limit
  });
  const { loading: ppLoading, result, refetch } = useQuery<
    PaginateProvidersData,
    QueryPaginateProvidersArgs
    >(PAGINATE_PROVIDERS, { input: cloneDeep(paginateInput) });
  const selectedProvider = ref<Provider[]>([]);
  function searchProvider() {
    void refetch({ input: paginateInput });
  }
  const providers = useResult<
    PaginateProvidersData|undefined,
    ProviderPagination,
    ProviderPagination
    >(result, InitialPagination, res => {
    if(res?.paginateProviders) {
      const id = selectedProvider.value[0]?.id;
      selectedProvider.value.length = 0;
      const find = res.paginateProviders.items.find(item => item.id === id)||res.paginateProviders.items[0];
      if(find)selectedProvider.value = [cloneDeep(find)];
      return res.paginateProviders;
    }
    return InitialPagination
  })
  return {
    searchProvider,
    ppLoading,
    providers,
    paginateInput,
    selectedProvider
  }
}
export const useProviderCommandsChart = (providerId: number) => {
  const  input = reactive<ProviderCommandsInput>({
    providerId,
    year: new Date().getFullYear()
  })
  const { loading: pccLoading, result } = useQuery<
    ProviderCommandsChartData,
    QueryProviderCommandsChartArgs
    >(PROVIDER_COMMANDS_CHART, { input });
  const chartSeries = useResult<
    ProviderCommandsChartData|undefined,
    Serie[],
    Serie[]
    >(result, [], pick => {
    const series: Serie[] = [
      {
        name: 'Commandes ',
        type: 'column',
        data: []
      },
      {
        name: 'Livraisons ',
        type: 'line',
        data: []
      }
    ];
    if(pick?.providerCommandsChart) {
      for (let i = 1; i <= 12; i++) {
        const pcChart = pick.providerCommandsChart.find(p => p.month === i);
        series[0].data.push(pcChart?.command||0);
        series[1].data.push(pcChart?.invoice||0);
      }
    }
    return series;
  });
  return {
    pccLoading,
    chartSeries,
    input
  }
}
export const useUpdateProviderAvatar = () => {
  const { mutate, onDone } = useMutation<
    UpdateProviderAvatarData,
    MutationUpdateProviderAvatarArgs
    >(UPDATE_PROVIDER_AVATAR, { context: {hasUpload: true}});
  onDone(() => {
    Loading.hide();
    notify('Mise à jour avec succès !');
  })
  function updateAvatar(file: File, id: number) {
    Loading.show({ message: 'Téléchargement ...'});
    void mutate({ avatar: file, id });
  }
  return { updateAvatar }
}

export const usePaginateDeletedProviders = () => {
  const input = reactive<PaginationInput>({
    page: 1,
    limit : 5
  });
  const { loading: ppLoading, result } = useQuery<
    PaginateDeletedProvidersData,
    QueryPaginateDeletedProvidersArgs
    >(PAGINATE_DELETED_PROVIDERS, { input });
  const providers = useResult(result, InitialPagination, pick => pick?.paginateDeletedProviders||InitialPagination)
  return {
    input,
    ppLoading,
    providers
  }
}
export const useSoftRemoveProvider = () => {
  const { onDone, mutate} = useMutation<
    SoftRemoveProviderData,
    MutationSoftRemoveProviderArgs
    >(SOFT_REMOVE_PROVIDER);
  onDone(() => {
    Loading.hide();
    notify('Suppression avec succès !');
  });
  function softRemoveProvider(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Suppression ...' });
      void mutate({ id }, {
        update(cache, { data }) {
          if(data?.softRemoveProvider) {
            cache.modify({
              fields: {
                paginateProviders(existingRef: any, { readField, toReference }) {
                  return deletePaginationCache(id, existingRef, readField, toReference);
                },
                paginateDeletedProviders(existingRef: any, { readField }) {
                  return addPaginationCache(data.softRemoveProvider, existingRef, readField);
                }
              }
            })
          }
        }
      })
    })
  }
  return { softRemoveProvider }
}
export const useRestoreProvider = () => {
  const { mutate, onDone } = useMutation<
    RestoreProviderData,
    MutationRestoreProviderArgs
    >(RESTORE_PROVIDER);
  onDone(({ data }) => {
    Loading.hide();
    notify(data?.restoreProvider ? 'Restauration avec succès !' : 'Echec de restauration');
  });
  function restore(id: number) {
    void mutate({ id }, {
      update: (cache, { data }) => {
        if(data?.restoreProvider) {
          cache.modify({
            fields: {
              paginateProviders(existing: any, {toReference}) {
                return addPaginationCache(data.restoreProvider, existing, toReference);
              },
              paginateDeletedProviders(existing: any, {readField, toReference}) {
                return deletePaginationCache(id, existing, readField,  toReference);
              }
            }
          })
        }
      }
    })
  }
  return { restore }
}
export const useRemoveProvider = () => {
  const { onDone, mutate} = useMutation<
    RemoveProviderData,
    MutationRemoveProviderArgs
    >(REMOVE_PROVIDER);
  onDone(() => {
    Loading.hide();
    notify('suppression avec succès !');
  });
  function remove(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Exécution de l\'opération ...' });
      void mutate({ id }, {
        update(cache, { data }) {
          if(data?.removeProvider) {
            cache.modify({
              fields: {
                paginateDeletedProviders(existingRef: any, { readField, toReference }) {
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
