import { Article, ArticlePagination } from '../types';
import { gql } from '@apollo/client/core';
import { MEDICINE_PARAMS } from '../medicine/medicine.sdl';
import { PAGINATION_META } from '../utils/pagination';


export type ArticlePaginationData = {
  paginateArticles: ArticlePagination
}

export const ARTICLE_PARAMS = `
  id
  dci
  commercialName
`;

export const PAGINATE_ARTICLE = gql`
  query PaginateArticles($input:PaginationInput!){
      paginateArticles(input:$input){
         items {
            ${ARTICLE_PARAMS}
            medicines{${MEDICINE_PARAMS}}
         }
         ${PAGINATION_META}
      }
  }
`;

export type SaveArticleData = {
  saveArticle: Article
}

export const SAVE_ARTICLE = gql`
  mutation SaveArticle($input: SaveArticleInput!) {
    saveArticle(input:$input){
      ${ARTICLE_PARAMS}
      medicines{${MEDICINE_PARAMS}}
    }
  }
`;