import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  Count2LatestWeekSalesData,
  COUNT_2LATEST_WEEK_SALES,
  CREATE_SALE,
  CreateSaleData, PAGINATE_DELETED_SALES,
  PAGINATE_SALE, PaginateDeletedSalesData,
  PaginateSalesData, REMOVE_SALE, RemoveSaleData, RESTORE_SALE, RestoreSaleData,
  SOFT_REMOVE_SALE, SoftRemoveSaleData,
} from './sale.sdl';
import {
  MutationCreateSaleArgs,
  MutationRemoveSaleArgs,
  MutationRestoreSaleArgs,
  MutationSoftRemoveSaleArgs,
  PaginationInput,
  PrescriptionInput,
  QueryPaginateDeletedSalesArgs,
  QueryPaginateSalesArgs,
  Sale,
  SaleLineInput,
} from '../types';
import { Loading } from 'quasar';
import { computed, reactive, ref } from 'vue';
import { cloneDeep, removeDialog } from '../utils/utils';
import { notify } from '../../shared/notification';
import { addPaginationCache, deletePaginationCache, InitialPagination } from '../utils/pagination';
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
                return addPaginationCache(data.createSale, existingRef, toReference);
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
    QueryPaginateSalesArgs
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
type Serie = {
  data: number[];
  name: string;
}
export const useCount2LatestWeekSales = () => {
  const { loading, result } = useQuery<Count2LatestWeekSalesData>(COUNT_2LATEST_WEEK_SALES, {}, { fetchPolicy: 'no-cache'});
  const { tm } = useI18n();
  const days: string[] = tm('local.daysShort') as string[];
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
      legend: {
        show: true,
        fontFamily: 'Poppins, sans-serif',
        color: '#455a64',
      },
      grid: {
        show: true,
        strokeDashArray: 0,
        xaxis: {
          fontFamily: 'Poppins, sans-serif',
          color:  '#455a64',
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
        align: 'center',
        style: {
          fontFamily: 'Poppins, sans-serif',
          color:  '#455a64',
        }
      },
      xaxis: {
        categories: days,
        labels: {
          style: {
            fontFamily: 'Poppins, sans-serif',
            color:  '#455a64',
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function(val: number) {
            return val.toFixed(0);
          },
          style: {
            fontFamily: 'Poppins, sans-serif',
            color:  '#455a64',
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: 'Poppins, sans-serif',
        },
      }
    };
    const salesSeries: Serie[] = [
      {
        name: 'Semaine dernière',
        data: []
      },
      {
        name: 'Semaine actuelle',
        data: []
      }
    ]
    const res = result.value?.count2LatestWeekSales;
    if(res) {
      days.forEach((day, index) => {
        index += 1;
        const last = res.last.find(ls => moment(ls.day).day() === index);
        salesSeries[0].data.push(last?.count||0);
        const cur = res.current.find(cu => moment(cu.day).day() === index);
        salesSeries[1].data.push(cur?.count||0);
      });
    }
    return { salesOptions, salesSeries }
  })
  return { loading, salesData }
}

export const usePaginateDeletedSales = () => {
  const input = reactive<PaginationInput>({
    page: 1,
    limit : 5
  });
  const { loading, result } = useQuery<
    PaginateDeletedSalesData,
    QueryPaginateDeletedSalesArgs
    >(PAGINATE_DELETED_SALES, { input });
  const sale = useResult(result, InitialPagination, pick => pick?.paginateDeletedSales||InitialPagination)
  return {
    input,
    loading,
    sale
  }
}
export const useSoftRemoveSale = () => {
  const { onDone, mutate } = useMutation<
    SoftRemoveSaleData,
    MutationSoftRemoveSaleArgs
    >(SOFT_REMOVE_SALE);
  onDone(() => {
    Loading.hide();
    notify('suppression avec succès !');
  });
  function softRemoveSale(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Suppression ...' });
      void mutate({ id }, {
        update(cache, { data }) {
          if(data?.softRemoveSale) {
            cache.modify({
              fields: {
                paginateSales(existingRef: any, {readField, toReference}){
                  return deletePaginationCache(id, existingRef, readField, toReference);
                },
                paginatePatientSales(existingRef: any, {readField, toReference}) {
                  return deletePaginationCache(id, existingRef, readField, toReference);
                },
                paginateDeletedSales(existingRef: any, { toReference }) {
                  return addPaginationCache(data.softRemoveSale, existingRef, toReference);
                }
              }
            })
          }
        }
      })
    })
  }
  return { softRemoveSale }
}
export const useRestoreSale = () => {
  const { mutate, onDone } = useMutation<
    RestoreSaleData,
    MutationRestoreSaleArgs
    >(RESTORE_SALE);
  onDone(({ data }) => {
    Loading.hide();
    notify(data?.restoreSale ? 'Restauration avec succès !' : 'Echec de restauration');
  });
  function restore(id: number) {
    Loading.show({ message: 'Restauration ...'});
    void mutate({ id }, {
      update: (cache, { data }) => {
        if(data?.restoreSale) {
          cache.modify({
            fields: {
              paginateSales(existingRef: any, {toReference}) {
                return addPaginationCache(data.restoreSale, existingRef, toReference);
              },
              paginatePatientSales(existingRef: any, {toReference}) {
                return addPaginationCache(data.restoreSale, existingRef, toReference);
              },
              paginateDeletedSales(existingRef: any, {readField, toReference}) {
                return deletePaginationCache(id, existingRef, readField,  toReference);
              }
            }
          })
        }
      }
    })
  }
  return { restore }
}
export const useRemoveSale = () => {
  const { onDone, mutate} = useMutation<
    RemoveSaleData,
    MutationRemoveSaleArgs
    >(REMOVE_SALE);
  onDone(() => {
    Loading.hide();
    notify('suppression avec succès !');
  });
  function remove(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Suppression ...' });
      void mutate({ id }, {
        update(cache, { data }) {
          if(data?.removeSale) {
            cache.modify({
              fields: {
                paginateDeletedSales(existingRef: any, { readField, toReference }) {
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
