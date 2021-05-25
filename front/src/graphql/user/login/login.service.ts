import { useMutation } from '@vue/apollo-composable';
import { reactive } from 'vue';
import { LOGIN, LoginData } from './login.sdl';
import { AuthInput, MutationLoginArgs } from '../../types';
import {cloneDeep} from 'lodash';
import {userDetails} from '../user';
import {useSession} from './session';

export const useLogin = () => {

  const { login }  = useSession();
  const input = reactive<AuthInput>(cloneDeep(userDetails));
  const { mutate, loading } = useMutation<LoginData, MutationLoginArgs>(LOGIN);

  const submitLogin = async () => {

    const { data } = await mutate({ input });
    if (data?.login)
      await login(data.login.token);
  };
  return { submitLogin, input, loading };
};
