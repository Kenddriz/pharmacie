import { useLazyQuery, useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  CREATE_PROVIDER,
  SaveProviderData,
  PaginateProvidersData,
  PAGINATE_PROVIDERS,
  ProviderCommandsData,
  PROVIDER_COMMANDS,
  ProviderCommandsChartData,
  PROVIDER_COMMANDS_CHART,
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
  Command,
} from '../types';
import { reactive, ref } from 'vue';
import { cloneDeep } from '../utils/utils';
import { InitialPagination } from '../utils/pagination';
import { Serie } from '../command/command.service';

export const defaultProviderInput: SaveProviderInput = {
  id: 0,
  name: '',
  address: '',
  contacts: []
}

export const useSaveProvider = () => {
  const { mutate, loading: loadSave } = useMutation<
    SaveProviderData,
    MutationSaveProviderArgs
    >(CREATE_PROVIDER);
  const show = ref<boolean>(false);
  const updateInput = reactive<SaveProviderInput>(defaultProviderInput);
  function setUpdateInput(provider: Provider) {
    const { id, name, address, contacts } = cloneDeep(provider);
    Object.assign(updateInput, { id, name, address, contacts });
    show.value = true;
  }
  function filterInput(input: SaveProviderInput) {
    input.contacts = input.contacts.map(c => ({
      type: c.type,
      list: c.list.filter(l => l.trim() !== '')
    }));
    return input;
  }
  function createProvider(input: SaveProviderInput){
    void mutate({ input: filterInput(input) }, {
      update: (cache, { data }) => {
        if(data?.saveProvider) {
          cache.modify({
            fields: {
              providers(existing: Provider[], {toReference}) {
                return [toReference(data.saveProvider), ...existing]
              }
            }
          })
        }
      }
    })
  }
  function updateProvider(input: SaveProviderInput) {
    if(input.id > 0) void mutate({ input: filterInput(input) })
  }

  return {
    createProvider,
    updateProvider,
    setUpdateInput,
    show,
    updateInput,
    loadSave,
  }
}

export const usePaginateProviders = () => {
  const paginateInput = reactive<PaginationInput>({
    keyword: '',
    page: 1,
    limit: 5
  });
  const { loading: ppLoading, result, refetch } = useQuery<
    PaginateProvidersData,
    QueryPaginateProvidersArgs
    >(PAGINATE_PROVIDERS, { input: cloneDeep(paginateInput) });
  function searchProvider() {
    void refetch({ input: paginateInput });
  }
  const providers = useResult<
    PaginateProvidersData|undefined,
    ProviderPagination,
    ProviderPagination
    >(result, InitialPagination, res => {
      if(res?.paginateProviders) {
        return res.paginateProviders;
      }
      return InitialPagination;
  })
  return {
    searchProvider,
    ppLoading,
    providers,
    paginateInput
  }
}

export const useProviderCommands = () => {
  const selectedCmd = ref<Command[]>([]);
  const pcInput = reactive<Omit<ProviderCommandsInput, 'providerId'>>({
    limit: 1,
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
