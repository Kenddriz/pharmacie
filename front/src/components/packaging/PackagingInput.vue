<template>
  <q-input
    hide-bottom-space
    borderless
    min="1"
    type="number"
    dense
    :model-value="modelValue"
    :disable="!units.length"
    v-model.number="modelValue"
    lazy-rules
    :rules="[ val => val > 0 || 'Entrer nombre strictement positif']"
    input-class="text-blue-grey-14"
  >
    <template v-slot:prepend>
      <q-btn color="positive" icon="info" dense flat>
        <q-menu style="width: fit-content" fit auto-close anchor="center middle" self="center middle">
          <q-item v-close-popup>
            <q-item-section v-for="(u, index) in units" :key="index">
              <q-item-label lines="1">{{u.label}}</q-item-label>
              <q-item-label caption>{{`${u.multiplicity} ${units[index + 1] ? ' = ' : ''}`}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
    </template>
    <template v-slot:append>
      <label v-if="!units.length" class="text-caption text-danger">
        Aucune unité disponible
      </label>
      <UnitConverter
        v-else
        :units="units"
        :value="modelValue"
        v-model:value="modelValue"
        @convert-lowest="$emit('set-model', $event)"
        :is-q="isQ"
        :show-value="false"
      />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Unit } from '../../graphql/types';
import UnitConverter from './UnitConverter.vue';

export default defineComponent({
  name: 'PackagingInput',
  components: { UnitConverter },
  props: {
    units: {
      type: Array as PropType<Unit[]>,
      default: () => ([])
    },
    value: {
      type: Number,
      default: 1
    },
    isQ: {
      type: Boolean,
      default: true
    },
  },
  emits: ['set-model'],
  setup(props) {
    return {
      modelValue:ref<number>(props.value)
    }
  }
});
</script>

<style scoped>

</style>
