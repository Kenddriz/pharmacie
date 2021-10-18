<template>
  <q-menu>
    <q-card style="min-width: 350px" class="text-blue-grey-14">
      <q-card-section class="q-pb-xs text-body1">Propriétés</q-card-section>
      <q-separator />
      <q-card-section horizontal>
        <q-list class="col">
          <q-item>
            <q-item-section>
              <q-item-label>
                Date de création
              </q-item-label>
              <q-item-label caption>
                {{formatDate(medicine.createdAt, 'DATE_TIME')}}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>
                Dernière mise à jour
              </q-item-label>
              <q-item-label caption>
                {{formatDate(medicine.updatedAt, 'DATE_TIME')}}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-separator vertical />
        <q-list dense padding class="col">
          <q-item>
            <q-item-section>
              <q-item-label>Quantité totale</q-item-label>
              <UnitConverter
                :units="medicine.packaging.units"
                :value="medicine.stockTotal"
                :is-q="true"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Prix de vente</q-item-label>
              <UnitConverter
                :units="medicine.packaging.units"
                :value="medicine.currentSalePrice"
                :is-q="false"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>TVA</q-item-label>
              <q-item-label caption>{{medicine.currentVat}}%</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Medicine } from '../../graphql/types';
import { formatDate } from '../../shared/date';
import UnitConverter from '../packaging/UnitConverter.vue';
export default defineComponent({
  name: 'MedicineDetails',
  components: { UnitConverter },
  props: {
    medicine: {
      type: Object as PropType<Medicine>,
      required: true
    }
  },
  setup() {
    return {
      formatDate
    }
  }
});
</script>

<style scoped>

</style>
