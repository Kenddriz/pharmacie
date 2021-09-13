import { CREATE_PAYMENT, CreatePaymentData, UPDATE_PAYMENT, UpdatePaymentData } from './payment.sdl';
import { useMutation } from '@vue/apollo-composable';
import { notify } from '../../shared/notification';
import { CreatePaymentInput, MutationCreatePaymentArgs, MutationUpdatePaymentArgs, UpdatePaymentInput } from '../types';

export const useCreatePayment = () => {
  const {mutate, loading: cpLoading, onDone} = useMutation<
    CreatePaymentData,
    MutationCreatePaymentArgs
    >(CREATE_PAYMENT);
  onDone(({ data }) => {
    if(data?.createPayment)notify('La facturée est reglée !');
  })
  const createPayment = async(input: CreatePaymentInput) => {
    await mutate({ input });
  }
  return { createPayment, cpLoading }
}

export const useUpdatePayment = () => {
  const {mutate, loading: upLoading, onDone} = useMutation<
    UpdatePaymentData,
    MutationUpdatePaymentArgs
    >(UPDATE_PAYMENT);
  onDone(({ data }) => {
    if(data?.updatePayment)notify('La facture a été mise à jour !');
  })
  const updatePayment = async(input: UpdatePaymentInput) => {
    await mutate({ input });
  }
  return { updatePayment, upLoading }
}
