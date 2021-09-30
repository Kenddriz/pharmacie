<template>
  <q-card flat bordered style="border-left: unset" square class="full-height text-blue-grey-14">
    <q-card-section horizontal>
      <template  v-if="selectedSale.length">
        <ScrollArea class="col-12 col-md-8 q-pa-sm" :style="`height:${$q.screen.height - 112}px;`">
          <UpdatePrescription :sale-id="selectedSale[0].id" :prescription="selectedSale[0].prescription" />
          <TableUpdateSale :sale="selectedSale[0]" />
        </ScrollArea>
        <q-separator vertical />
      </template>
      <q-card-section class="col">
        <div class="text-h6 text-center">Liste de ventes</div>
        <q-separator />
        <ScrollArea :style="`height: ${$q.screen.height - 200}px`">
          <q-item
            clickable
            v-ripple v-for="(sale, i) in sales.items"
            :key="i"
            @click="selectSale(i);"
            :active="sale.id === selectedSale[0].id"
            :active-class="sale.id === selectedSale[0].id ? 'bg-brown-1' : ''"
          >
            <template v-if="prescription = getType(sale.prescription)">
              <q-item-section avatar>
                <q-avatar size="sm" color="primary" text-color="white">
                  {{prescription[0]}}
                </q-avatar>
              </q-item-section>
              <q-item-section>{{prescription[1]}}</q-item-section>
            </template>
            <q-item-section>{{formatDate(sale.createdAt, 'DATE_ONLY')}}</q-item-section>
            <q-item-section v-if="(size = sale.stockMovements.length)!==undefined" top side>
              {{size}} ligne{{size > 1 ? 's' : ''}}
            </q-item-section>
          </q-item>
          <q-inner-loading
            class="text-blue-grey-14 text-h6"
            color="white"
            :showing="!sales.items.length && !psLoading"
          >
            <q-img width="300px" src="no-sale.svg" />
            <div class="row items-center">
              Aucune vente effectuée !
              <q-chip
                clickable
                icon="add"
                outline
                color="primary"
                label="En ajouter"
                @click="$emit('add')"
              />
            </div>
          </q-inner-loading>
          <q-inner-loading :showing="psLoading">
            <q-spinner-ball size="80px" color="primary" />
          </q-inner-loading>
        </ScrollArea>
        <q-separator />
        <q-card-actions align="center">
          <q-pagination
            v-if="sales.meta.totalPages > 1"
            :model-value="paginationInput.page"
            flat
            v-model="paginationInput.page"
            color="primary"
            :max="sales.meta.totalPages"
            :max-pages="10"
            boundary-numbers
          />
        </q-card-actions>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePaginateSales } from '../../../graphql/sale/sale.service';
import { formatDate } from '../../../shared/date';
import ScrollArea from '../../shared/ScrollArea.vue';
import UpdatePrescription from '../../prescription/UpdatePrescription.vue';
import TableUpdateSale from './TableUpdateSale.vue'

export default defineComponent({
  name: 'SaleStory',
  components: { ScrollArea, UpdatePrescription, TableUpdateSale },
  emits: ['add'],
  setup() {
    return {
      ...usePaginateSales(),
      formatDate,
      getType: (prescription: any) => {
        return prescription ? ['O', 'Avec ordonnance'] : ['L', 'Libre'];
      }
    }
  }
});
</script>

<style scoped>

</style>
