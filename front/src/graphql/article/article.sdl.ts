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
  createdAt
`;

export const PAGINATE_ARTICLE = (withBatches: boolean) => gql`
  query PaginateArticles($input:PaginateArticleInput!){
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

export type PaginateDeletedArticlesData = {
  paginateDeletedArticles: ArticlePagination;
}
export const PAGINATE_DELETED_ARTICLES = gql`
  query PaginateDeletedArticles($input: PaginationInput!){
    paginateDeletedArticles(input: $input) {
      items{${ARTICLE_PARAMS} archivedAt}
      ${PAGINATION_META}
    }
  }
`;
export type SoftRemoveArticleData = {
  softRemoveArticle: Article;
}
export const SOFT_REMOVE_ARTICLE = gql`
  mutation SoftRemoveArticle($id: Int!){
    softRemoveArticle(id: $id) {
      ${ARTICLE_PARAMS} archivedAt
    }
  }
`;
export type RestoreArticleData = {
  restoreArticle: Article;
}
export const RESTORE_ARTICLE = gql`
  mutation RestoreArticle($id: Int!) {
    restoreArticle(id: $id){
      ${ARTICLE_PARAMS}
      medicines{
        ${MEDICINE_PARAMS}
      }
    }
  }
`;
export type RemoveArticleData = {
  removeArticle: boolean;
}
export const REMOVE_ARTICLE = gql`
  mutation RemoveArticle($id: Int!) {
    removeArticle(id: $id)
  }
`;
