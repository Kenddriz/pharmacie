<template>
  <TrashCardBase
    @click="show = true"
    label="Factures"
    :loading="loading"
    :total="invoice.meta.totalItems"
  />
  <q-dialog full-width full-height v-model="show">
    <TrashCardDialog
      :total-items="invoice.meta.totalItems"
      :title="`Factures supprimées (${invoice.meta.totalItems})`"
      :loading="loading"
      repo="Invoice"
    >
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
      <template v-slot:pagination>
        <q-pagination
          :model-value="input.page"
          v-model="input.page"
          :max="invoice.meta.totalPages"
          input
          input-class="text-orange-10"
          :disable="invoice.meta.totalPages <= 1"
        />
      </template>
    </TrashCardDialog>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TrashCardBase from './TrashCardBase.vue';
import { formatDate } from '../../shared/date';
import TrashOperations from '../shared/MenuOperations.vue';
import { useRestoreInvoice, usePaginateDeletedInvoices, useRemoveInvoice } from '../../graphql/invoice/invoice.service';
import TrashCardDialog from './TrashCardDialog.vue';

export default defineComponent({
  name: 'InvoiceTrash',
  components: { TrashCardBase, TrashOperations, TrashCardDialog },
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
