<template>
  <TrashCardBase
    @click="show = true"
    label="Lots"
    :total="batch.meta.totalItems"
    :loading="loading"
  />
  <q-dialog full-width full-height v-model="show">
    <q-card square>
      <q-bar class="bg-teal-14 text-white">
        <span style="font-size: 12px">Lots supprimés ({{batch.meta.totalItems}})</span>
        <q-space />
        <q-btn v-close-popup flat dense icon="close" />
      </q-bar>
      <q-card-section style="height: calc(100% - 90px)" class="overflow-auto">
        <q-list v-if="batch.meta.totalPages">
          <q-item v-for="(item, index) in batch.items" :key="index">
            <q-item-section>
              <q-avatar text-color="white" size="sm" color="primary">
                {{ index + 1 }}
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Date de péremption</q-item-label>
              <q-item-label caption>{{formatDate(item.expirationDate, 'DATE_ONLY')}}</q-item-label>
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
        <q-inner-loading :showing="!batch.meta.itemCount && !loading">
          <q-icon name="person" size="80px" />
        </q-inner-loading>
        <q-inner-loading :showing="loading">
          <q-icon name="person" size="80px" />
        </q-inner-loading>
      </q-card-section>
      <q-separator />
      <q-card-actions align="center">
        <q-pagination
          v-if="batch.meta.totalPages > 1"
          :model-value="input.page"
          v-model="input.page"
          :max="batch.meta.totalPages"
          input
          input-class="text-orange-10"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TrashCardBase from './TrashCardBase.vue';
import { usePaginateDeletedBatches, useRemoveBatch, useRestoreBatch } from '../../graphql/batch/batch.service';
import TrashOperations from './TrashOperations.vue';
import { formatDate } from '../../shared/date';

export default defineComponent({
  name: 'BatchTrash',
  components: { TrashCardBase, TrashOperations },
  setup() {
    return {
      show: ref<boolean>(false),
      ...usePaginateDeletedBatches(),
      ...useRestoreBatch(),
      ...useRemoveBatch(),
      formatDate
    }
  }
});
</script>

<style scoped>

</style>
