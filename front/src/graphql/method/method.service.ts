import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { reactive, ref } from 'vue';
import { CREATE_METHOD, CreateMethodData, METHODS, MethodsData, UPDATE_METHOD, UpdateMethodData } from './method.sdl';
import { Method, MethodInput, MutationCreateMethodArgs, MutationUpdateMethodArgs } from '../types';
import { notify } from '../../shared/notification';

export const useMethods = () => {
  const {result, loading: pmLoading} = useQuery<MethodsData>(METHODS);
  const defaultValue:MethodsData = { methods: [] };
  const paymentModes = useResult<MethodsData|undefined, MethodsData, MethodsData>(result, defaultValue, res => {
    if(res?.methods)return res;
    return defaultValue;
  });
  return {
    pmLoading,
    paymentModes
  }
}
export const useCreatePaymentsMode = () => {
  const creationInput = reactive<MethodInput>({ label: '' });
  const creationDialog = ref<boolean>(false);
  const {mutate, loading: creationLoading, onDone} = useMutation<
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
  onDone(({ data }) => {
    if(data?.createMethod)
      notify('Moyen de payement < ' + data.createMethod.label + ' > enregistré');
  })
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
