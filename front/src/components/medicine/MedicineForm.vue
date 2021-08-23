<template>
  <q-form class="q-pa-md" style="min-width: 250px">
    <q-list dense>
      <slot name="form"></slot>
      <slot name="dosage"></slot>
      <slot name="packaging"></slot>

    </q-list>

    <div class="row justify-between q-mt-sm items-center">
      <q-btn
        type="submit"
        no-caps
        rounded
        outline
        :color="mode === 'update' ? 'white' : 'primary'"
        dense
        label="Enregistrer"
        class="q-pr-md q-pl-md"
      />
      <q-btn
        v-if="mode === 'update'"
        no-caps
        rounded
        outline
        color="warning"
        dense
        class="q-pr-md q-pl-md"
        label="supprimer"
      />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MedicineForm',
  props: {
    mode: {
      type: String,
      default: 'add'
    },
  },
  emits: ['submit']
});
</script>

<style scoped>

</style>
