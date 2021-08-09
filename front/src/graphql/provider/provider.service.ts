import {useMutation, useQuery, useResult} from '@vue/apollo-composable';
import {CREATE_PROVIDER, CreateProviderData, PROVIDERS, ProvidersData} from './provider.sdl';
import {reactive} from 'vue';
import {CreateProviderInput, MutationCreateProviderArgs, Provider} from '../types';

export const useProviders = () => {
  const { result, loading: providersLoading } = useQuery<ProvidersData>(PROVIDERS);
    return {
      providersLoading,
      providers: useResult(result, [], res => res?.providers)
    }
}

export const useCreateProvider = () => {
  const input = reactive<CreateProviderInput>({
    name: '',
    address: '',
    contacts: [0,1,2].map(type => ({ type, list: [] })),
  });
  const addContact = (index: number) => {
    input.contacts[index].list.push('');
  }
  const removeContact = (cIndex: number, lIndex: number) => {
    input.contacts[cIndex].list.splice(lIndex, 1);
  };
  const { mutate, loading: loadCreation } = useMutation<
    CreateProviderData,
    MutationCreateProviderArgs
    >(CREATE_PROVIDER, {
    update: (cache, { data }) => {
      if(data?.createProvider) {
        cache.modify({
          fields: {
            providers(existing: Provider[], {toReference}) {
              return [toReference(data.createProvider), ...existing]
            }
          }
        })
      }
    }
  });
  const submitCreation = () => {
    input.contacts = input.contacts.map(c => ({
      type: c.type,
      list: c.list.filter(l => l.trim() !== '')
    }))
    void mutate( { input } )
  }
  return { input, submitCreation, loadCreation, addContact, removeContact }
}
