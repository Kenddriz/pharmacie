import {CONTACT_TYPES_QUERY, ContactTypesData} from './contact.types.sdl';
import {useQuery, useResult} from '@vue/apollo-composable';

export const useContactTypes = () => {
  const { result, loading } = useQuery<ContactTypesData>(CONTACT_TYPES_QUERY);
  const contactTypes = useResult(result, [], res => res.contactTypes);
  return {
    loading,
    contactTypes
  }
}
