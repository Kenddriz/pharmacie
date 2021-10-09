import { User } from '../types';
import { gql } from '@apollo/client/core';

export const USER_FIELDS = `
  id
  username
  avatar
  password
  createdAt
  updatedAt
`;

export type UpdateUserData = {
  updateUser: User;
}
export const UPDATE_USER = gql`
    mutation UpdateUser($input: UpdateUserInput!){
      updateUser(input: $input){
        ${USER_FIELDS}
      }
    }
`;
export type UpdatePasswordData = {
  updatePassword: User;
}
export const UPDATE_PASSWORD = gql`
    mutation UpdatePassword($input: UpdatePasswordInput!){
      updatePassword(input: $input) {
        updatedAt
      }
    }
`;
export type AvatarModel = {
  avatar: any[],
  url: string[]
}
export type UpdateAvatarData = {
  updateUserAvatar: User
}
export const UPDATE_AVATAR = gql`
  mutation UpdateUserAvatar($avatar: Upload!) {
    updateUserAvatar(avatar: $avatar){
      id
      updatedAt
      avatar
    }
  }
`;
