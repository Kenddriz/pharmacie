import { reactive } from 'vue';
import { SAVE_PAYMENT, SavePaymentData } from './payment.sdl';
import { useMutation } from '@vue/apollo-composable';
import { MutationSavePaymentArgs, Payment, SavePaymentInput } from '../types';

export const useSavePayment = () => {
  const paymentInput = reactive<SavePaymentInput>({
    id: 0,
    date: '',
    description: '',
    invoiceId: 0,
    paymentModeId: 0,
    reference: ''
  });
  const setPayment = (payment: Payment) => {
    const { id, date, description, reference} = payment;
    Object.assign(paymentInput, { id, date, description, reference});
    paymentInput.paymentModeId = payment.paymentMode.id;
  }
  const {mutate, loading: paymentLoading} = useMutation<
    SavePaymentData,
    MutationSavePaymentArgs
    >(SAVE_PAYMENT);
  const savePayment = async() => {
    await mutate({ input: paymentInput });
  }
  return { paymentInput,savePayment, paymentLoading, setPayment }
}
