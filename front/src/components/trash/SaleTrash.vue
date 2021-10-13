<template>
  <TrashCardBase
    @click="show = true"
    label="Ventes"
    :loading="loading"
    :total="sale.meta.totalItems"
  />
  <q-dialog full-width full-height v-model="show">
    <q-card square>
      <q-bar class="bg-teal-14 text-white">
        <span style="font-size: 12px">Ventes supprimées({{sale.meta.totalItems}})</span>
        <q-space />
        <q-btn v-close-popup flat dense icon="close" />
      </q-bar>
      <q-card-section style="height: calc(100% - 90px)" class="overflow-auto">
        <q-list v-if="sale.meta.totalPages">
          <q-item v-for="(item, index) in sale.items" :key="index">
            <q-item-section avatar>
              <q-avatar size="sm" color="primary" text-color="white">{{index + 1}}</q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Date de création</q-item-label>
              <q-item-label caption>{{formatDate(item.createdAt, 'DATE_TIME')}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Date de suppression</q-item-label>
              <q-item-label caption>{{formatDate(item.archivedAt, 'DATE_TIME')}}</q-item-label>
            </q-item-section>
            <TrashOperations
              @restore="restore(item.id)"
              @remove="remove(item.id)"
            />
          </q-item>
        </q-list>
        <NoTrashData :total-items="sale.meta.totalItems" :loading="loading" />
      </q-card-section>
      <q-separator />
      <q-card-actions align="center">
        <q-pagination
          :model-value="input.page"
          v-model="input.page"
          :max="sale.meta.totalPages"
          input
          input-class="text-orange-10"
          :disable="sale.meta.totalPages <= 1"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TrashCardBase from './TrashCardBase.vue';
import { usePaginateDeletedSales, useRemoveSale, useRestoreSale } from '../../graphql/sale/sale.service';
import { formatDate } from '../../shared/date';
import TrashOperations from './TrashOperations.vue';
import NoTrashData from './NoTrashData.vue';

export default defineComponent({
  name: 'SaleTrash',
  components: { TrashCardBase, TrashOperations, NoTrashData },
  setup() {
    return {
      show: ref<boolean>(false),
      ...usePaginateDeletedSales(),
      ...useRestoreSale(),
      ...useRemoveSale(),
      formatDate
    }
  }
});
</script>

<style scoped>

</style>
