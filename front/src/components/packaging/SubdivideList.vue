<template>
  <div
    v-if="(subdivided = subdivideToUnits(currentStock, units)).length"
    class="flex q-gutter-sm text-caption"
  >
    <span
      v-for="(unit, index) in units"
      :key="index"
    >
      {{subdivided[index] + ' ' + unit.label + (subdivided[index + 1] !== undefined ? ' - ': '') }}
    </span>
    <span class="text-brown">
      [{{currentStock}} {{units[units.length - 1].label}}]
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Unit } from '../../graphql/types';
import { subdivideToUnits } from '../../graphql/utils/utils';

export default defineComponent({
  name: 'SubdivideList',
  props: {
    units: {
      type: Array as PropType<Unit[]>,
      required: true
    },
    currentStock: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {
      subdivideToUnits
    }
  }
});
</script>

<style scoped>

</style>
