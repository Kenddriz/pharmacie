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
      <q-btn color="primary" size="12px" icon="more_vert" dense flat>
        <q-menu style="width: fit-content" fit auto-close anchor="center middle" self="center middle">
          <q-item v-close-popup class="flex flex-center no-wrap">
            <span class="row items-center" v-for="(u, index) in units" :key="index">
              <span>
                <div>{{u.label}}</div>
                <div>{{u.multiplicity}}</div>
              </span>
              <span v-if="units[index + 1]" class="q-mx-md">=</span>
            </span>
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
