import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { reactive, ref } from 'vue';
import { CREATE_METHOD, CreateMethodData, METHODS, MethodsData, UPDATE_METHOD, UpdateMethodData } from './method.sdl';
import { Method, MethodInput, MutationCreateMethodArgs, MutationUpdateMethodArgs } from '../types';

export const usePaymentModes = () => {
  const {result, loading: listLoading} = useQuery<MethodsData>(METHODS);
  return {
    listLoading,
    paymentModes: useResult(result, [], res => res?.methods)
  }
}
export const useCreatePaymentsMode = () => {
  const creationInput = reactive<MethodInput>({ label: '' });
  const creationDialog = ref<boolean>(false);
  const {mutate, loading: creationLoading} = useMutation<
    CreateMethodData,
    MutationCreateMethodArgs
    >(CREATE_METHOD, {
      update (cache, {data}){
        if(data?.createMethod) {
          cache.modify({
            fields: {
              methods(existing: any, { toReference }) {
                return [...existing, toReference(data.createMethod)]
              }
            }
          })
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
    UpdateMethodData,
    MutationUpdateMethodArgs
    >(UPDATE_METHOD);
  const updateInput = reactive<MethodInput>({
    id: 0,
    label: ''
  });
  const updateDialog = ref<boolean>(false);
  const setUpdateInput = (input: Method) => {
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

/*export const useRemovePaymentMode = () => {
  const { loading: removePaymentModeLoading, mutate} = useMutation<
    RemovePaymentModeData,
    MutationRemovePaymentModeArgs
    >(REMOVE_PAYMENT_MODE, {
      update: (cache, { data}) => {
        const payment = data?.removePaymentMode.payment;
        if(data?.removePaymentMode && !payment) {
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
        else if(payment)
          notify('<div>Impossible de supprimer!Des payments utilisent ce mode</div><div> y compris ce dont la référence n°' + payment.reference + '</div>')
      }
  });
  const submitRemovePaymentMode = async (id: number) => {
    await mutate({ id });
  }
  return {submitRemovePaymentMode, removePaymentModeLoading}
}*/
