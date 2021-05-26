import  { reactive } from 'vue';
import { Contact, MutationUpdateContactArgs, UpdateContactInput } from '../../types';
import { useMutation } from '@vue/apollo-composable';
import { UPDATE_CONTACT, UpdateContactData } from './update.contact.sdl';
import { notify } from '../../../shared/notification';
export const useUpdateContact = (contact: Contact) => {
  const { id, label } = contact;
  const input = reactive<UpdateContactInput>({ id, label });
  const { mutate, loading, onDone } = useMutation<UpdateContactData, MutationUpdateContactArgs>(UPDATE_CONTACT);
  onDone(res => {
    if(res.data) {
      notify(`Contact N°:${ input.id } -> ${res.data.updateContact.label}`);
      input.label = res.data.updateContact.label;
    }
  })
  const submitUpdateContact = async () => {
    await mutate({ input });
  }
  return { input, submitUpdateContact, loading }
}
