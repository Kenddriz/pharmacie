<template>
  <q-form @submit.prevent="$emit('validate', model)" spellcheck="false">
    <div class="row bg-teal-14 q-pa-sm text-white">
      <span>Formulaire</span>
      <q-space />
      <q-icon
        v-close-popup
        @click="$emit('close')"
        name="close"
        size="15px"
      />
    </div>
    <q-list dense padding bordered>
      <q-item>
        <q-input
          :model-value="model.label"
          v-model.trim="model.label"
          dense
          label="Libellé"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Libellé réquis']"
        />
      </q-item>
      <q-item>
        <q-input
          min="1"
          type="number"
          :model-value="model.multiplicity"
          v-model.number="model.multiplicity"
          dense
          label="Multiplicité"
          lazy-rules
          :rules="[ val => val > 0 || 'Valeur réquise : multiplicité > 0']"
        />
      </q-item>
      <q-item>
        <q-btn
          type="submit"
          color="primary"
          no-caps
          dense
          rounded
          outline
          label="ok"
          class="full-width"
        />
      </q-item>
    </q-list>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { Unit } from '../../graphql/types';

export default defineComponent({
  name: 'PackagingForm',
  props: {
    unit: Object as PropType<Unit>
  },
  emits: ['validate'],
  setup(props) {
    return {
      model: reactive<Unit>({
        label: props?.unit?.label||'',
        multiplicity: props?.unit?.multiplicity||1
      })
    }
  }
});
</script>

<style scoped>

</style>
