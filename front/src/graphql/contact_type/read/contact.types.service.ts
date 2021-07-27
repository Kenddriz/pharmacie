import {CONTACT_TYPES_QUERY, ContactTypesData} from './contact.types.sdl';
import {useQuery, useResult} from '@vue/apollo-composable';
import { Contact, ContactType } from '../../types';

export const useContactTypes = () => {
  const { result, loading:cTypesLoading } = useQuery<ContactTypesData>(CONTACT_TYPES_QUERY);
  const contactTypes = useResult(result, [], res => res.contactTypes);
  const contacts = (contacts: Contact[]) => {
    return contactTypes.value.map((cType: ContactType) => {
      return {
        ...cType,
        contacts: contacts.filter(c => c.contactTypeId === cType.id)
      }
    })
  };
  return {
    cTypesLoading,
    contactTypes,
    contacts
  }
}
