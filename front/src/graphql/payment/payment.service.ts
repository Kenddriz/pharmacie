import { reactive } from 'vue';
import { SAVE_PAYMENT, SavePaymentData } from './payment.sdl';
import { useMutation } from '@vue/apollo-composable';
import { MutationSavePaymentArgs, Payment, SavePaymentInput } from '../types';
import { formatDate } from '../../shared/date';
import { notify } from '../../shared/notification';

export const useSavePayment = () => {
  const paymentInput = reactive<SavePaymentInput>({
    id: 0,
    date: formatDate(Date.now(), 'DATE_ONLY'),
    description: '',
    invoiceId: 0,
    paymentModeId: 0,
    reference: ''
  });
  const setPayment = (payment: Payment) => {
    const { id, date, reference} = payment;
    Object.assign(paymentInput, { id, date, reference});
    paymentInput.paymentModeId = payment.method.id;
  }
  const {mutate, loading: paymentLoading, onDone} = useMutation<
    SavePaymentData,
    MutationSavePaymentArgs
    >(SAVE_PAYMENT);
  onDone(() => {
    if(paymentInput.id === 0)notify('La facturée est reglée !');
    else notify('Mise à jour de payement avec succès !');
  })
  const savePayment = async() => {
    await mutate({ input: {
        ...paymentInput,
        date: paymentInput.date.split('/').reverse().join('-')
      }
    });
  }
  return { paymentInput,savePayment, paymentLoading, setPayment }
}
