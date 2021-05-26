import { CONTACT } from '../contact/contact';

export const PROVIDER = `
  id
  name
  logo
  contacts {
    ${CONTACT}
  }
  createdAt
  updatedAt
`
