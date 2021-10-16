<template>
  <q-dialog maximized ref="dialogRef">
    <q-card>
      <q-card-section class="q-pb-none">
        <q-markup-table class="text-blue-grey-14" separator="cell" flat bordered>
          <thead>
            <tr>
              <th colspan="2">
                <div class="text-h4">FICHE DE STOCK</div>
              </th>
              <th colspan="4">
                <div class="row items-center">
                  <q-select
                    :model-value="stmInput.limit"
                    class="col-4"
                    outlined
                    v-model="stmInput.limit"
                    :options="[10, 15, 20, 25, 30, 40, 50, 60]"
                    label="Limite de lignes à afficher"
                  />
                  <q-space />
                  <q-btn size="sm" unelevated v-close-popup icon="close" color="red" round />
                </div>
              </th>
            </tr>
            <tr>
              <th colspan="3">
                Article : <span class="text-capitalize">{{medicine.article.commercialName}}</span>
                <template v-if="batch">
                  - Lot N°{{batch.id}}, Exp.{{formatDate(batch.expirationDate, 'DATE_ONLY')}}
                </template>
              </th>
              <th colspan="3">Dosage/Forme : {{medicine.dosage.label}}, {{medicine.form.label}}</th>
            </tr>
            <tr>
              <th colspan="3">Code: M{{medicine.id}}</th>
              <th colspan="3">
                Unités de conditionnement :
                {{medicine.packaging.units.map(u => u.label).join(' - ')}}
              </th>
            </tr>
            <tr>
              <th>DATE</th>
              <th>ORIGINE/DESTINATION</th>
              <th>ENTREE</th>
              <th>SORTIE</th>
              <th>STOCK</th>
              <th>PEREMPTION</th>
            </tr>
          </thead>
          <tbody>
            <tr class="q-tr--no-hover" v-for="stm in stockMovements.items" :key="stm.id">
              <template v-if="stm.invoice">
                <td>{{formatDate(stm.invoice?.createdAt, 'DATE_TIME')}}</td>
                <td>{{stm.invoice.command.provider.name}}</td>
                <td>
                  <SubdivideList
                    :units="medicine.packaging.units"
                    :current-stock="stm.quantity"
                  />
                </td>
                <td></td>
              </template>
              <template v-else>
                <td>{{formatDate(stm.sale?.createdAt, 'DATE_TIME')}}</td>
                <td>
                  <template v-if="patient = stm.sale?.prescription?.patient">
                    {{patient.name}} - {{patient.phone}}
                  </template>
                  <template v-else>
                    Divers
                  </template>
                </td>
                <td></td>
                <td>
                  <SubdivideList
                    :units="medicine.packaging.units"
                    :current-stock="stm.quantity"
                  />
                </td>
              </template>
              <td>
                <SubdivideList
                  :units="medicine.packaging.units"
                  :current-stock="stm.stock"
                />
              </td>
              <td>{{formatDate(stm.batch.expirationDate, 'DATE_ONLY')}}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
      <q-card-actions align="center">
        <q-pagination
          outline
          :disable="stockMovements.meta.totalPages <= 1"
          :model-value="stmInput.page"
          v-model="stmInput.page"
          :max="stockMovements.meta.totalPages"
          input
        />
      </q-card-actions>
      <q-separator inset />
      <q-card-section class="flex-center flex q-gutter-md">
        <q-card
          v-for="(key, index) in Object.keys($tm('meta'))"
          class="q-pa-md column items-center"
          bordered
          flat
          :key="index"
        >
          <span class="text-bold">{{$tm(`meta.${key}`)}}</span>
          <q-separator class="full-width q-mt-sm" />
          <span class="q-mt-sm">{{stockMovements.meta[key]}}</span>
        </q-card>
      </q-card-section>
      <q-inner-loading :showing="loading">
        <q-spinner-orbit color="warning" size="80px" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { usePaginateStockMovement } from '../../graphql/stock-movement/stock-mvt.service';
import { Batch, Medicine } from '../../graphql/types';
import { useDialogPluginComponent } from 'quasar';
import { formatDate } from '../../shared/date';
import SubdivideList from '../packaging/SubdivideList.vue';

export default defineComponent({
  name: 'stockMovement',
  components: { SubdivideList },
  props: {
    medicine: {
      type: Object as PropType<Medicine>,
      required: true
    },
    batch: Object as PropType<Batch>
  },
  setup (props) {
    const { dialogRef } = useDialogPluginComponent();
    return {
      ...usePaginateStockMovement(props.medicine.id, props?.batch?.id||-1),
      dialogRef,
      formatDate
    }
  }
});
</script>

<style lang="scss" scoped>
  th {
    font-weight: bolder;
  }
  td {
    text-align: center;
  }
</style>
