<template>
  <q-btn
    flat
    dense
    :label="(showValue ? modelValue : '') + (isQ ? ' ' : 'Ar/') + units[suIndex]?.label"
    icon-right="expand_more"
    no-caps
    style="font-size: 12px; margin-left: -4px"
    class="text-caption text-blue-grey-14"
    align="left"
  >
    <q-menu ref="uc">
      <q-list dense padding>
        <q-item
          v-for="(u, index) in units"
          :key="index"
          clickable
          :active="index === suIndex"
          active-class="text-positive"
          @click="selectUnit(index); $refs['uc'].hide()"
        >
          <q-item-section>{{u.label}}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { Unit } from '../../graphql/types';
import { convertValue } from '../../graphql/utils/utils';

export default defineComponent({
  name: 'UnitConverter',
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
    showValue: {
      type: Boolean,
      default: true
    }
  },
  emits: ['convert-lowest', 'update:value'],
  setup(props, {emit}) {
    const suIndex = ref<number>(0);/**Selected unit index*/
    const modelValue = ref<number>(props.value);
    function getModel(watching = false) { /**To convert to lowest unit**/
      const size = props.units.length;
      if(size) {
        if(watching)suIndex.value = size - 1;/**Only reset selected on watching**/
        emit('convert-lowest', convertValue(modelValue.value, suIndex.value, size - 1, props.units, props.isQ));
      }
    }
    watch(() => props.units, () => {
      getModel(true);
    }, { immediate: true });

    watch(() => props.value, (value) => {
      modelValue.value = value;
      getModel();
    });

    return {
      suIndex,
      modelValue,
      selectUnit: function(newIndex: number) {
        modelValue.value = convertValue(modelValue.value, suIndex.value, newIndex, props.units, props.isQ);
        emit('update:value', modelValue.value);
        suIndex.value = newIndex;
        getModel();
      }
    }
  }
});
</script>

<style scoped>

</style>
