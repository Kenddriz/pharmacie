import { Meta } from '../types';

export const InitialPagination = {
  items: [],
  meta: {
    itemCount: 0,
    totalItems: 0,
    itemsPerPage: 0,
    totalPages: 0,
    currentPage: 0
  }
};

export const PAGINATION_META = `
  meta {
    ${Object.keys(InitialPagination.meta).join(' ')}
  }
`;
export const deletePaginationCache = (id: number|string, existingRef: any, readField: any, toReference: any) => {
  const meta: Meta = { ... existingRef.meta };
  meta.totalItems -= 1; meta.itemCount -= 1;
  return {
    ...existingRef,
    meta: toReference(meta),
    items: existingRef.items.filter((eRef: any) => readField('id', eRef) !== id)
  }
}

export const addPaginationCache = (data: any, existingRef: any, toReference: any) => {
  const meta: Meta = { ...existingRef.meta };
  meta.totalItems += 1; meta.itemCount += 1;
  return {
    ...existingRef,
    meta: toReference(meta),
    items: [toReference(data), ...existingRef.items]
  }
}

export const emptyPaginationCache = (existingRef: any, toReference: any) => {
  return {
    ...existingRef,
    meta: toReference({...InitialPagination.meta}),
    items: []
  }
}
