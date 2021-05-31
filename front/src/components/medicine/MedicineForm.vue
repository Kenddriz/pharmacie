<template>
  <q-card flat bordered class="q-pa-md">
    <q-toolbar-title align="center">
      Forme : {{ formLabel }}
    </q-toolbar-title>
    <q-separator spaced />
    <q-card-section horizontal class="q-gutter-md q-mt-md justify-center">

      <CustomSelect
        style="background: whitesmoke; max-width: 250px"
        class="q-pr-md q-pl-md"
        v-model:modelValue="model.unitId"
        :options="minUnitOptions"
        label="Unité minimale de vente"
      />

      <q-input
        v-model="model.vat"
        :model-value="model.vat"
        outlined
        label="TVA"
        stack-label
        suffix="%"
      />
    </q-card-section>

    <q-separator inset class="q-ma-lg"/>

    <q-card-section horizontal class="q-gutter-md">
      <q-input type="number" outlined v-model="model.quantity" label="Quantité"/>

      <CustomSelect
        style="max-width: 220px; background: whitesmoke;"
        class="q-pr-md q-pl-md"
        v-model:modelValue="refOptionsModel"
        :options="refOptions"
        label="En"
      />

      <q-input type="number" outlined  v-model="model.price" label="Prix unitaire"/>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { CreateMedicineFormInput, Unit } from '../../graphql/types';
import CustomSelect from '../shared/CustomSelect.vue';

export default defineComponent({
  name: 'MedicineForm',
  props: {
    minUnitOptions: {
      type: Array as PropType<Unit[]>,
      required: true
    },
    refOptions: {
      type: Array as PropType<Unit[]>,
      required: true
    },
    modelValue: {
      type: Object as PropType<CreateMedicineFormInput>,
      required: true
    },
    formLabel: String
  },
  components: {
    CustomSelect
  },
  setup(props) {
    const model = ref<CreateMedicineFormInput>(props.modelValue);
    model.value.unitId = props.minUnitOptions[0]?.id || 1;
    const refOptionsModel = ref<number>( 1);
    return {
      model,
      refOptionsModel
    }
  }
});
</script>

<style scoped>

</style>
