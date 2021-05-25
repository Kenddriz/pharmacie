import { ref, reactive } from 'vue';
import {ContactType, MutationCreateProviderArgs} from '../../types';
import {useMutation, useQuery} from '@vue/apollo-composable';
import {CONTACT_TYPES_QUERY, ContactTypesData} from '../../contact_type/read/contact.types.sdl';
import { CreateProviderData, CREATE_PROVIDER } from './create.provider.sdl';
import {ajoutProviderCache} from '../updateProviderCache';

type CreateProviderForm = Omit<ContactType, 'contacts'|'__typename'> & {
  contacts: string[];
}
export const useCreateProviderService = () => {
  const { onResult, loading } = useQuery<ContactTypesData>(CONTACT_TYPES_QUERY);
  const input = ref<CreateProviderForm[]>([]);
  onResult(res => {
    if(res.data) {
      input.value = res.data.contactTypes.map(t => {
        return {
          ...t,
          contacts: []
        }
      });
    }
  });
  const details = reactive({ name: '' });
  const addContact = (index: number) => {
    input.value[index].contacts.push('');
  }
  const removeContact = (cTypeIndex: number, cIndex: number) => {
    input.value[cTypeIndex].contacts.splice(cIndex, 1);
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
    await mutate({
      input: {
        name: details.name,
        contactTypes: input.value.map(c => {
          return {
            contactTypeId: c.id,
            contacts: c.contacts.filter(c => c.trim().length !== 0)
          }
        })
      }
    })
  }
  return { input, addContact, removeContact, loading, submitCreateProvider, details }
}
