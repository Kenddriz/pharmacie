<template>
  <TrashCardBase
    @click="show = true"
    label="Factures"
    :loading="loading"
    :total="invoice.meta.totalItems"
  />
  <q-dialog full-width full-height v-model="show">
    <q-card square>
      <q-bar class="bg-teal-14 text-white">
        <span style="font-size: 12px">Factures supprimées({{invoice.meta.totalItems}})</span>
        <q-space />
        <q-btn v-close-popup flat dense icon="close" />
      </q-bar>
      <q-card-section style="height: calc(100% - 90px)" class="overflow-auto">
        <q-list v-if="invoice.meta.totalPages">
          <q-item v-for="item in invoice.items" :key="item.id">
            <q-item-section>
              <q-item-label>Ref Facture</q-item-label>
              <q-item-label caption>{{item.reference}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>Echéance</q-item-label>
              <q-item-label caption>{{formatDate(item.createdAt, 'DATE_TIME')}}</q-item-label>
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
        <NoTrashData :total-items="invoice.meta.totalItems" :loading="loading" />
      </q-card-section>
      <q-separator />
      <q-card-actions align="center">
        <q-pagination
          :model-value="input.page"
          v-model="input.page"
          :max="invoice.meta.totalPages"
          input
          input-class="text-orange-10"
          :disable="invoice.meta.totalPages <= 1"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TrashCardBase from './TrashCardBase.vue';
import { formatDate } from '../../shared/date';
import TrashOperations from './TrashOperations.vue';
import { useRestoreInvoice, usePaginateDeletedInvoices, useRemoveInvoice } from '../../graphql/invoice/invoice.service';
import NoTrashData from './NoTrashData.vue';

export default defineComponent({
  name: 'InvoiceTrash',
  components: { TrashCardBase, TrashOperations, NoTrashData },
  setup() {
    return {
      show: ref<boolean>(false),
      ...usePaginateDeletedInvoices(),
      ...useRestoreInvoice(),
      ...useRemoveInvoice(),
      formatDate
    }
  }
});
</script>

<style scoped>

</style>
