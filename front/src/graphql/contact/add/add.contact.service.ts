import { reactive } from 'vue';
import { AddContactInput, MutationAddContactsArgs } from '../../types';
import { useMutation } from '@vue/apollo-composable';
import { ADD_CONTACT, AddContactData } from './add.contact.sdl';
import { notify } from '../../../shared/notification';

export const useAddContact = (providerId: number, contactTypeId: number) => {
  const { mutate, loading, onDone } = useMutation<AddContactData, MutationAddContactsArgs>(ADD_CONTACT);
  const input = reactive<AddContactInput>({
    providerId,
    contactTypeId,
    contacts: []
  });
  const addContact = () => {
    input.contacts.push('');
  }
  const removeContact = (cIndex: number) => {
    input.contacts.splice(cIndex, 1);
  }
  const submitAddContact = async() => {
    await mutate({ input })
  }
  onDone(res => {
    if(res.data?.addContacts) {
      notify(`Contacts crées : ${ input.contacts.join(',') }`);
      input.contacts = [];
    }
  })
  return { input, addContact, removeContact, submitAddContact, loading }
}
