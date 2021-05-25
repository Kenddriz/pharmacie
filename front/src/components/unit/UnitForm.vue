<template>
  <form @submit.prevent="$emit('submit', model)" autocomplete="off" spellcheck="false">
    <q-input
      input-class="text-grey-14"
      v-model="model.label"
      dense
      outlined
      label="Libelle"
      clearable
      class="q-mb-md"
    />
    <q-input
      input-class="text-grey-14"
      v-model="model.description"
      outlined
      clearable
      type="textarea"
      label="Description"
    />
    <q-card-actions align="between">
      <q-btn
        no-caps
        class="q-mt-md"
        color="primary"
        glossy
        :icon="icon"
        :label="submitLabel"
        unelevated
        :disable="!model.label"
        type="submit"
        :loading="loading"
      />
      <q-btn
        glossy
        no-caps
        unelevated
        label="Réinitialiser"
        icon-right="refresh"
        color="primary"
        @click="$emit('reset')"
      />
    </q-card-actions>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue';
import {CreateUnitInput, UpdateUnitInput} from '../../graphql/types';

export default defineComponent({
  name: 'UnitForm',
  props: {
    icon: String,
    loading: Boolean,
    submitLabel: String,
    modelValue: {
      type: Object as PropType<UpdateUnitInput|CreateUnitInput>,
      required: true
    }
  },
  emits: ['submit', 'reset'],
  setup(props) {
    const model = reactive<UpdateUnitInput|CreateUnitInput>(props.modelValue);
    return {
      model
    };
  },
});
</script>
