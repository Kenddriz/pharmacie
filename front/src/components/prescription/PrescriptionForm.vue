<template>
  <q-card-section horizontal>
    <q-card-section class="q-pb-none q-gutter-sm">
      <SuggestedPatients
        v-model="model.patient.name"
        label="Nom du client *"
        @select="Object.assign(model.patient, $event)"
      />
      <SuggestedPatients
        v-model="model.patient.phone"
        label="Téléphone *"
        @select="Object.assign(model.patient, $event)"
      />
      <q-input
        dense
        :model-value="model.reference"
        v-model="model.reference"
        label="Référence d'ordonnance *"
        lazy-rules
        :rules="[val => val && val.length > 0]"
        hide-bottom-space
        input-class="text-blue-grey-14"
      />
    </q-card-section>
    <q-separator inset vertical />
    <q-card-section class="q-pb-none">
      <q-input
        outlined
        type="textarea"
        dense
        :model-value="model.description"
        v-model="model.description"
        label="Description d'ordonnance"
      />
    </q-card-section>
  </q-card-section>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { PrescriptionInput } from '../../graphql/types';
import SuggestedPatients from '../Patient/SuggestedPatients.vue';

export default defineComponent({
  name: 'PrescriptionForm',
  components: { SuggestedPatients },
  props: {
    modelValue: {
      type: Object as PropType<PrescriptionInput>,
      default: () => ({})
    },
  },
  setup(props) {
    const model = reactive(props.modelValue);
    return {
      model
    }
  }
});
</script>

<style scoped>

</style>
