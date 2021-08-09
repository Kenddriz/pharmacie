import { useMutation } from '@vue/apollo-composable';
import { reactive } from 'vue';
import { LOGIN, LoginData } from './login.sdl';
import { AuthInput, MutationLoginArgs } from '../../types';
import {userDetails} from '../user';
import {useSession} from './session';
import {cloneDeep} from '@apollo/client/utilities';

export const useLogin = () => {

  const { login }  = useSession();
  const input = reactive<AuthInput>(cloneDeep(userDetails));
  const { mutate, loading, onDone } = useMutation<LoginData, MutationLoginArgs>(LOGIN);
  onDone(  res => {
    if(res?.data?.login) void login(res.data.login.token);
  })
  return {
    submitLogin: () => void mutate({ input }),
    input,
    loading
  };
};
