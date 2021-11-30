<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="q-table__title q-mb-md">
      Lots
      <!--<q-btn class="q-ml-lg" round color="positive" size="xs" icon="add">
        <BatchForm
          :units="medicine.packaging.units"
          :medicine-id="medicine.id"
        />
      </q-btn>-->
    </div>
    <template  v-for="(batch, index) in medicine.batches" :key="index">
      <q-expansion-item v-if="(expiration = leftDays(batch.expirationDate)) !== undefined">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar size="sm" color="primary" text-color="white">
              {{ index }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            {{formatDate(batch.expirationDate, 'DATE_ONLY')}}
          </q-item-section>

          <q-item-section side>
            <q-icon name="star" :color="expiration > 7 ? 'positive' : 'red'" size="24px" />
          </q-item-section>
        </template>
        <q-card flat bordered>
          <q-card-section horizontal>
            <q-list class="col">
              <q-item>
                <q-item-section>
                  <q-item-label>Date d'ajout</q-item-label>
                  <q-item-label caption>{{formatDate(batch.createdAt, 'DATE_TIME')}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Jours restants</q-item-label>
                  <q-item-label caption>{{expiration}}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Quantité</q-item-label>
                  <UnitConverter
                    class="text-grey text-caption"
                    align="left"
                    :value="batch.currentStock"
                    :units="medicine.packaging.units"
                  />
                </q-item-section>
              </q-item>
            </q-list>
            <q-separator vertical />
            <q-card-actions vertical class="justify-around q-px-md">
              <q-btn
                align="left"
                color="primary"
                flat
                dense
                no-caps
                outline
                icon="inventory_2"
                label="Fiche de stock"
                @click="movementStock(index)"
              />
              <q-btn
                align="left"
                color="positive"
                flat
                dense
                no-caps
                outline
                icon="edit"
                label="Editer"
              >
                <BatchForm
                  :units="medicine.packaging.units"
                  :medicine-id="medicine.id"
                  :batch="batch"
                />
              </q-btn>
              <RemoveBatch @stock="movementStock(index)" :id="batch.id" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </template>
  </div>
</template>

<script lang="ts">
import BatchForm from './BatchForm.vue';
import { defineComponent, PropType } from 'vue';
import { Article, Medicine } from '../../graphql/types';
import { formatDate } from '../../shared/date';
import UnitConverter from '../packaging/UnitConverter.vue';
import { cloneDeep, leftDays } from '../../graphql/utils/utils';
import RemoveBatch from './RemoveBatch.vue';
import { useQuasar } from 'quasar';
import CardStock from '../medicine/CardStock.vue';

export default defineComponent({
  name: 'Batch',
  components: { BatchForm, UnitConverter, RemoveBatch },
  props: {
    medicine: {
      type: Object as PropType<Medicine>,
      required: true
    },
    article: {
      type: Object as PropType<Article>,
      required: true
    }
  },
  emits: ['stock'],
  setup(props) {
    const { dialog } = useQuasar();
    return {
      formatDate,
      leftDays,
      movementStock: (iB: number) => {
        const { batches, ...medicine } = cloneDeep(props.medicine);
        dialog({
          component: CardStock,
          componentProps: { medicine: {
              ...medicine,
              article: props.article
            }, batch: batches[iB] }
        });
      },
    }
  }
});
</script>

<style scoped>

</style>
