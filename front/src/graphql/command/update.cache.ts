import { Meta } from '../types';
/**Modify only meta, and it will fetch data from network to update cache**/
export const addProviderCommandsCache = (existingRef: any, toReference: any) => {
  const meta: Meta = { ...existingRef.meta };
  meta.totalItems += 1;
  meta.totalPages += 1;
  return {
    ...existingRef,
    meta: toReference(meta)
  }
}

export const removeProviderCommandsCache = (existingRef: any, toReference: any) => {
  const meta: Meta = { ...existingRef.meta };
  meta.totalItems -= 1;
  meta.totalPages -= 1;
  return {
    ...existingRef,
    meta: toReference(meta)
  }
}
