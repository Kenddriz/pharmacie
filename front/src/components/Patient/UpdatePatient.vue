<template>
  <q-dialog ref="dialogRef">
    <q-card  class="q-pa-md">
      <q-form
        autocomplete="off"
        spellcheck="false"
        @submit.prevent="updatePatient"
      >
        <q-input
          :model-value="upInput.name"
          @update:model-value="upInput.name = $event"
          label="Nom *"
          lazy-rules
          :rules="[val => val && val.length > 0 || 'Champs requis']"
        />
        <q-input
          :model-value="upInput.phone"
          @update:model-value="upInput.phone = $event"
          label="Téléphone *"
          lazy-rules
          :rules="[val => val && val.length > 0 || 'Champs requis']"
        />
        <q-card-actions align="between">
          <q-btn
            no-caps
            flat
            rounded
            color="primary"
            type="submit"
            icon-right="send"
            label="Valider"
            v-close-popup
          />
          <q-btn
            no-caps
            flat
            rounded
            color="warning"
            icon-right="close"
            label="Fermer"
            v-close-popup
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Patient } from '../../graphql/types';
import { useDialogPluginComponent } from 'quasar';
import { useUpdatePatient } from '../../graphql/patient/patient.service';

export default defineComponent({
  name: 'UpdatePatient',
  props: {
    patient: {
      type: Object as PropType<Patient>,
      default: () => ({})
    }
  },
  setup(props) {
    const { dialogRef } = useDialogPluginComponent();
    return {
      dialogRef,
      ...useUpdatePatient(props.patient)
    }
  }
});
</script>

<style scoped>

</style>
