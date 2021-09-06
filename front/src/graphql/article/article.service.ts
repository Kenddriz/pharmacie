import { useLazyQuery, useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  ArticlePaginationData,
  FIND_ONE_ARTICLE, FindOneArticle,
  PAGINATE_ARTICLE,
  SAVE_ARTICLE,
  SaveArticleData,
} from './article.sdl';
import {
  Article,
  ArticlePagination,
  MutationSaveArticleArgs, Packaging,
  PaginationInput, QueryFindOneArticleArgs,
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
    FindOneArticle,
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
      //Object.assign(model, selectOptions.value[0]);
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
