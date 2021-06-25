<template>
  <q-btn dense flat round color="positive" icon="more_vert">
    <q-menu anchor="center middle" self="center middle">
      <q-list separator padding dense>
        <q-item clickable v-close-popup>
          <q-item-section>
            <q-icon name="delete" color="warning" size="sm" />
          </q-item-section>
          <q-item-section>Supprimer</q-item-section>
        </q-item>

        <q-item>
          <q-input :model-value="designation" label="Désignation">
            <template v-slot:append>
              <q-btn size="sm" round icon="save" flat color="primary" />
            </template>
          </q-input>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MedicineOperations',
  props: {
    id: Number,
    designation: String
  }
});
</script>

<style scoped>

</style>
