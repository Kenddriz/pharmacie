import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { ArticlePaginationData, PAGINATE_ARTICLE, SAVE_ARTICLE, SaveArticleData } from './article.sdl';
import {
  Article,
  ArticlePagination,
  MutationSaveArticleArgs,
  PaginationInput,
  QueryPaginateArticlesArgs,
  SaveArticleInput,
} from '../types';
import { InitialPagination } from '../utils/pagination';
import { reactive, ref } from 'vue';
import { cloneDeep } from '../utils/utils';

export const useArticle = () => {
  const searchInput = reactive<PaginationInput>({
    limit: 20,
    keyword: '',
    page: 1
  });
  const {result, loading: listLoading, refetch} = useQuery<
    ArticlePaginationData,
    QueryPaginateArticlesArgs
    >(PAGINATE_ARTICLE, { input: cloneDeep(searchInput) });
  const selected = ref<Article[]>([]);
  const articles = useResult(result, InitialPagination, res => {
    const data = res?.paginateArticles||InitialPagination;
    selected.value = data.items.slice(0, 1);
    return data;
  });
  return {
    listLoading,
    searchInput,
    articles,
    selected,
    submitSearch: function() {
      void refetch({ input: searchInput });
    }
  }
}

export const useSaveArticle = () => {
  const { mutate, loading: saveLoading} = useMutation<SaveArticleData, MutationSaveArticleArgs>(SAVE_ARTICLE);
  const saveInput = reactive<SaveArticleInput>({
    id: 0,
    dci: '',
    commercialName: ''
  });
  const articleDialog = ref<boolean>(false);
  function setSaveInput(article: Article) {
    const { id, dci, commercialName } = article;
    Object.assign(saveInput, { id, dci, commercialName });
    articleDialog.value = true
  }
  function addArticle(input: SaveArticleInput) {
    void mutate({ input }, {
      update(cache, { data }){
        if(data) {
          cache.modify({
            fields: {
              paginateArticles(existing: ArticlePagination, {toReference}) {
                return {
                  meta: existing.meta,
                  items: [...existing.items, toReference(data.saveArticle)],
                  __typename: existing.__typename
                }
              }
            }
          })
        }
      }
    });
  }
  function updateArticle(input: SaveArticleInput) {
    void mutate({ input });
  }
  return {
    saveLoading,
    addArticle,
    saveInput,
    articleDialog,
    setSaveInput,
    updateArticle
  }
}
