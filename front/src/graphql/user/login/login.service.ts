import { useMutation } from '@vue/apollo-composable';
import { reactive } from 'vue';
import { LOGIN, LoginData } from './login.sdl';
import { AuthInput, MutationLoginArgs } from '../../types';
import {useSession} from './session';

export const useLogin = () => {

  const { login }  = useSession();
  const input = reactive<AuthInput>({
    username: '',
    password: ''
  });
  const { mutate, loading, onDone } = useMutation<LoginData, MutationLoginArgs>(LOGIN);
  onDone(  res => {
    if(res?.data?.login) void login(res.data.login.token);
  });
  function submitLogin() {
    void mutate({ input });
  }
  return {
    submitLogin,
    input,
    loading
  };
};
