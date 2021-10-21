import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { DELETE_DOSAGE, DeleteDosageData, DOSAGES_DATA, DosagesData, SAVE_DOSAGE, SaveDosageData } from './dosage.sdl';
import {reactive} from 'vue';
import { Dosage, MutationDeleteDosageArgs, MutationSaveDosageArgs, SaveDosageInput } from '../types';
import { Loading } from 'quasar';
import { notify } from '../../shared/notification';

export type DosageItem = Dosage & {children: Dosage[]};
export const useDosages = () => {
  const selectedDosage = reactive<Dosage>({ id: 0, parentId: 0, label: ''});
  const { loading:listLoading, result } = useQuery<DosagesData>(DOSAGES_DATA);
  const dosages = useResult<DosagesData|undefined, DosageItem[], DosageItem[]>(result, [], res => {
    if(res?.dosages) {
      const ds = res.dosages
        .filter(u => u.parentId === 0)
        .map(u => ({
          ...u,
          children: res.dosages.filter(c => c.parentId === u.id)
        }));
      const child = res.dosages.find(u => u.parentId > 0);
      if(child)Object.assign(selectedDosage, child);
      return ds;
    }
    return [];
  })
  return { listLoading, dosages, selectedDosage }
}

export const useSaveDosage = () => {
  const dosageInput = reactive<SaveDosageInput>({
    id: 0,
    label: '',
    parentId: 0
  });
  const setDosage = (dosage: Dosage) => {
    type tKey = keyof (typeof dosage);
    Object.keys(dosageInput).forEach(key => {
      Object.assign(dosageInput, {[key]: dosage[key as tKey ]})
    })
  }
  const {mutate, loading: dosageLoading} = useMutation<
    SaveDosageData,
    MutationSaveDosageArgs
    >(SAVE_DOSAGE);
  const resetInput = () => {
    dosageInput.id = 0;
    dosageInput.parentId = 0;
  }
  const saveDosage = async() => {
    if(dosageInput.id === 0)
      await mutate(
        { input: dosageInput },
        {
          update(cache, { data }) {
            if(data?.saveDosage) {
              cache.modify({
                fields: {
                  dosages(existing: Dosage[], {toReference}) {
                    return [toReference(data.saveDosage), ...existing];
                  }
                }
              })
            }
          }
        }
      );
    else await mutate({ input: dosageInput });
    dosageInput.label = '';
  }
  const addUnit = async (parentId: number) => {
    dosageInput.parentId = parentId;
    await saveDosage();
    resetInput();
  }
  return { dosageInput,saveDosage, dosageLoading, setDosage, addUnit, resetInput }
}

export const useDeleteDosage = () => {
  const { mutate, onDone } = useMutation<DeleteDosageData, MutationDeleteDosageArgs>(DELETE_DOSAGE);
  onDone(() => {
    Loading.hide();
    notify('Suppression avec succès');
  })
  function deleteDosage(id: number) {
    Loading.show({message: 'Suppression ...'});
    void mutate({ id }, {
      update(cache, { data }) {
        if(data?.deleteDosage) {
          cache.modify({
            fields: {
              dosages(existingRef: any, { readField }) {
                return existingRef.filter((eRef: any) => readField('id', eRef) !== id)
              }
            }
          })
        }
      }
    });
  }
  return {
    deleteDosage
  }
}
