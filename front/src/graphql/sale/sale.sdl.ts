import { Sale, SalePagination, Count2LatestWeekSales } from '../types';
import { STOCK_MVT_DTO } from '../invoice/incoice.sdl';
import { gql } from '@apollo/client/core';
import { PAGINATION_META } from '../utils/pagination';
import { PRESCRIPTION_FIELDS } from '../prescription/prescription.sdl';

export const SALE_FIELDS = `
  id
  createdAt
  prescription{${PRESCRIPTION_FIELDS}}
`;
export type CreateSaleData = {
  createSale: Sale
}
export const CREATE_SALE = gql`
  mutation CreateSale($input: CreateSaleInput!) {
    createSale(input: $input) {
      ${SALE_FIELDS}
      ${STOCK_MVT_DTO(false)}
    }
  }
`;
export type PaginateSalesData = {
  paginateSales: SalePagination
}
export const PAGINATE_SALE = gql`
    query PaginateSales($paginationInput: PaginationInput!) {
      paginateSales(paginationInput:$paginationInput) {
        items{
          ${SALE_FIELDS}
          ${STOCK_MVT_DTO(false)}
        }
        ${PAGINATION_META}
      }
    }
`;
export type Count2LatestWeekSalesData = {
  count2LatestWeekSales: Count2LatestWeekSales
}
export const COUNT_2LATEST_WEEK_SALES = gql`
    query Count2LatestWeekSales {
      count2LatestWeekSales {
        current { day count }
        last { day count }
      }
    }
`;

export type PaginateDeletedSalesData = {
  paginateDeletedSales: SalePagination;
}
export const PAGINATE_DELETED_SALES = gql`
  query PaginateDeletedSales($input: PaginationInput!){
    paginateDeletedSales(input: $input) {
      items{ id createdAt archivedAt}
      ${PAGINATION_META}
    }
  }
`;
export type SoftRemoveSaleData = {
  softRemoveSale: Sale;
}
export const SOFT_REMOVE_SALE = gql`
  mutation SoftRemoveSale($id: Int!){
    softRemoveSale(id: $id) {
      id createdAt archivedAt
    }
  }
`;
export type RestoreSaleData = {
  restoreSale: Sale;
}
export const RESTORE_SALE = gql`
  mutation RestoreSale($id: Int!) {
    restoreSale(id: $id){
      ${SALE_FIELDS}
      ${STOCK_MVT_DTO(false)}
    }
  }
`;
export type RemoveSaleData = {
  removeSale: boolean;
}
export const REMOVE_SALE = gql`
  mutation RemoveSale($id: Int!) {
    removeSale(id: $id)
  }
`;
