import { useRouter } from 'vue-router';

export const useSession = () => {

  const route = useRouter();

  const login = (token: string) => {
    localStorage.setItem('token', token);
    void route.push('/dashboard');
  }
  const logout = () => {
    void route.push('/');
  }
  return { login, logout };
}
