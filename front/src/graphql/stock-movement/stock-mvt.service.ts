import { useMutation } from '@vue/apollo-composable';
import { UPDATE_ASSURED_LINE, UpdateAssuredLineData } from './stock-mvt.sdl';
import { MutationUpdateAssuredLineArgs, StockMovement, UpdateAssuredLineInput } from '../types';
import { computed, reactive } from 'vue';
import { Loading } from 'quasar';
import { notify } from '../../shared/notification';

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
      message: 'Enregistrement des modifications ...'
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