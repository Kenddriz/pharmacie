<template>
  <div class="row items-start full-height q-gutter-sm text-blue-grey-14">
    <SaleDetails
      v-if="selectedSale.length"
      :sale="selectedSale[0]"
      class="col-12 col-md-8 full-height"
    />
    <q-card flat square bordered class="col">
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
          Aucune vente effectuée
        </q-inner-loading>
        <q-inner-loading :showing="psLoading">
          <q-spinner-ball size="80px" color="primary" />
        </q-inner-loading>
      </ScrollArea>
      <q-separator />
      <q-card-actions align="center">
        <q-pagination
          :model-value="paginationInput.page"
          v-if="sales.meta.totalPages > 1"
          flat
          v-model="paginationInput.page"
          color="primary"
          :max="sales.meta.totalPages"
          :max-pages="10"
          boundary-numbers
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePaginateSales } from '../../../graphql/sale/sale.service';
import { formatDate } from '../../../shared/date';
import ScrollArea from '../../shared/ScrollArea.vue';
import SaleDetails from './SaleDetails.vue';

export default defineComponent({
  name: 'SaleStory',
  components: { ScrollArea, SaleDetails },
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
