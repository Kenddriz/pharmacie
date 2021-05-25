import {ApolloCache} from '@apollo/client';
import {Provider} from '../types';
import { cloneDeep } from 'lodash';
import {CreateProviderData} from './create/create.provider.sdl';
import {PROVIDERS, ProvidersData} from './read/providers.sdl';

export const ajoutProviderCache = (cache: ApolloCache<CreateProviderData>, provider: Provider) => {
  let providersCache = cache.readQuery<ProvidersData>({
    query: PROVIDERS
  });
  if(providersCache?.providers) {
    providersCache = cloneDeep(providersCache);
    providersCache.providers.unshift(provider);
    cache.writeQuery<ProvidersData>({
      query: PROVIDERS,
      data: providersCache
    })
  }
}

/*export const deleteProviderFromCache = (cache: ApolloCache<DeleteProviderData>, id: number|undefined) => {
  const providersCache = cloneDeep(cache.readQuery<ProvidersData>({
    query: UNITS_QUERY
  }));
  if(providersCache?.providers) {
    providersCache.providers = providersCache.providers.filter(cat => cat.id !== id);
    cache.writeQuery<ProvidersData>({
      query: UNITS_QUERY,
      data: providersCache
    })
  }
}*/
