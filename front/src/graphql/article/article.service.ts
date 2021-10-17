import { useLazyQuery, useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  ArticlePaginationData,
  FIND_ARTICLE_SALE,
  FIND_ONE_ARTICLE,
  FindOneArticleData,
  PAGINATE_ARTICLE,
  PAGINATE_DELETED_ARTICLES,
  PaginateDeletedArticlesData, REMOVE_ARTICLE,
  RemoveArticleData,
  RESTORE_ARTICLE,
  RestoreArticleData,
  SAVE_ARTICLE,
  SaveArticleData,
  SOFT_REMOVE_ARTICLE,
  SoftRemoveArticleData,
} from './article.sdl';
import {
  Article,
  MutationSaveArticleArgs,
  Packaging,
  PaginationInput,
  QueryFindOneArticleArgs,
  QueryPaginateArticlesArgs,
  SaveArticleInput,
  QueryPaginateDeletedArticlesArgs,
  MutationSoftRemoveArticleArgs,
  MutationRestoreArticleArgs,
  MutationRemoveArticleArgs,
  FindByMeasureInput,
  PaginateArticleInput
} from '../types';
import { addPaginationCache, deletePaginationCache, InitialPagination } from '../utils/pagination';
import { reactive, ref } from 'vue';
import { cloneDeep, removeDialog } from '../utils/utils';
import { Loading } from 'quasar';
import { notify } from '../../shared/notification';

const lim = Math.ceil((screen.height - 150)/50);

export const usePaginateArticle = (
  limit = lim,
  withBatches = true,
  measureInput: FindByMeasureInput|undefined = undefined
) => {
  const searchInput = reactive<PaginateArticleInput>({
    limit,
    keyword: '',
    page: 1
  });
  if(measureInput)Object.assign(searchInput, { measureInput });
  const {result, loading: listLoading, refetch, onResult } = useQuery<
    ArticlePaginationData,
    QueryPaginateArticlesArgs
    >(PAGINATE_ARTICLE(withBatches), { input: { ...searchInput } });
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
export const useFindOneArticle = (model = '') => {
  const keyword = ref<string>(model);
  const { loading: faLoading, result, load } = useLazyQuery<
    FindOneArticleData,
    QueryFindOneArticleArgs
    >(FIND_ARTICLE_SALE);
  function findArticle() {
    if(keyword.value) void load(FIND_ARTICLE_SALE,{keyword: keyword.value });
  }
  const article = useResult<
    FindOneArticleData|undefined,
    Article|undefined,
    Article|undefined
    >(result, undefined, pick => pick?.findOneArticle);
  return {
    faLoading,
    findArticle,
    article,
    keyword
  }
}
export const usePaginateDeletedArticles = () => {
  const input = reactive<PaginationInput>({
    page: 1,
    limit : 5
  });
  const { loading, result } = useQuery<
    PaginateDeletedArticlesData,
    QueryPaginateDeletedArticlesArgs
    >(PAGINATE_DELETED_ARTICLES, { input });
  const article = useResult(result, InitialPagination, pick => pick?.paginateDeletedArticles||InitialPagination)
  return {
    input,
    loading,
    article
  }
}
export const useSoftRemoveArticle = () => {
  const { onDone, mutate } = useMutation<
    SoftRemoveArticleData,
    MutationSoftRemoveArticleArgs
    >(SOFT_REMOVE_ARTICLE);
  onDone(() => {
    Loading.hide();
    notify('suppression avec succès !');
  });
  function softRemoveArticle(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Suppression ...' });
      void mutate({ id }, {
        update(cache, { data }) {
          if(data?.softRemoveArticle) {
            cache.modify({
              fields: {
                paginateArticles(existingRef: any, { readField, toReference }) {
                  return deletePaginationCache(id, existingRef, readField, toReference);
                },
                paginateDeletedArticles(existingRef: any, { readField }) {
                  return addPaginationCache(data.softRemoveArticle, existingRef, readField);
                }
              }
            })
          }
        }
      })
    })
  }
  return { softRemoveArticle }
}
export const useRestoreArticle = () => {
  const { mutate, onDone } = useMutation<
    RestoreArticleData,
    MutationRestoreArticleArgs
    >(RESTORE_ARTICLE);
  onDone(({ data }) => {
    Loading.hide();
    notify(data?.restoreArticle ? 'Restauration avec succès !' : 'Echec de restauration');
  });
  function restore(id: number) {
    Loading.show({ message: 'Restauration ...'});
    void mutate({ id }, {
      update: (cache, { data }) => {
        if(data?.restoreArticle) {
          cache.modify({
            fields: {
              paginateArticles(existing: any, {toReference}) {
                return addPaginationCache(data.restoreArticle, existing, toReference);
              },
              paginateDeletedArticles(existing: any, {readField, toReference}) {
                return deletePaginationCache(id, existing, readField,  toReference);
              }
            }
          })
        }
      }
    })
  }
  return { restore }
}
export const useRemoveArticle = () => {
  const { onDone, mutate} = useMutation<
    RemoveArticleData,
    MutationRemoveArticleArgs
    >(REMOVE_ARTICLE);
  onDone(() => {
    Loading.hide();
    notify('suppression avec succès !');
  });
  function remove(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Exécution de l\'opération ...' });
      void mutate({ id }, {
        update(cache, { data }) {
          if(data?.removeArticle) {
            cache.modify({
              fields: {
                paginateDeletedArticles(existingRef: any, { readField, toReference }) {
                  return deletePaginationCache(id, existingRef, readField, toReference);
                }
              }
            })
          }
        }
      })
    }, 'removeForever')
  }
  return { remove }
}
