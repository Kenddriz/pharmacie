import {User} from '../types';

export const userDetails = {
  username: '',
  password: '',
}
export const defaultUser: Omit<User, 'password'> = {
  id: 0,
  ...userDetails,
  avatar: '',
  createdAt: '',
  updatedAt: ''
}

export const USER = Object.keys(defaultUser).join(' ');
