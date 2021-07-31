import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import { MEASURES_DATA, MeasuresData, SAVE_MEASURE, SaveMeasureData } from './measure.sdl';
import { reactive } from 'vue';
import { Measure, MutationSaveMeasureArgs, QueryMeasuresArgs, SaveMeasureInput } from '../types';

export const useMeasures = (measuresOnly = true) => {
  const { loading:listLoading, result } = useQuery<
    MeasuresData,
    QueryMeasuresArgs
    >(MEASURES_DATA(measuresOnly), { measures: measuresOnly });
  return {
    listLoading,
    measures: useResult<MeasuresData, Measure[], Measure[]>(result, [], res => res.measures)
  }
}

export const useSaveMeasure = () => {
  const measureInput = reactive<SaveMeasureInput>({
    id: 0,
    label: '',
    parentId: 0
  });
  const setMeasure = (measure: Measure) => {
    type tKey = keyof (typeof measure);
    Object.keys(measureInput).forEach(key => {
      Object.assign(measureInput, {[key]: measure[key as tKey ]})
    })
  }
  const {mutate, loading: measureLoading} = useMutation<
    SaveMeasureData,
    MutationSaveMeasureArgs
    >(SAVE_MEASURE);
  const saveMeasure = async() => {
    if(measureInput.parentId === 0)
      await mutate(
        { input: measureInput },
        {
          update(cache, { data }) {
            if(data?.saveMeasure) {
              cache.modify({
                fields: {
                  measures(existing: Measure[], {toReference}) {
                    return [toReference(data.saveMeasure), ...existing];
                  }
                }
              })
            }
          }
        }
      );
    else await mutate({ input: measureInput });
  }
  const addUnit = async (parentId: number) => {
    measureInput.parentId = parentId;
    await saveMeasure();
    measureInput.parentId = 0;
  }
  return { measureInput,saveMeasure, measureLoading, setMeasure, addUnit }
}
