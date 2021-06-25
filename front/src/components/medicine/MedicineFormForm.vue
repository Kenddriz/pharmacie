<template>
  <q-card flat square bordered>
    <q-card-section class="text-subtitle1 text-bold q-pb-none">{{ title }}</q-card-section>
    <q-card-section class="q-gutter-sm">
      <CustomSelect
        :borderless="false"
        :useInput="false"
        label="Forme médicinale"
        v-model="model.formId"
        :options="forms"
      />
      <CustomSelect
        :borderless="false"
        :useInput="false"
        label="unité minimale"
        :options="units"
        v-model="model.unitId"
      />
      <q-input type="number" label="Quantité"
        v-model.number="usedUnit.quantity" dense stack-label min="0"
      >
        <template v-slot:append>
          <CustomSelect
            :useInput="false"
            label="unité"
            :options="pathToChild(model.unitId)"
            v-model="usedUnit.unit"
          />
        </template>
      </q-input>

      <q-input type="number" label="Prix unitaire de vente"
         v-model.number="usedUnit.price" dense stack-label min="0"
         :suffix="`/${findUnit(usedUnit.unit)?.label || '?'}`"
      />
      <q-input type="text" mask="##/##/####" label="Date d'expiration"
         v-model="model.expiration"
         dense stack-label
      />
    </q-card-section>
    <q-card-actions align="center">
        <q-btn no-caps flat label="Ajout" icon="add" @click="setPrice" />
        <q-btn no-caps flat label="Annuler" icon-right="close" @click="$emit('cancel')" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { CreateMedicineFormInput, Form, Unit } from '../../graphql/types';
import CustomSelect from '../shared/CustomSelect.vue';

export default defineComponent({
  name: 'MedicineFormForm',
  components: {CustomSelect},
  props: {
    modelValue: {
      type: Object as PropType<CreateMedicineFormInput>,
      required: true
    },
    forms: {
      type: Array as PropType<Form[]>,
      default: () => ([])
    },
    units: {
      type: Array as PropType<Unit[] >,
      default: () => ([])
    },
    pathToChild: Function,
    findUnit: {type: Function, required: true},
    getProportion: {type: Function, required: true},
    title: String
  },
  emits: ['submit', 'cancel'],
  setup(props, {emit}) {
    const model = reactive<CreateMedicineFormInput>(props.modelValue);
    model.formId = props.forms[0]?.id||0;
    model.unitId = props.units[0]?.id||0;
    const usedUnit = reactive({ unit: model.unitId, price: model.price, quantity: model.quantity });

    return {
      model,
      usedUnit,
      setPrice: () => {
        const proportion = props.getProportion(model.unitId, usedUnit.unit)
        model.quantity = usedUnit.quantity * proportion.quantity;
        model.price = usedUnit.price * proportion.price;
        emit('submit');
      }
    }
  }
});
</script>

<style scoped>

</style>
