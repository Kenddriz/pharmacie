<template>
  <q-card-section class="q-pb-sm text-weight-bold row">
    <slot></slot> <q-space />
    <q-btn size="xs" v-close-popup unelevated dense color="red" icon="close" />
  </q-card-section>
  <q-separator />
  <q-list class="q-gutter-sm" dense padding style="min-width: 250px">
    <FormList
      :forms="forms"
      :selected="selectedForm"
      @selected="Object.assign(selectedForm, $event)"
    />
    <DosageList
      :dosages="dosages"
      :selected="selectedDosage"
      @selected="Object.assign(selectedDosage, $event)"
    />
    <PackagingList
      :packaging="packaging"
      :selected="selectedPk"
      @selected="Object.assign(selectedPk, $event)"
    />
    <q-item>
      <PackagingInput
        label="Prix unitaire de vente"
        outlined
        :units="selectedPk.units"
        :value="mPrice"
        @set-model="mPrice = $event"
        :is-q="false"
      />
    </q-item>

    <q-item>
      <q-input
        type="number"
        :min="0"
        :model-value="mVat"
        v-model.number="mVat"
        dense
        outlined
        stack-label
        label="TVA"
        suffix="%"
        input-class="text-blue-grey-14"
        class="full-width"
      />
    </q-item>
  </q-list>
  <q-card-actions class="q-pb-md q-mx-sm">
    <q-btn
      :disable="!(selectedPk && selectedDosage && selectedForm)"
      v-close-popup
      class="full-width"
      color="primary"
      no-caps
      rounded
      outline
      dense
      label="Enregistrer"
      @click="$emit('submit', formInput())"
    />
  </q-card-actions>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import FormList from '../form/FormList.vue';
import DosageList from '../dosage/DosageList.vue';
import PackagingList from '../packaging/PackagingList.vue';
import { Form, MedicineFormInput, Packaging } from '../../graphql/types';
import { DosageItem } from '../../graphql/dosage/dosage.service';
import PackagingInput from '../packaging/PackagingInput.vue';

export default defineComponent({
  name: 'MedicineForm',
  components: {  FormList, DosageList, PackagingList, PackagingInput },
  props: {
    forms: {
      type: Array as PropType<Form[]>,
      required: true
    },
    selectedForm: {
      type: Object as PropType<Form>,
      required: true
    },
    dosages: {
      type: Array as PropType<DosageItem[]>,
      required: true
    },
    selectedDosage: {
      type: Object as PropType<DosageItem>,
      required: true
    },
    packaging: {
      type: Array as PropType<Packaging[]>,
      required: true
    },
    selectedPk: {
      type: Object as PropType<Packaging>,
      required: true
    },
    price: {
      type: Number,
      default: 0
    },
    vat: {
      type: Number,
      default: 0
    }
  },
  emits: ['submit'],
  setup(props) {
    const mPrice = ref<number>(props.price);
    const mVat = ref<number>(props.vat);
    return {
      mPrice,
      mVat,
      formInput: function(): MedicineFormInput {
        return {
          formId: props.selectedForm.id,
          dosageId: props.selectedDosage.id,
          packagingId: props.selectedPk.id,
          currentSalePrice: mPrice.value,
          currentVat: mVat.value
        }
      }
    }
  }
});
</script>

<style scoped>

</style>
