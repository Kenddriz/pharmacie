<template>
  <q-card flat bordered>
    <q-card-section class="items-center" horizontal>
      <div class="col-5 text-center text-h5">
        Vente {{ prescription ? 'avec ordonnance' :  'libre' }}
      </div>
      <q-separator vertical />
      <q-form ref="presForm" @submit.prevent="submit">
        <PrescriptionForm class="col" v-model="model" />
        <q-card-actions align="around">
          <template v-if="prescription">
            <q-btn
              type="submit"
              no-caps
              outline
              color="primary"
              icon="save"
              label="Enregistrer"
            />
            <q-btn
              @click="deletePrescription(prescription.id, saleId)"
              no-caps
              outline
              color="red"
              icon="delete_forever"
              label="Supprimer"
            />
          </template>
          <q-btn
            class="full-width"
            type="submit"
            icon="add"
            v-else
            no-caps
            outline
            color="primary"
            label="Créer l'ordonnance"
          />
        </q-card-actions>
      </q-form>
    </q-card-section>
    <q-inner-loading :showing="upLoading||cpLoading||dpLoading">
      <q-spinner-ball size="80px" color="amber" />
    </q-inner-loading>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import  PrescriptionForm from './PrescriptionForm.vue';
import {
  defaultPrescription,
  useCreatePrescription, useDeletePrescription,
  useUpdatePrescription,
} from '../../graphql/prescription/prescription.service';
import { cloneDeep } from '../../graphql/utils/utils';

export default defineComponent({
  name: 'UpdatePrescription',
  components: { PrescriptionForm },
  props: {
    prescription: Object,
    saleId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const model = reactive(cloneDeep(defaultPrescription));
    const presForm = ref<any>(null);
    watch(() => props.prescription, prescription => {
      if(prescription) {
        const {patient, reference, description } = prescription;
        const { name, phone, id } = patient;
        Object.assign(model, { patient: {name, phone, id}, reference, description });
      }
      else Object.assign(model, cloneDeep(defaultPrescription));
      presForm.value?.resetValidation();
    }, { immediate: true })
    const { createPrescription, cpLoading } = useCreatePrescription();
    const { updatePrescription, upLoading } = useUpdatePrescription();
    function submit() {
      const { patient, ...prescription } = model;
      if(props.prescription) {
        updatePrescription({
          id: props.prescription.id,
          ...prescription,
          patient
        })
      }
      else {
        createPrescription({
          ...model,
          saleId: props.saleId
        })
      }
    }
    return {
      model,
      presForm,
      cpLoading,
      upLoading,
      submit,
      ...useDeletePrescription()
    }
  }
});
</script>

<style scoped>

</style>
