import { useLazyQuery, useMutation, useQuery, useResult } from '@vue/apollo-composable';
import {
  COUNT_STOCK_MOVEMENTS, CountStockMovementsData,
  CREATE_BATCH,
  CreateBatchData,
  FIND_EXISTING_BATCH,
  FindExistingBatchData, SOFT_REMOVE_BATCH, SoftRemoveData,
  UPDATE_BATCH,
  UpdateBatchData,
} from './batch.sdl';
import {
  BatchFormInput,
  MutationCreateBatchArgs,
  MutationUpdateBatchArgs,
  QueryCountStockMovementsArgs,
  QueryFindExistingBatchArgs,
  UpdateBatchInput,
  MutationSoftRemoveBatchArgs
} from '../types';
import { Loading } from 'quasar';
import { notify } from '../../shared/notification';
import { removeDialog } from '../utils/utils';

export const useCreateBatch = () => {
  const { mutate, onDone, onError } = useMutation<
    CreateBatchData,
    MutationCreateBatchArgs
    >(CREATE_BATCH);
  onDone(({ data }) => {
    Loading.hide();
    notify(data?.createBatch ? 'Création avec succès' : 'Lot existe déjà');
  });
  onError(() => {
    Loading.hide();
  })
  return {
    createBatch: (input: BatchFormInput) => {
    Loading.show({
      message: 'Création du nouveau lot ...'
    });
    void mutate({ input })
  }
  }
}

export const useUpdateBatch = () => {
  const { mutate, onDone } = useMutation<
    UpdateBatchData,
    MutationUpdateBatchArgs
    >(UPDATE_BATCH);
  onDone(({ data }) => {
    Loading.hide();
    notify(
      data?.updateBatch ?
      'Opération effectuée avec succès' :
      'Un autre lot ayant la même date d\'expiration existe déjà!'
    );
  });
  return {
    updateBatch: (input: UpdateBatchInput) => {
      Loading.show({ message: 'Exécution de mise à jour ...' })
      void mutate({ input });
    }
  }
}

export const useFindExistingBatch = (medicineId: number) => {
  const { loading: febLoading, load, result } = useLazyQuery<FindExistingBatchData, QueryFindExistingBatchArgs>(FIND_EXISTING_BATCH);
  const existingBatch = useResult(result, null, res => res?.findExistingBatch);
  function findExistingBatch (expirationDate: string) {
    load(FIND_EXISTING_BATCH, {input: { medicineId, expirationDate}}, {fetchPolicy: 'no-cache'});
  }
  return {
    febLoading,
    findExistingBatch,
    existingBatch
  }
}

export const useCountStockMovements = (id: number) => {
  const { result, refetch } = useQuery<
    CountStockMovementsData,
    QueryCountStockMovementsArgs
    >(COUNT_STOCK_MOVEMENTS, { id }, { fetchPolicy: 'no-cache' });
  function getCount(id: number) {
    void refetch({ id });
  }
  return {
    count: useResult(result, 0, res => res?.countStockMovements),
    getCount
  }
}

export const useSoftRemoveBatch = () => {
  const { mutate, onDone } = useMutation<
    SoftRemoveData,
    MutationSoftRemoveBatchArgs
    >(SOFT_REMOVE_BATCH);
  onDone(() => {
    Loading.hide();
    notify('Suppression avec succès !');
  })
  function softRemove(id: number) {
    removeDialog(() => {
      Loading.show({ message: 'Suppression ...' });
      void mutate({ id });
    })
  }
  return { softRemove }
}
