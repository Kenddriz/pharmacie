import { defaultPatientInput } from '../patient/patient.service';
import { useMutation } from '@vue/apollo-composable';
import {
  CREATE_PRESCRIPTION,
  CreatePrescriptionData,
  DELETE_PRESCRIPTION,
  DeletePrescriptionData,
  UPDATE_PRESCRIPTION,
  UpdatePrescriptionData,
} from './prescription.sdl';
import {
  CreatePrescriptionInput,
  MutationCreatePrescriptionArgs,
  MutationDeletePrescriptionArgs,
  MutationUpdatePrescriptionArgs,
  UpdatePrescriptionInput,
} from '../types';
import { notify } from '../../shared/notification';
import { removeDialog } from '../utils/utils';

export const defaultPrescription = {
  reference: '',
  description: '',
  patient: defaultPatientInput
}

export const useCreatePrescription = () => {
  const { mutate, loading: cpLoading, onDone } = useMutation<
    CreatePrescriptionData,
    MutationCreatePrescriptionArgs
    >(CREATE_PRESCRIPTION);
  onDone(() => notify('Ordonnance créée avec succès!'));
  function createPrescription(input: CreatePrescriptionInput) {
    void mutate({ input });
  }
  return {
    cpLoading,
    createPrescription
  }
}
export const useUpdatePrescription = () => {
  const { mutate, loading: upLoading, onDone } = useMutation<
    UpdatePrescriptionData,
    MutationUpdatePrescriptionArgs
    >(UPDATE_PRESCRIPTION);
  onDone(() => notify('Mise à jour avec succès!'));
  function updatePrescription(input: UpdatePrescriptionInput) {
    void mutate({ input });
  }
  return {
    upLoading,
    updatePrescription
  }
}

export const useDeletePrescription = () => {
  const { loading: dpLoading, mutate, onDone } = useMutation<
    DeletePrescriptionData,
    MutationDeletePrescriptionArgs
    >(DELETE_PRESCRIPTION);
  onDone(() => {
    notify('Ordonnance supprimée !');
  });
  function deletePrescription(id: number, saleId: number) {
    removeDialog(() => void mutate({ input: { id, saleId }}), 'removeForever');
  }
  return {
    dpLoading,
    deletePrescription
  }
}
