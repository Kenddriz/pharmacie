import { ArticlePagination, MutationSaveMedicineArgs } from '../types';
import { useMutation } from '@vue/apollo-composable';
import { SAVE_MEDICINE, SaveMedicineData } from './medicine.sdl';

export const useSaveMedicine = () => {
  const { mutate, loading: creationLoading } = useMutation<SaveMedicineData, MutationSaveMedicineArgs>(SAVE_MEDICINE);
  function addMedicine(articleId: number, formId: number, dosageId: number, packagingId: number) {
    void mutate({ input: {id: 0, articleId, formId, dosageId, packagingId} }, {
      update(cache, { data }) {
        if(data?.saveMedicine){
          cache.modify({
            fields: {
              paginateArticles(existing: ArticlePagination){
                const article = existing.items.find(a => a.id === data.saveMedicine.article.id);
                console.log(existing);
                if(article){
                  article?.medicines?.push(data.saveMedicine);
                }
                return existing;
              }
            }
          })
        }
      }
    })
  }
  return { addMedicine, creationLoading}
}
