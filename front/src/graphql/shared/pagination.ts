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

export const META_PARAMS = `
  meta {
    ${Object.keys(InitialPagination.meta).join(' ')}
  }
`
