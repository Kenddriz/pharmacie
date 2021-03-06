import { useLazyQuery, useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  CREATE_PROVIDER,
  SaveProviderData,
  PaginateProvidersData,
  PAGINATE_PROVIDERS,
  ProviderCommandsData,
  PROVIDER_COMMANDS,
  ProviderCommandsChartData,
  PROVIDER_COMMANDS_CHART, RemoveProviderData, REMOVE_PROVIDER, UpdateProviderAvatarData, UPDATE_PROVIDER_AVATAR,
} from './provider.sdl';
import {
  SaveProviderInput,
  MutationSaveProviderArgs,
  Provider,
  PaginationInput,
  QueryPaginateProvidersArgs,
  ProviderPagination,
  ProviderCommandsInput,
  QueryProviderCommandsArgs,
  CommandPagination,
  QueryProviderCommandsChartArgs,
  ProviderCommandsChartInput,
  Command, MutationRemoveProviderArgs,
  MutationUpdateProviderAvatarArgs
} from '../types';
import { reactive, ref } from 'vue';
import { cloneDeep, removeDialog } from '../utils/utils';
import { deletePaginationCache, InitialPagination } from '../utils/pagination';
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
                return {
                  ...existing,
                  items: [...existing.items, toReference(data.saveProvider)]
                }
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
export const useProviderCommands = (limit = 1) => {
  const selectedCmd = ref<Command[]>([]);
  const pcInput = reactive<Omit<ProviderCommandsInput, 'providerId'>>({
    limit,
    year: new Date().getFullYear(),
    page: 1
  });
  const { loading: pcLoading, result, load } = useLazyQuery<
    ProviderCommandsData,
    QueryProviderCommandsArgs
    >(PROVIDER_COMMANDS);
  function getCommands(providerId: number) {
    void load(PROVIDER_COMMANDS, { input: { ...pcInput, providerId } }, { fetchPolicy: 'network-only' })
  }
  const providerCommands = useResult<
    ProviderCommandsData|undefined,
    CommandPagination,
    CommandPagination
    >(result, InitialPagination, pick => {
    if(pick?.providerCommands) {
      const find = pick.providerCommands.items.find(c => c.id === selectedCmd.value[0]?.id)||pick.providerCommands.items[0];
      if(find){
        if(selectedCmd.value.length)Object.assign(selectedCmd.value[0], {...find});
        else selectedCmd.value.push({...find });
      }
      return pick.providerCommands;
    }
    selectedCmd.value.length = 0;
    return InitialPagination;
  });
  return {
    pcLoading,
    getCommands,
    providerCommands,
    pcInput,
    selectedCmd
  }
}
export const useProviderCommandsChart = () => {
  const { loading: pccLoading, load, result } = useLazyQuery<
    ProviderCommandsChartData,
    QueryProviderCommandsChartArgs
    >(PROVIDER_COMMANDS_CHART);
  function loadChart(input: ProviderCommandsChartInput) {
    void load(PROVIDER_COMMANDS_CHART,{ input }, { fetchPolicy: 'network-only' })
  }
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
    loadChart,
    chartSeries
  }
}
export const useRemoveProviders = () => {
  const { onDone, mutate} = useMutation<
    RemoveProviderData,
    MutationRemoveProviderArgs
    >(REMOVE_PROVIDER);
  onDone(() => {
    Loading.hide();
    notify('suppression avec succès !');
  });
  function removeProvider(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Exécution de l\'opération ...' });
      void mutate({ id }, {
        update(cache, { data }) {
          if(data?.removeProvider) {
            cache.modify({
              fields: {
                paginateProviders(existingRef: any, { readField, toReference }) {
                  return deletePaginationCache(id, existingRef, readField, toReference);
                }
              }
            })
          }
        }
      })
    }, 'removeForever')
  }
  return { removeProvider }
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
