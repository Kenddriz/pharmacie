<template>
  <q-splitter
    :model-value="insideModel"
    v-model="insideModel"
    style="height: 81vh"
  >
    <template v-slot:before>
      <div class="q-pa-md">
        <q-linear-progress
          v-if="srmLoading||cmLoading||umLoading||listLoading"
          indeterminate
          color="warning"
          class="q-mb-md"
        />
        <div class="q-table__title q-mb-md">
          Formes et dosages
          <q-btn
            class="q-ml-lg"
            round
            color="positive"
            size="xs"
            icon="add"
          >
            <q-menu>
              <MedicineForm
                :forms="forms"
                :selectedForm="selectedForm"
                :dosages="dosages"
                :selectedDosage="selectedDosage"
                :packaging="packagingList"
                :selectedPk="selectedPk"
                @submit="createMedicine(article.id, $event)"
              >
                Nouveau médicament
              </MedicineForm>
            </q-menu>
          </q-btn>
        </div>
        <div class="flex justify-between wrap q-gutter-md">
          <q-card
            flat
            bordered
            v-for="med in article.medicines||[]"
            :key="med.id"
            :class="selected[0].id === med.id ? 'bg-brown-1' : ''"
          >
            <q-list dense>
              <q-item class="q-mt-sm">
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
                    class="text-dark text-caption text-brown"
                    align="left"
                    :units="med.packaging.units"
                    :value="med.currentSalePrice"
                    :is-q="false"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-avatar size="sm" color="primary" text-color="white">
                    T
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>TVA</q-item-label>
                  <q-item-label caption>{{med.currentVat}}%</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-separator />
            <q-card-actions align="around">
              <q-btn
                icon="read_more"
                :color="selected[0].id === med.id ? 'positive': 'secondary'"
                flat
                @click="selected = [med]"
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
                color="primary"
                flat
              />
              <q-btn
                color="brown"
                flat
                @click="movementStock(med)"
              >
                <q-icon size="xs" name="inventory_2" />
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </template>
    <template v-slot:separator>
      <q-avatar color="amber" text-color="white" size="lg" icon="drag_indicator" />
    </template>
    <template v-slot:after>
      <Batch
        v-if="selected.length"
        :medicine="selected[0]"
      />
    </template>
    <!--update dialog --->
    <q-dialog v-model="updateDialog.show">
      <q-card>
        <q-card-section class="q-pa-none">
          <MedicineForm
            :forms="forms"
            :selectedForm="selectedForm"
            :dosages="dosages"
            :selectedDosage="selectedDosage"
            :packaging="packagingList"
            :selectedPk="selectedPk"
            :price="updateDialog.price"
            :vat="updateDialog.vat"
            @submit="updateMedicine($event)"
          >
            Mise à jour
          </MedicineForm>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-splitter>
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
import Batch from '../batch/Batch.vue';
import CardStock from './CardStock.vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'Medicine',
  components: { MedicineForm, UnitConverter, Batch },
  props: {
    article: {
      type: Object as PropType<Article>,
      default: () => ({}),
    }
  },
  setup(props) {
    const selected = ref<Medicine[]>([]);
    watch(() => props.article, (article) => {
      if(article?.medicines && article?.medicines?.length) {
        const med = article.medicines.find(m => m.id === selected.value[0]?.id) || article.medicines[0];
        selected.value = med ? [med] : [];
      }
      else selected.value.length = 0;
    }, { immediate: true });
    const {dialog} = useQuasar();
    return {
      ...useForms(),
      ...useDosages(),
      ...useListPackaging(),
      ...useCreateMedicine(),
      ...useUpdateMedicine(),
      ...useSoftRemoveMedicine(),
      selected,
      insideModel: ref(50),
      movementStock: (medicine: Medicine) => {
        dialog({
          component: CardStock,
          componentProps: { medicine: { ...medicine, article: props.article } }
        });
      }
    }
  },
  methods: {
    setSelected(med: Medicine) {
      Object.assign(this.selectedForm, med.form);
      Object.assign(this.selectedPk, med.packaging);
      Object.assign(this.selectedDosage, med.dosage);
      this.updateDialog.show = true;
      this.updateDialog.id = med.id;
      this.updateDialog.price = med.currentSalePrice;
      this.updateDialog.vat = med.currentVat;
    }
  }
});
</script>

<style lang="sass">

</style>
