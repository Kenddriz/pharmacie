<template>
  <TrashCardBase
    @click="show = true"
    label="Lots"
    :total="batch.meta.totalItems"
    :loading="loading"
  />
  <q-dialog full-width full-height v-model="show">
    <TrashCardDialog
      :total-items="batch.meta.totalItems"
      :title="`Lots supprimés(${batch.meta.totalItems})`"
      :loading="loading"
      repo="Batch"
    >
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
      <template v-slot:pagination>
        <q-pagination
          :disable="batch.meta.totalPages <= 1"
          :model-value="input.page"
          v-model="input.page"
          :max="batch.meta.totalPages"
          input
          input-class="text-orange-10"
        />
      </template>
    </TrashCardDialog>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TrashCardBase from './TrashCardBase.vue';
import { usePaginateDeletedBatches, useRemoveBatch, useRestoreBatch } from '../../graphql/batch/batch.service';
import TrashOperations from '../shared/MenuOperations.vue';
import { formatDate } from '../../shared/date';
import TrashCardDialog from './TrashCardDialog.vue';

export default defineComponent({
  name: 'BatchTrash',
  components: { TrashCardBase, TrashOperations, TrashCardDialog },
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
