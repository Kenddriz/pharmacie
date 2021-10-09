import {
  UPDATE_AVATAR,
  UPDATE_PASSWORD,
  UPDATE_USER,
  UpdateAvatarData,
  UpdatePasswordData,
  UpdateUserData,
} from './user.sdl';
import { useMutation } from '@vue/apollo-composable';
import {
  MutationUpdatePasswordArgs,
  MutationUpdateUserArgs,
  MutationUpdateUserAvatarArgs,
  UpdatePasswordInput,
  UpdateUserInput,
} from '../types';
import { reactive } from 'vue';
import { notify } from '../../shared/notification';
import { Loading } from 'quasar';


export const useUpdateUser = () => {
  const { loading, mutate, onDone } = useMutation<UpdateUserData, MutationUpdateUserArgs>(UPDATE_USER);
  const input = reactive<UpdateUserInput>({ username: '' });
  onDone(() => {
    notify('Mise à jour avec succès !');
  });
  function updateUser() {
    void mutate({ input });
  }
  return { loading, input, updateUser }
}

export const useUpdatePassword = () => {
  const { loading, mutate, onDone } = useMutation<UpdatePasswordData, MutationUpdatePasswordArgs>(UPDATE_PASSWORD);
  onDone(({ data }) => {
    notify(data?.updatePassword ? 'Mise à jour avec succès !' : 'Mot de passe actuel erroné !');
  });
  const input = reactive<UpdatePasswordInput>({
    currentPassword: '',
    newPassword: ''
  });
  function updatePassword() {
    void mutate({ input });
  }
  return { loading, input, updatePassword }
}
export const useUpdateUserAvatar = () => {
  const { mutate, onDone } = useMutation<
    UpdateAvatarData,
    MutationUpdateUserAvatarArgs
    >(UPDATE_AVATAR, { context: {hasUpload: true}});
  onDone(() => {
    Loading.hide();
    notify('Mise à jour avec succès !');
  })
  function updateAvatar(file: File) {
    Loading.show({ message: 'Téléchargement ...'});
    void mutate({ avatar: file });
  }
  return { updateAvatar }
}
