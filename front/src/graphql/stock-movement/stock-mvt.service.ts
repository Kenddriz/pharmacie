import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  ADD_SALE_LINES, AddSaleLinesData,
  CANCEL_SALE_LINES, CancelSaleLinesData,
  PAGINATE_STOCK_MOVEMENT,
  PaginateStockMovementData,
  UPDATE_ASSURED_LINE, UPDATE_SALE_LINE,
  UpdateAssuredLineData, UpdateSaleLineData,
} from './stock-mvt.sdl';
import {
  AddSaleLineInput,
  CancelSaleLinesInput,
  MutationAddSaleLinesArgs,
  MutationCancelSaleLinesArgs,
  MutationUpdateAssuredLineArgs, MutationUpdateSaleLineArgs, PaginateStockMovementInput,
  QueryPaginateStockMovementArgs,
  StockMovement,
  UpdateAssuredLineInput, UpdateSaleLineInput,
} from '../types';
import { computed, reactive } from 'vue';
import { Loading } from 'quasar';
import { notify } from '../../shared/notification';
import { InitialPagination } from '../utils/pagination';

export const useUpdateAssuredLine = (stm: StockMovement) => {
  const updateInput = reactive<UpdateAssuredLineInput>({
    id: stm.id,
    updateCurVat: false,
    batch: {
      medicineId: stm.batch.medicine.id,
      expirationDate: stm.batch.expirationDate,
    },
    assuredLine: {
      quantity: stm.quantity,
      price: stm.price,
      vat: stm.vat,
      discount: stm.discount
    }
  });
  const states= computed(() => {
    const qDelta = updateInput.assuredLine.quantity - stm.quantity;
    const nextStock = stm.batch.currentStock + qDelta;
    const isCurEx = updateInput.batch.expirationDate !== stm.batch.expirationDate;
    return {
      qDelta,
      nextStock,
      isCurEx
    }
  });
  const { loading: ualLoading, mutate, onDone, onError } = useMutation<
    UpdateAssuredLineData,
    MutationUpdateAssuredLineArgs
    >(UPDATE_ASSURED_LINE);
  onDone(() => {
    Loading.hide();
    notify('Mise à jour avec succès!');
  });
  onError(() => Loading.hide());

  function updateAssuredLine () {
    Loading.show({
      message: 'Mise à jour ...'
    })
    void mutate({ input: updateInput });
  }
  return {
    updateInput,
    ualLoading,
    updateAssuredLine,
    states
  }
}

export const usePaginateStockMovement = (medicineId: number, batchId: number) => {
  const stmInput = reactive<PaginateStockMovementInput>({
    medicineId,
    limit: 10,
    page: 1
  });
  if(batchId > -1)Object.assign(stmInput, { batchId });
  const { loading, result } = useQuery<
    PaginateStockMovementData,
    QueryPaginateStockMovementArgs
    >(PAGINATE_STOCK_MOVEMENT, { input: stmInput}, { fetchPolicy: 'no-cache' });
  const stockMovements = useResult(result, InitialPagination, pick => pick?.paginateStockMovement||InitialPagination);
  return {
    loading,
    stmInput,
    stockMovements
  }
}

export const useUpdateSaleLine = (stm: StockMovement) => {
  const { mutate, onDone } = useMutation<
    UpdateSaleLineData,
    MutationUpdateSaleLineArgs
    >(UPDATE_SALE_LINE);
    onDone(() => {
      Loading.hide();
      notify('Mise à jour avec succès !')
    });
    const uslInput = reactive<UpdateSaleLineInput>({
      id: stm.id,
      batchId: stm.batch.id,
      quantity: stm.quantity,
      price: stm.price,
      vat: stm.vat,
      discount: stm.discount
    });
    function updateSaleLine() {
      Loading.show({ message: 'Mise à jour ...'})
      void mutate({input: uslInput});
    }
    return { updateSaleLine, uslInput }
}

export const useCancelSaleLines = () => {
  const { mutate, onDone } = useMutation<
    CancelSaleLinesData,
    MutationCancelSaleLinesArgs
    >(CANCEL_SALE_LINES);
  onDone(() => {
    Loading.hide();
    notify('Annulation avec succès');
  });
  function cancelSaleLine(input: CancelSaleLinesInput) {
    Loading.show({ message: 'Annulation ...' });
    void mutate({ input });
  }
  return {cancelSaleLine}
}

export const useAddSaleLines = () => {
  const { mutate, onDone } = useMutation<
    AddSaleLinesData,
    MutationAddSaleLinesArgs
    >(ADD_SALE_LINES);
  function addSaleLines(input: AddSaleLineInput) {
    Loading.show({ message: 'Enregistrement ...'});
    void mutate({ input });
  }
  return { onDone, addSaleLines }
}
