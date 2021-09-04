<template>
  <div class="q-pa-md">
    <q-linear-progress
      v-if="srmLoading||cmLoading||umLoading||listLoading"
      indeterminate
      color="warning"
      class="q-mb-md"
    />
    <div class="q-table__title q-mb-md">
      Formes et dosages [
      <span class="text-secondary text-capitalize text-body1">
        Article : {{article.commercialName||'Aucun'}}
      </span>
      ]
      <q-btn v-if="article" class="q-ml-lg" round color="positive" size="sm" glossy icon="add">
        <q-menu>
          <MedicineForm
            :forms="forms"
            :selectedForm="selectedForm"
            :dosages="dosages"
            :selectedDosage="selectedDosage"
            :packaging="packagingList"
            :selectedPk="selectedPk"
            :articleId="article.id"
            @submit="createMedicine"
          >
          </MedicineForm>
        </q-menu>
      </q-btn>
    </div>
    <div class="flex flex-center wrap q-gutter-md">
      <q-card
        bordered
        v-for="med in article?.medicines||[]"
        :key="med.id"
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar size="sm" color="primary" text-color="white">
              M
            </q-avatar>
          </q-item-section>
          <q-item-section>
            {{med.form.label}} {{med.dosage.label}}
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="sm" color="primary" text-color="white">
              P
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Prix de vente</q-item-label>
            <UnitConverter
              :units="med.packaging.units"
              :value="med.currentSalePrice"
              :is-q="false"
            />
          </q-item-section>
        </q-item>
        <q-card-actions align="around">
          <q-btn
            icon="read_more"
            :color="selectedMedicine?.id === med.id ? 'positive': 'secondary'"
            flat
          />
          <q-btn
            @click="softRemoveMedicine(article.id, med.id)"
            icon="delete_sweep"
            color="deep-orange"
            flat
          />
          <q-btn
            icon="edit"
            @click="setSelected(med)"
            color="positive"
            flat
            />
        </q-card-actions>
      </q-card>
    </div>
  </div>
  <q-dialog v-model="updateDialog">
    <q-card>
      <q-bar class="bg-primary text-white">
        <q-icon @click="softRemoveMedicine(article.id, selectedMedicine?.id)" class="cursor-pointer" name="delete_sweep" />
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Fermer</q-tooltip>
        </q-btn>
      </q-bar>
      <MedicineForm
        :forms="forms"
        :selectedForm="selectedForm"
        :dosages="dosages"
        :selectedDosage="selectedDosage"
        :packaging="packagingList"
        :selectedPk="selectedPk"
        :articleId="article.id"
        :price="selectedMedicine?.currentSalePrice"
        :vat="selectedMedicine?.currentVat"
        @submit="updateMedicine(selectedMedicine?.id,$event)"
      >
      </MedicineForm>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { Article, Medicine } from '../../graphql/types';
import { useForms } from '../../graphql/form/form.service';
import { useDosages } from '../../graphql/dosage/dosage.service';
import { useListPackaging } from '../../graphql/packaging/packaging.service';
import { useCreateMedicine, useUpdateMedicine, useSoftRemoveMedicine } from '../../graphql/medicine/medicine.service';
import MedicineForm from './MedicineForm.vue';
import UnitConverter from '../packaging/UnitConverter.vue';

export default defineComponent({
  name: 'Medicine',
  components: { MedicineForm, UnitConverter },
  props: {
    article: {
      type: Object as PropType<Article>,
      default: () => ({}),
    }
  },
  emits: ['edit', 'update:selected'],
  setup(props) {
    const selectedMedicine = ref<Medicine|null>(null);
    watch(() => props.article, (article) => {
      if(article.medicines && article.medicines.length)
        selectedMedicine.value = article.medicines[0];
    }, { immediate: true });

    return {
      ...useForms(),
      ...useDosages(),
      ...useListPackaging(),
      ...useCreateMedicine(),
      ...useUpdateMedicine(),
      ...useSoftRemoveMedicine(),
      selectedMedicine
    }
  },
  methods: {
    setSelected(med: Medicine) {
      Object.assign(this.selectedForm, med.form);
      Object.assign(this.selectedPk, med.packaging);
      Object.assign(this.selectedDosage, med.dosage);
      this.selectedMedicine = med;
      this.updateDialog = true;
    }
  }
});
</script>

<style lang="sass">
.sticky-header-table
  /* height or max-height is important */
  max-height: 100%
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
