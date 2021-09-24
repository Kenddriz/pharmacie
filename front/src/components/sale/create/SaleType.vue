<template>
  <q-card flat square bordered class="text-blue-grey-14">
    <q-card-section class="q-pb-none" style="font-size: 16px">
      Type de vente [{{saleType === 'free' ? 'Libre' : 'Avec ordonnance'}}]
    </q-card-section>
    <q-card-actions class="q-gutter-md" align="center">
      <q-radio
        :model-value="saleType"
        val="free"
        label="Libre"
        @update:model-value="$refs['typeMenu'].hide(); $emit('update:saleType', $event)"
      />
      <q-radio
        :model-value="saleType"
        val="prescription"
        label=" Avec ordonnance"
        @update:model-value="$emit('update:saleType', $event)"
      >
        <q-menu ref="typeMenu" fit persistent>
          <q-card class="q-pb-md">
            <q-item-label class="q-pb-none row justify-between items-center" header>
              Informations d'ordonnance
              <q-btn
                flat
                dense
                round
                icon="close"
                color="deep-orange"
                v-close-popup
              />
            </q-item-label>
            <PrescriptionForm v-model="model" />
          </q-card>
        </q-menu>
      </q-radio>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { PrescriptionInput } from '../../../graphql/types';
import PrescriptionForm from '../../prescription/PrescriptionForm.vue';

export default defineComponent({
  name: 'SaleType',
  components: { PrescriptionForm },
  props: {
    modelValue: {
      type: Object as PropType<PrescriptionInput>,
      default: null
    },
    saleType: {
      type: String,
      default: ''
    }
  },
  emits: ['update:saleType'],
  setup (props) {
    return {
      model: ref<PrescriptionInput>(props.modelValue)
    }
  }
});
</script>

<style scoped>

</style>
