import { Article, ArticlePagination } from '../types';
import { gql } from '@apollo/client/core';
import { MEDICINE_FIELDS, MEDICINE_PARAMS } from '../medicine/medicine.sdl';
import { PAGINATION_META } from '../utils/pagination';
import { BATCH_FIELDS } from '../batch/batch.sdl';


export type ArticlePaginationData = {
  paginateArticles: ArticlePagination
}

export const ARTICLE_PARAMS = `
  id
  dci
  commercialName
`;

export const PAGINATE_ARTICLE = (withBatches: boolean) => gql`
  query PaginateArticles($input:PaginationInput!){
      paginateArticles(input:$input){
         items {
            ${ARTICLE_PARAMS}
            medicines{
              ${MEDICINE_PARAMS}
              ${withBatches ? `batches{${BATCH_FIELDS}}` : ''}
            }
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
export type FindOneArticleData = {
  findOneArticle: Article;
}

export const FIND_ONE_ARTICLE = gql`
    query findOneArticle($keyword: String!) {
      findOneArticle(keyword: $keyword) {
        ${ARTICLE_PARAMS}
        medicines{${MEDICINE_FIELDS}}
      }
    }
`;

export const FIND_ARTICLE_SALE = gql`
  query findOneArticle($keyword: String!) {
    findOneArticle(keyword: $keyword) {
      ${ARTICLE_PARAMS}
      medicines{
        ${MEDICINE_PARAMS}
        batches{${BATCH_FIELDS}}
      }
    }
  }
`;

export type DeleteForeverArticleData = {
  deleteForeverArticle: boolean;
}
export const DELETE_FOREVER_ARTICLE = gql`
  mutation DeleteForeverArticle($id: Int!) {
    deleteForeverArticle(id: $id)
  }
`;
