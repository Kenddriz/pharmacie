import { Meta } from '../types';
import { cloneDeep } from '../utils/utils';

export const updateSaleCache = (id: number, existingRef: any, readField: any, toReference: any ) => {
  const meta: Meta = cloneDeep(existingRef.meta);
  meta.totalItems -= 1; meta.itemCount -= 1;
  return {
    ...existingRef,
    meta: toReference(meta),
    items: existingRef.items.filter((eRef: any) => readField('id', eRef) !== id)
  }
}
