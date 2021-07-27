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
          <q-input
            :model-value="modelValue.designation"
            label="Désignation"
            v-model="modelValue.designation"
          >
            <template v-slot:append>
              <q-btn
                size="sm"
                @click="$emit('submit', modelValue)"
                round
                icon="save"
                flat color="primary"
              />
            </template>
          </q-input>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { UpdateMedicineInput } from '../../graphql/types';

export default defineComponent({
  name: 'MedicineOperations',
  props: {
    designation: { type: String, required: true },
    id: { type: Number, required: true }
  },
  emits: ['submit', 'delete'],
  setup(props) {
    return {
      modelValue: reactive<UpdateMedicineInput>({
        id: props.id,
        designation: props.designation
      })
    }
  }
});
</script>

<style scoped>

</style>
