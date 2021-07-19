<template>
  <q-card>
    <q-card-section class="text-subtitle1 text-bold q-pb-none text-center">
      {{title}}
    </q-card-section>
    <q-card-section class="q-gutter-sm q-pb-none">
      <CustomSelect
        :outlined="true"
        label="Unité minimale de vente utilisée"
        :options="min"
        v-model="model.unitId"
      />
      <q-card square flat bordered v-if="foundPath.length">
        <div class="flex flex-center text-white q-pa-sm bg-info">
          <span v-for="(item, index) in foundPath" :key="index">
           {{item.multiplicity}} {{item.label}} {{foundPath[index + 1] ? ' = ' : ''}}
          </span>
        </div>
        <div class="q-pt-sm q-pl-md">Quantité en stock [ {{model.stock}} ]</div>
        <div class="flex flex-center no-wrap q-gutter-sm q-pa-sm">
          <q-input
            type="number"
            min="0"
            v-for="(uPath, index) in foundPath" :key="index"
            input-style="width: 150px;"
            stack-label
            :model-value="prices.stock[index].value"
            v-model.number="prices.stock[index].value"
            :label="uPath.label"
            :suffix="`${foundPath[index + 1]? 'et' : ''}`"
          />
        </div>
        <div class="q-pt-sm q-pl-md">Quantité en magasin [ {{model.shop}} ]</div>
        <div class="flex flex-center no-wrap q-gutter-sm q-pa-sm">
          <q-input
            type="number"
            min="0"
            v-for="(uPath, index) in foundPath" :key="index"
            input-style="width: 150px;"
            stack-label
            :model-value="prices.shop[index].value"
            v-model.number="prices.shop[index].value"
            :label="uPath.label"
            :suffix="`${foundPath[index + 1]? 'et' : ''}`"
          />
        </div>
      </q-card>
      <q-input
        type="number"
        :model-value="model.price"
        v-model.number="model.price"
        dense
        outlined
        stack-label
        label="Prix"
      />
      <q-input
        type="number"
        :model-value="model.price"
        v-model.number="model.vat"
        dense
        outlined
        stack-label
        label="TVA"
      />
      <q-input
        type="text" mask="##/##/####"
        :model-value="model.expiration"
        v-model="model.expiration"
        dense
        outlined
        stack-label
        label="Date de péremption"
      />
    </q-card-section>
    <q-card-actions align="center">
      <q-btn no-caps label="Enregistrer les modifications" icon="save" @click="submit" />
      <q-btn no-caps label="Fermer" icon-right="close" @click="$emit('cancel')" />
    </q-card-actions>
    <q-card-section class="text-white text-subtitle1 q-pa-sm bg-info q-pt-none">
      Les quantités et le prix sont en fonction de l'unité minimale utilisée.
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch, ref } from 'vue';
import { Unit, UpdateMedicineFormInput } from '../../graphql/types';
import CustomSelect from '../shared/CustomSelect.vue';
type Price = {
  unitId: number;
  value: number;
}
export default defineComponent({
  name: 'MedicineUpdateForm',
  components: {CustomSelect},
  props: {
    min: {
      type: Array as PropType<Unit[]>,
      default: () => ([])
    },
    pathToChild: {
      type: Function,
      required: true
    },
    modelValue: {
      type: Object as PropType<UpdateMedicineFormInput>,
      required: true
    },
    title: String
  },
  emits: ['submit', 'cancel'],
  setup(props, {emit}) {
    const model = reactive<UpdateMedicineFormInput>(props.modelValue);
    const prices = reactive<{shop: Price[], stock: Price[]}>({
      shop: [],
      stock: []
    });
    const foundPath = ref<Unit[]>([]);
    const updateQuantity = () => {
      foundPath.value = props.pathToChild(props.modelValue.unitId);
      const size = foundPath.value.length;
      if(size > 0) {
        prices.shop.length = 0; prices.stock.length = 0;
        let qShop =  props.modelValue.shop;
        let qStock = props.modelValue.stock;
        const divisor = foundPath.value[size - 1].multiplicity;
        foundPath.value.forEach((unit ,index) => {
          /**For the last index, do not convert*/
          const cancelMultiplier = index + 1 === size && index > 1 ? foundPath.value[index - 1].multiplicity : 1;
          qShop *= unit.multiplicity;
          prices.shop.push({
            unitId: unit.id,
            value:  Math.floor(qShop/(divisor * cancelMultiplier))
          });
          qShop %= divisor;

          qStock *= unit.multiplicity;
          prices.stock.push({
            unitId: unit.id,
            value: Math.floor(qStock/(divisor * cancelMultiplier))
          });
          qStock %= divisor;
        })
      }
    }
    watch(() => props.modelValue.unitId, () => {updateQuantity();}, {immediate: true});
    const submit = () => {
      model.shop = 0; model.stock = 0;
      const Sm = foundPath.value[foundPath.value.length - 1].multiplicity;
      foundPath.value.forEach((unit, index) => {
        model.shop += prices.shop[index].value * Sm/(unit.multiplicity);
        model.stock += prices.stock[index].value * Sm/(unit.multiplicity);
      });
      updateQuantity(); emit('submit');
    }
    return { model, foundPath, prices, submit }
  }
});
</script>

<style scoped>

</style>
