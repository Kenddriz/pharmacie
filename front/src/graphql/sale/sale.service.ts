import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  Count2LatestWeekSalesData,
  COUNT_2LATEST_WEEK_SALES,
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
import { computed, reactive, ref } from 'vue';
import { cloneDeep, removeDialog } from '../utils/utils';
import { notify } from '../../shared/notification';
import { deletePaginationCache, InitialPagination } from '../utils/pagination';
import { defaultPrescription } from '../prescription/prescription.service';
import moment from 'moment';
import { useI18n } from 'vue-i18n';

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
                return deletePaginationCache(id, existingRef, readField, toReference);
              },
              paginatePatientSales(existingRef: any, {readField, toReference}) {
                return deletePaginationCache(id, existingRef, readField, toReference);
              }
            }
          })
        }
      }
    }))
  }
  return { softRemoveSale, srsLoading }
}

export const initialSeries = [
  {
    name: 'Semaine actuelle',
    data: []
  },
  {
    name: 'Semaine dernière',
    data: []
  }
]

export const useCount2LatestWeekSales = () => {
  const { loading, result } = useQuery<Count2LatestWeekSalesData>(COUNT_2LATEST_WEEK_SALES, {}, { fetchPolicy: 'no-cache'});
  const currentChoice = ref<number>(0);
  const { tm } = useI18n();
  const months: string[] = tm('local.monthsShort') as string[];
  const days: string[] = tm('local.daysShort') as string[];
  function title(date: string) {
    return '(' + months[moment(date).month()]
      + ' ' + moment(date).year() + ')';
  }
  const salesData = computed(() => {
    const salesOptions: any = {
      colors: ['#FCCF31', '#17ead9', '#f02fc2'],
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000
      },
      chart: {
        type: 'line',
        toolbar: { show: false}
      },
      grid: {
        show: true,
        strokeDashArray: 0,
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      stroke: {
        curve: 'smooth'
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: 'Volume de vente',
        align: 'left',
        style: {
          color: '#455a64'
        }
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: '#455a64'
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function(val: number) {
            return val.toFixed(0);
          },
          style: {
            colors: '#455a64'
          }
        }
      }
    };
    const salesSeries: any[] =  [cloneDeep(initialSeries[currentChoice.value])]
    const res = result.value?.count2LatestWeekSales;
    if(res) {
      if(currentChoice.value === 0) {
        res.current.forEach((cur, index) => {
          salesOptions.xaxis.categories.push(days[moment(cur.day).weekday()]);
          salesSeries[0].data.push(cur.count);
          if(index === 0) salesOptions.title.text += title(cur.day);
        })
      }
      else {
        res.last.forEach((ls, index) => {
          salesOptions.xaxis.categories.push(days[moment(ls.day).weekday()]);
          salesSeries[0].data.push(ls.count);
          if(index === 0) salesOptions.title.text += title(ls.day);
        })
      }
    }
    return { salesOptions, salesSeries }
  })
  return { loading, salesData, currentChoice }
}
