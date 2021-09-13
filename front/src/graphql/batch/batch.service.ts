import { useLazyQuery, useMutation, useResult } from '@vue/apollo-composable';
import {
  CREATE_BATCH,
  CreateBatchData,
  FIND_EXISTING_BATCH,
  FindExistingBatchData,
  UPDATE_BATCH,
  UpdateBatchData,
} from './batch.sdl';
import {
  BatchFormInput,
  MutationCreateBatchArgs,
  MutationUpdateBatchArgs,
  QueryFindExistingBatchArgs,
  UpdateBatchInput,
} from '../types';
import { Loading } from 'quasar';
import { notify } from '../../shared/notification';

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
  const { mutate, onDone, onError } = useMutation<
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
  onError(() => {
    Loading.hide();
  })
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
