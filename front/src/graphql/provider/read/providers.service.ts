import {useQuery, useResult} from '@vue/apollo-composable';
import {PROVIDERS, ProvidersData} from './providers.sdl';

export const useProviders = () => {
  const { result, loading: providersLoading } = useQuery<ProvidersData>(PROVIDERS);
    return {
      providersLoading,
      providers: useResult(result, [], res => res.providers)
    }
}
