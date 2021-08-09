import { useMutation, useQuery } from '@vue/apollo-composable';
import { DOSAGES_DATA, DosagesData, SAVE_DOSAGE, SaveDosageData } from './dosage.sdl';
import {reactive, ref} from 'vue';
import { Dosage, MutationSaveDosageArgs, SaveDosageInput } from '../types';

export const useDosages = () => {
  const dosages = ref<(Dosage & {children: Dosage[]})[]>([]);
  const { loading:listLoading, onResult } = useQuery<DosagesData>(DOSAGES_DATA);
  onResult(res => {
    if(res.data?.dosages) {
      dosages.value = res.data.dosages
        .filter(u => u.parentId === 0)
        .map(u => ({
          ...u,
          children: res.data.dosages.filter(c => c.parentId === u.id)
        }));
    }
  })
  return {
    listLoading,
    dosages
  }
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
