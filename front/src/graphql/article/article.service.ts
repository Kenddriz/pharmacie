import { useLazyQuery, useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  ArticlePaginationData, DELETE_FOREVER_ARTICLE, DeleteForeverArticleData, FIND_ARTICLE_SALE,
  FIND_ONE_ARTICLE, FindOneArticleData,
  PAGINATE_ARTICLE,
  SAVE_ARTICLE,
  SaveArticleData,
} from './article.sdl';
import {
  Article, MutationDeleteForeverArticleArgs,
  MutationSaveArticleArgs, Packaging,
  PaginationInput, QueryFindOneArticleArgs,
  QueryPaginateArticlesArgs,
  SaveArticleInput,
} from '../types';
import { addPaginationCache, deletePaginationCache, InitialPagination } from '../utils/pagination';
import { reactive, ref } from 'vue';
import { cloneDeep, removeDialog } from '../utils/utils';
import { Loading } from 'quasar';
import { notify } from '../../shared/notification';

const lim = Math.ceil((screen.height - 150)/50);

export const usePaginateArticle = (limit = lim, withBatches = true) => {
  const searchInput = reactive<PaginationInput>({
    limit,
    keyword: '',
    page: 1
  });
  const {result, loading: listLoading, refetch, onResult } = useQuery<
    ArticlePaginationData,
    QueryPaginateArticlesArgs
    >(PAGINATE_ARTICLE(withBatches), { input: cloneDeep(searchInput) });
  const selected = ref<Article[]>([]);
  const articles = useResult(result, InitialPagination, res => {
    if(res?.paginateArticles) {
      const id = selected.value[0]?.id;
      selected.value.length = 0;
      const find = res.paginateArticles.items.find(item => item.id === id)||res.paginateArticles.items[0];
      if(find)selected.value = [cloneDeep(find)];
      return res.paginateArticles;
    }
    return InitialPagination
  });
  onResult(() => listLoading.value = false);
  function submitSearch() {
    listLoading.value = true;
    void refetch({ input: searchInput });
  }
  return {
    listLoading,
    searchInput,
    articles,
    selected,
    submitSearch
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
              paginateArticles(existing: any, {toReference}) {
                return addPaginationCache(data.saveArticle, existing, toReference);
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
/**Find One Article*/
export class FindOneArticleOption {
  value = 0; label = '';
  packaging: Packaging = { id: 0, units: [], archivedAt: ''}
}
export const useFindOneArticleForCommand = (defaultOption: FindOneArticleOption) => {
  const model = reactive<FindOneArticleOption>(defaultOption);
  const selectOptions = ref<Array<FindOneArticleOption>>([]);
  const options = ref<Array<FindOneArticleOption>>([]);
  if(defaultOption.value > 0) {
    selectOptions.value = [defaultOption];
    options.value = [defaultOption];
  }

  const { loading: faLoading, onResult, load } = useLazyQuery<
    FindOneArticleData,
    QueryFindOneArticleArgs
    >(FIND_ONE_ARTICLE);
  onResult(({ data }) => {
    const medn = data.findOneArticle?.medicines;
    if(medn) {
      selectOptions.value = medn.map(med => ({
        value: med.id,
        label: `${data.findOneArticle.commercialName} ${med.dosage.label}, ${med.form.label}`,
        packaging: med.packaging
      }));
      options.value = cloneDeep(selectOptions.value);
    } else {
      selectOptions.value.length = 0;
      options.value.length = 0;
      Object.assign(model, new FindOneArticleOption());
    }
  });
  function filterFn (val: string, update: any) {
    update(() => {
      const needle = val.toLocaleLowerCase().trim()
      const newOptions = selectOptions.value.filter(v => v.label.toLocaleLowerCase().indexOf(needle) > -1);
      if(!newOptions.length && needle) {
        void load(FIND_ONE_ARTICLE,{ keyword: needle }, { fetchPolicy: 'no-cache' });
      }
      else options.value = newOptions;
    })
  }
  return {
    filterFn,
    faLoading,
    options,
    model
  }
}
export const useFindOneArticle = () => {
  const keyword = ref<string>('');
  const { loading: faLoading, result, load } = useLazyQuery<
    FindOneArticleData,
    QueryFindOneArticleArgs
    >(FIND_ARTICLE_SALE);
  function findArticle() {
    if(keyword.value) void load(FIND_ARTICLE_SALE,{keyword: keyword.value });
  }
  const article = useResult(result, null, pick => pick?.findOneArticle);
  return {
    faLoading,
    findArticle,
    article,
    keyword
  }
}
 export const useDeleteForeverArticle = () => {
  const { mutate, onDone } = useMutation<
    DeleteForeverArticleData,
    MutationDeleteForeverArticleArgs
    >(DELETE_FOREVER_ARTICLE);
  onDone(() => {
    Loading.hide();
    notify('Suppression avec succès !');
  });
  function deleteForeverArticle(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Suppression ...' });
      void mutate({ id }, {
        update(cache, { data }){
          if(data?.deleteForeverArticle) {
            cache.modify({
              fields: {
                paginateArticles(existing: any, {readField, toReference}){
                  return deletePaginationCache(id, existing, readField, toReference);
                }
              }
            })
          }
        }
      })
    }, 'removeForever')
  }
  return { deleteForeverArticle }
 }
