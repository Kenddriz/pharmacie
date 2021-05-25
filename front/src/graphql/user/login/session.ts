import { useRouter } from 'vue-router';

export const useSession = () => {

  const route = useRouter();

  const login = async (token: string) => {
    localStorage.setItem('token', token);
    await route.push('/main');
  }
  const logout = async () => {
    localStorage.clear();
    await route.push('/');
  }
  return { login, logout };
}
