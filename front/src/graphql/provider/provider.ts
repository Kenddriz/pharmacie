import { CONTACT } from '../contact/contact';
import {CONTACT_TYPES} from '../contact_type/contact.type';

export const PROVIDER = `
  id
  name
  logo
  contactTypes {
    ${CONTACT_TYPES}
    contacts {
      ${CONTACT}
    }
  }
  createdAt
  updatedAt
`
