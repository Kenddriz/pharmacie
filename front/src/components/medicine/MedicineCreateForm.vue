<template>
  <q-card flat square bordered>
    <q-card-section class="text-subtitle1 text-bold q-pb-none">{{ title }}</q-card-section>
    <q-card-section class="q-gutter-sm">
      <CustomSelect
        :outlined="true"
        :useInput="false"
        label="Forme médicinale"
        v-model="model.formId"
        :options="forms"
      />
      <CustomSelect
        :outlined="true"
        :useInput="false"
        label="unité minimale"
        :options="units"
        v-model="model.unitId"
      />
      <!--<q-input type="number" label="Prix unitaire de vente"
         v-model.number="usedUnit.price" dense stack-label min="0"
         :suffix="`/${findUnit(usedUnit.unit)?.label || '?'}`"
      />-->
      <q-card square bordered flat>
        <div class="q-pt-sm q-pl-md">Quantités [ {{quantity}} ]</div>
        <div class="flex flex-center no-wrap q-gutter-sm q-pa-sm">
          <q-input
            type="number"
            min="0"
            v-for="(uPath, index) in foundPath" :key="index"
            input-style="width: 150px;"
            stack-label
            :model-value="uPath.quantity"
            v-model.number="uPath.quantity"
            :label="uPath.label"
            :suffix="`${foundPath[index + 1]? 'et' : ''}`"
          />
        </div>
      </q-card>
      <q-input
        outlined
        type="number"
        label="Prix unitaire"
        v-model.number="model.price"
        :model-value="model.price"
        dense stack-label
      />
      <q-input
        outlined
        type="number"
        label="TVA"
        v-model.number="model.vat"
        :model-value="model.vat"
        dense stack-label
        suffix="%"
      />
      <q-input
        outlined
        type="text"
        mask="##/##/####"
        label="Date d'expiration"
        v-model="model.expiration"
        :model-value="model.expiration"
        dense stack-label
      />
    </q-card-section>
    <q-card-actions align="center">
        <q-btn no-caps flat label="Ajout" icon="add" @click="submit" />
        <q-btn no-caps flat label="Annuler" icon-right="close" @click="$emit('cancel')" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch, computed } from 'vue';
import { CreateMedicineFormInput, Form, Unit } from '../../graphql/types';
import CustomSelect from '../shared/CustomSelect.vue';

type FoundPath = Unit & {quantity: number};
export default defineComponent({
  name: 'MedicineCreateForm',
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
      type: Array as PropType<Unit[]>,
      default: () => ([])
    },
    pathToChild: {
      type: Function,
      required: true
    },
    title: String
  },
  emits: ['submit', 'cancel'],
  setup(props, {emit}) {
    const model = reactive<CreateMedicineFormInput>(props.modelValue);
    Object.assign(model, {formId: props.forms[0].id, unitId: props.units[0].id});
    const foundPath = ref<FoundPath[]>([]);
    watch(() => props.modelValue.unitId, id => {
      const prevFoundPath:FoundPath[] = [...foundPath.value];
      foundPath.value.length = 0;
      (props.pathToChild(id) as Unit[]).forEach(unit => {
        foundPath.value.push({
          ...unit,
          quantity: prevFoundPath.find(u => u.id === unit.id)?.quantity||0
        })
      });
    }, {immediate: true});
    const quantity = computed(() => {
      const size = foundPath.value.length - 1;
      let q = 0;
      foundPath.value.forEach((u, index) => {
        q += size > index ? (u.quantity * foundPath.value[size].multiplicity)/u.multiplicity : u.quantity;
      });
      return q;
    });
    const submit = () => {
      model.quantity = quantity.value;
      emit('submit');
    }
    return {
      model,
      foundPath,
      submit,
      quantity
    }
  }
});
</script>

<style scoped>

</style>
