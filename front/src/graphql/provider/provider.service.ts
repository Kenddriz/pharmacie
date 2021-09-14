import {useMutation, useQuery, useResult} from '@vue/apollo-composable';
import {
  CREATE_PROVIDER,
  SaveProviderData,
  PROVIDERS,
  ProvidersData,
  PaginateProvidersData,
  PAGINATE_PROVIDERS,
} from './provider.sdl';
import {
  SaveProviderInput,
  MutationSaveProviderArgs,
  Provider,
  PaginationInput, QueryPaginateProvidersArgs, ProviderPagination,
} from '../types';
import { reactive, ref } from 'vue';
import { cloneDeep } from '../utils/utils';
import { InitialPagination } from '../utils/pagination';

export const defaultProviderInput: SaveProviderInput = {
  id: 0,
  name: '',
  address: '',
  contacts: []
}
export const useProviders = () => {
  const { result, loading: providersLoading } = useQuery<ProvidersData>(PROVIDERS);
    return {
      providersLoading,
      providers: useResult(result, [], res => res?.providers)
    }
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
    >(result, InitialPagination, res => res?.paginateProviders||InitialPagination)
  return {
    searchProvider,
    ppLoading,
    providers,
    paginateInput
  }
}
