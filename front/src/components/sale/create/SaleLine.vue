<template>
  <td width="250">
    <PackagingInput
      borderless
      :is-q="false"
      :value="batch.medicine.currentSalePrice"
      :units="batch.medicine.packaging.units"
      @set-model="model.price = $event"
    />
  </td>
  <td>
    <q-input
      dense
      min="0"
      max="100"
      borderless
      hide-bottom-space
      :model-value="model.vat"
      v-model.number="model.vat"
      type="number"
    />
  </td>
  <td>
    <q-input
      dense
      min="0"
      max="100"
      borderless
      hide-bottom-space
      :model-value="model.discount"
      v-model.number="model.discount"
      type="number"
    />
  </td>
  <td :colspan="colspan||batch.medicine.packaging.units.length">
    <SubdivideInput
      :units="batch.medicine.packaging.units"
      :value="batch.currentStock"
      v-model="model.quantity"
    />
  </td>
  <td>
    <slot></slot>
  </td>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch } from 'vue';
import { Batch, SaleLineInput } from '../../../graphql/types';
import { getMedicineName } from '../../../graphql/utils/utils';
import PackagingInput from '../../packaging/PackagingInput.vue';
import SubdivideInput from '../../packaging/SubdivideInput.vue';

export default defineComponent({
  name: 'SaleLine',
  components: {PackagingInput, SubdivideInput},
  props: {
    batch: {
      type: Object as PropType<Batch>,
      required: true
    },
    modelValue: {
      type: Object as PropType<SaleLineInput>,
      default: () => ({})
    },
    colspan: Number
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = reactive<SaleLineInput>(props.modelValue);
    watch(model, mode => {
      emit('update:modelValue', mode);
    });
    return {
      getMedicineName,
      model
    }
  }
});
</script>

<style scoped>

</style>
