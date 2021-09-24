<template>
  <div class="flex no-wrap">
    <q-input
      v-for="(val, index) in model" :key="index"
      :label="units[index].label"
      type="number"
      :disable="initial[index] === 0 && index < model.length - 1"
      :model-value="val"
      @update:model-value="model[index] = $event < 0 ? 0 : $event"
      hide-bottom-space
      borderless
      dense
      input-class="text-blue-grey-14"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { Unit } from '../../graphql/types';
import { convertValue, subdivideToUnits } from '../../graphql/utils/utils';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'SubdivideInput',
  props: {
    units: {
      type: Array as PropType<Unit[]>,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    modelValue: {
      type: Number,
      default: 0
    },
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const { notify } = useQuasar();
    const model = ref<number[]>([]);
    const initial = ref<number[]>([]);
    watch(() => props.units, units => {
      initial.value = subdivideToUnits(props.value, units);
      model.value = subdivideToUnits(props.modelValue, units);
    }, { immediate: true })
    watch<number[]>(() => [...model.value], (mode) => {
      let s = 0;
      const lastIndex = mode.length - 1;
      mode.forEach((value, index) => {
        s += convertValue(value, index, lastIndex, props.units, true);
      });
      if(s <= props.value)emit('update:modelValue', s);
      else {
        const lab = props.units[lastIndex].label;
        notify({
          group: 'available',
          icon: 'production_quantity_limits',
          position: 'right',
          message: 'Qantité disponible insuffisante!',
          caption: `Entrée : ${s}${lab}, Disponible : ${props.value}${lab}`,
          color: 'red',
          timeout: 1500
        });
      }
    });
    return {
      model,
      initial
    }
  }
});
</script>

<style scoped>

</style>
