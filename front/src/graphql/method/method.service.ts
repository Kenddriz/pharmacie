import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  CREATE_METHOD,
  CreateMethodData,
  METHODS,
  MethodsData, REMOVE_METHOD,
  RemoveMethodeData,
  UPDATE_METHOD,
  UpdateMethodData,
} from './method.sdl';
import { MethodInput, MutationCreateMethodArgs, MutationUpdateMethodArgs, MutationRemoveMethodArgs } from '../types';
import { notify } from '../../shared/notification';
import { Loading } from 'quasar';

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
  const {mutate, onDone} = useMutation<
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
    Loading.hide();
    notify(data?.createMethod ? 'Création avec succès !': 'Echec de création !');
  });
  const submitCreation = (input: MethodInput) => {
    Loading.show({ message: 'Création ...!'});
    void mutate({ input });
  }
  return { submitCreation }
}
export const useUpdatePaymentsMode = () => {
  const {mutate, onDone} = useMutation<
    UpdateMethodData,
    MutationUpdateMethodArgs
    >(UPDATE_METHOD);
  onDone(({ data }) => {
    Loading.hide();
    notify(data?.updateMethod ? 'Mise à jour avec succès !': 'Echec de mise à jour !');
  });
  const submitUpdate = (input: MethodInput) => {
    Loading.show({ message: 'Mise à jour ...!'});
    void mutate({ input });
  }
  return { submitUpdate }
}
export const useRemoveMethod = () => {
  const { mutate, onDone } = useMutation<
    RemoveMethodeData,
    MutationRemoveMethodArgs
    >(REMOVE_METHOD);
  onDone(({ data }) => {
    Loading.hide();
    notify(data?.removeMethod ? 'Suppression avec succès' : 'Echec de suppression');
  });
  function removeMethod(id:number) {
    Loading.show({ message: 'Suppression ...'});
    void mutate({ id }, {
      update(cache, { data }) {
        if(data?.removeMethod) {
          cache.modify({
            fields: {
              methods(existingRef: any, { readField }) {
                return existingRef.filter((eRef: any) => readField('id', eRef) !== id)
              }
            }
          })
        }
      }
    })
  }
  return { removeMethod }
}
