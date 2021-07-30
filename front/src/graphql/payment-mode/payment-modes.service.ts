import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  CREATE_PAYMENT_MODE,
  CreatePaymentMode,
  PAYMENT_MODES,
  PaymentModes, REMOVE_PAYMENT_MODE, RemovePaymentModeData,
  UPDATE_PAYMENT_MODE, UpdatePaymentMode,
} from './payment-modes.sdl';
import {
  MutationCreatePaymentModeArgs, MutationRemovePaymentModeArgs,
  MutationUpdatePaymentModeArgs, PaymentMode,
  PaymentModeInput,
} from '../types';
import { reactive, ref } from 'vue';
import { notify } from '../../shared/notification';

export const usePaymentModes = () => {
  const {result, loading: listLoading} = useQuery<PaymentModes>(PAYMENT_MODES);
  return {
    listLoading,
    paymentModes: useResult(result, [], res => res.paymentModes)
  }
}
export const useCreatePaymentsMode = () => {
  const creationInput = reactive<PaymentModeInput>({ label: '' });
  const creationDialog = ref<boolean>(false);
  const {mutate, loading: creationLoading} = useMutation<
    CreatePaymentMode,
    MutationCreatePaymentModeArgs
    >(CREATE_PAYMENT_MODE, {
      update (cache, {data}){
        if(data?.createPaymentMode) {
          const cacheData = cache.readQuery<PaymentModes>({
            query: PAYMENT_MODES
          });
          if(cacheData?.paymentModes) {
            cache.writeQuery<PaymentModes>({
              query: PAYMENT_MODES,
              data: {
                paymentModes: [data.createPaymentMode, ...cacheData.paymentModes]
              }
            })
          }
        }
      },
  });
  const submitCreation = async () => {
    await mutate({ input: creationInput });
    creationDialog.value = false;
  }
  return { submitCreation,creationLoading, creationInput, creationDialog }
}

export const useUpdatePaymentsMode = () => {
  const {mutate, loading: creationLoading} = useMutation<
    UpdatePaymentMode,
    MutationUpdatePaymentModeArgs
    >(UPDATE_PAYMENT_MODE);
  const updateInput = reactive<PaymentModeInput>({
    id: 0,
    label: ''
  });
  const updateDialog = ref<boolean>(false);
  const setUpdateInput = (input: PaymentMode) => {
    updateInput.id = input.id;
    updateInput.label = input.label;
    updateDialog.value = true;
  }
  const submitUpdate = async () => {
    await mutate({ input: updateInput });
    updateDialog.value = false;
  }
  return { submitUpdate,creationLoading, updateInput, updateDialog, setUpdateInput }
}

export const useRemovePaymentMode = () => {
  const { loading: removePaymentModeLoading, mutate} = useMutation<
    RemovePaymentModeData,
    MutationRemovePaymentModeArgs
    >(REMOVE_PAYMENT_MODE, {
      update: (cache, { data}) => {
        if(data?.removePaymentMode && !data?.removePaymentMode.payment) {
          cache.modify({
            fields: {
              paymentModes: (existingData: PaymentMode[], { readField}) => {
                return existingData.filter(
                  commentRef => data.removePaymentMode.id !== readField('id', commentRef)
                );
              }
            }
          })
        }
        else notify('Echec de suppression');
      }
  });
  const submitRemovePaymentMode = async (id: number) => {
    await mutate({ id });
  }
  return {submitRemovePaymentMode, removePaymentModeLoading}
}
