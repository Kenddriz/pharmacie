import { reactive, ref } from 'vue';
import { CreateProviderInput, MutationCreateProviderArgs } from '../../types';
import {useMutation, useQuery} from '@vue/apollo-composable';
import {CONTACT_TYPES_QUERY, ContactTypesData} from '../../contact_type/read/contact.types.sdl';
import { CreateProviderData, CREATE_PROVIDER } from './create.provider.sdl';
import {ajoutProviderCache} from '../updateProviderCache';

export const useCreateProviderService = () => {
  const { onResult, loading } = useQuery<ContactTypesData>(CONTACT_TYPES_QUERY);
  const input = reactive<CreateProviderInput>({
    name: '',
    address: '',
    contactTypes: [],
  });
  const contactTypes = ref<string[]>([]);
  onResult(res => {
    if(res.data) {
      contactTypes.value = [];
      input.contactTypes = res.data.contactTypes.map(t => {
        contactTypes.value.push(t.label);
        return {
          contactTypeId: t.id,
          contacts: []
        }
      });
    }
  });
  const addContact = (index: number) => {
    input.contactTypes[index].contacts.push('');
  }
  const removeContact = (cTypeIndex: number, cIndex: number) => {
    input.contactTypes[cTypeIndex].contacts.splice(cIndex, 1);
  }

  const { mutate } = useMutation<
    CreateProviderData,
    MutationCreateProviderArgs
    >(CREATE_PROVIDER, {
      update: (cache, { data }) => {
        if(data?.createProvider) ajoutProviderCache(cache, data.createProvider)
      }
  })
  const submitCreateProvider = async () => {
    await mutate( { input } )
  }
  return { input, addContact, removeContact, loading, submitCreateProvider, contactTypes }
}
