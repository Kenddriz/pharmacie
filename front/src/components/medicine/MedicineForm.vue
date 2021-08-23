<template>
  <q-list dense padding style="min-width: 250px">
    <FormList
      :forms="forms"
      :selected="selectedForm"
      @selected="$emit('selectedForm', $event)"
    />
    <DosageList
      :dosages="dosages"
      :selected="selectedDosage"
      @selected="$emit('selectedDosage', $event)"
    />
    <PackagingList
      :packaging="packaging"
      :selected="selectedPk"
      @selected="$emit('selectedPk', $event)"
    />
  </q-list>
  <q-btn
    class="q-ma-sm q-pl-sm q-pr-sm"
    color="primary"
    no-caps
    rounded
    outline
    dense
    label="Enregistrer"
    @click="$emit('submit', [selectedForm.id, selectedDosage.id, selectedPk.id])"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import FormList from '../form/FormList.vue';
import DosageList from '../dosage/DosageList.vue';
import PackagingList from '../packaging/PackagingList.vue';
import { Form, Packaging } from '../../graphql/types';
import { DosageItem } from '../../graphql/dosage/dosage.service';

export default defineComponent({
  name: 'MedicineForm',
  components: {  FormList, DosageList, PackagingList },
  props: {
    forms: Array as PropType<Form[]>,
    selectedForm: Object as PropType<Form>,
    dosages: Array as PropType<DosageItem[]>,
    selectedDosage: Object as PropType<DosageItem>,
    packaging: Array as PropType<Packaging[]>,
    selectedPk: Object as PropType<Packaging>,
    mode: {
      type: String,
      default: 'add'
    },
  },
  emits: ['selectedForm', 'selectedDosage', 'selectedPk', 'submit']
});
</script>

<style scoped>

</style>
