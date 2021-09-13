import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { CREATE_FORM, CreateFormData, FORMS, FormsData, UPDATE_FORM, UpdateFormData } from './form.sdl';
import { CreateFormInput, Form, MutationCreateFormArgs, MutationUpdateFormArgs, UpdateFormInput } from '../types';
import { reactive } from 'vue';
import { cloneDeep } from '../utils/utils';
import { notify } from '../../shared/notification';
import { Loading } from 'quasar';

export const useForms = () => {
  const { result } = useQuery<FormsData>(FORMS);
  const selectedForm = reactive<Form>({
    id: 0,
    label: ''
  });
  const forms = useResult<FormsData|undefined, Form[], Form[]>(result, [], res => {
    if(res?.forms && res.forms.length){
      Object.assign(selectedForm, cloneDeep(res.forms[0]));
      return res.forms;
    }
    return [];
  })

  return { forms, selectedForm }
}
export const useCreateForm = () => {
  const { mutate, onDone, onError } = useMutation<
    CreateFormData,
    MutationCreateFormArgs
    >(CREATE_FORM, {
      update(cache, { data }) {
        if(data?.createForm) {
          cache.modify({
            fields: {
              forms(existing: any [], { toReference }) {
                return [...existing, toReference(data.createForm)];
              }
            }
          })
        }
      }
  });
  onDone(({ data }) => {
    Loading.hide();
    notify(data?.createForm ? 'Création avec succès' : 'Cette forme existe déjà ...');
  });
  onError(() => Loading.hide())
  return {
    createForm: (input: CreateFormInput) => {
      Loading.show({
        message: 'Création de la forme ...'
      })
      void mutate({ input });
    }
  }
}
export const useUpdateForm = () => {
  const { mutate, onDone, onError } = useMutation<UpdateFormData, MutationUpdateFormArgs>(UPDATE_FORM);
  onError(() => Loading.hide())
  onDone(({ data }) => {
    Loading.hide();
    notify(data?.updateForm ? 'Modification avec succès' : 'Cette forme existe déjà ...');
  })
  return {
    updateForm: (input: UpdateFormInput) => {
      Loading.show({
        message: 'Modification de la forme ...'
      })
      void mutate({ input });
    }
  }
}
