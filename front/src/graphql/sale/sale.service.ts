import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  CREATE_SALE,
  CreateSaleData,
  PAGINATE_SALE,
  PaginateSalesData,
  SOFT_REMOVE_SALE,
  SoftRemoveSaleData,
} from './sale.sdl';
import {
  Meta,
  MutationCreateSaleArgs, MutationSoftRemoveSaleArgs,
  PaginationInput, PrescriptionInput,
  QueryPaginateCommandsArgs,
  Sale, SaleLineInput,
} from '../types';
import { Loading } from 'quasar';
import { reactive, ref } from 'vue';
import { cloneDeep, removeDialog } from '../utils/utils';
import { notify } from '../../shared/notification';
import { InitialPagination } from '../utils/pagination';
import { defaultPrescription } from '../prescription/prescription.service';

export const initialCreateSaleInput = {
  saleLines: [],
  prescription: defaultPrescription
}
export const useCreateSale = () => {
  const { onDone, mutate } = useMutation<
    CreateSaleData,
    MutationCreateSaleArgs
    >(CREATE_SALE, {
      update(cache, { data }) {
        if(data?.createSale) {
          cache.modify({
            fields: {
              paginateSales(existingRef: any, {toReference}){
                const meta: Meta = cloneDeep(existingRef.meta);
                meta.totalItems += 1; meta.itemCount += 1;
                return {
                  ...existingRef,
                  meta: toReference(meta),
                  items: [toReference(data.createSale), ...existingRef.items]
                }
              }
            }
          })
        }
      }
  });
  const prescription = reactive<PrescriptionInput>(cloneDeep(defaultPrescription));
  const saleType = ref<string>('free');

  function createSale(saleLines: SaleLineInput[]) {
    if(saleType.value === 'free') {
      Loading.show({
        message: 'Engregistrement de vente'
      });
      void mutate({ input: { saleLines } });
    }
    else {
      if(
        prescription.reference &&
        prescription.patient.name &&
        prescription.patient.phone
      ) {
        Loading.show({
          message: 'Engregistrement de vente'
        });
        void mutate({ input: { saleLines, prescription } });
      }
      else notify('<div class="text-h6">Ordonnance</div><span>Remplir correctement le formulaire</span>', 'red');
    }
  }
  return {
    createSale,
    saleType,
    prescription,
    onDone
  }
}
export const usePaginateSales = () => {
  const paginationInput = reactive<PaginationInput>({
    page: 1,
    limit: Math.ceil((screen.height - 150)/50),
  });
  const selectedSale = ref<Sale[]>([]);

  const { result, loading: psLoading } = useQuery<
    PaginateSalesData,
    QueryPaginateCommandsArgs
    >(PAGINATE_SALE, { paginationInput });

  const sales = useResult(result, InitialPagination, res => {
    if(res?.paginateSales) {
      const id = selectedSale.value[0]?.id;
      selectedSale.value.length = 0;
      const find = res.paginateSales.items.find(item => item.id === id)||res.paginateSales.items[0];
      if(find)selectedSale.value = [cloneDeep(find)];
      return res.paginateSales;
    }
    return InitialPagination
  });
  function selectSale(index: number) {
    Object.assign(selectedSale.value[0], sales.value.items[index]);
  }

  return {
    sales,
    psLoading,
    selectedSale,
    selectSale,
    paginationInput
  }
}

export const useSoftRemoveSale = () => {
  const { mutate, loading: srsLoading } = useMutation<
    SoftRemoveSaleData,
    MutationSoftRemoveSaleArgs
    >(SOFT_REMOVE_SALE);
  function softRemoveSale(id: number) {
    removeDialog(() => void mutate({id}, {
      update(cache, { data }) {
        if(data?.softRemoveSale) {
          cache.modify({
            fields: {
              paginateSales(existingRef: any, {readField, toReference}){
                const meta: Meta = cloneDeep(existingRef.meta);
                meta.totalItems -= 1; meta.itemCount -= 1;
                return {
                  ...existingRef,
                  meta: toReference(meta),
                  items: existingRef.items.filter((eRef: any) => readField('id', eRef) !== id)
                }
              }
            }
          })
        }
      }
    }))
  }
  return { softRemoveSale, srsLoading }
}
