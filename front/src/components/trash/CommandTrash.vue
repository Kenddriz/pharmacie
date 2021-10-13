<template>
  <TrashCardBase
    @click="show = true"
    label="Commandes"
    :loading="loading"
    :total="command.meta.totalItems"
  />
  <q-dialog full-width full-height v-model="show">
    <q-card square>
      <q-bar class="bg-teal-14 text-white">
        <span style="font-size: 12px">Commandes supprimées({{command.meta.totalItems}})</span>
        <q-space />
        <q-btn v-close-popup flat dense icon="close" />
      </q-bar>
      <q-card-section style="height: calc(100% - 90px)" class="overflow-auto">
        <q-list v-if="command.meta.totalPages">
          <q-item v-for="item in command.items" :key="item.id">
            <q-item-section>
              <q-item-label>N°Commande</q-item-label>
              <q-item-label caption>{{item.id}}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{item.provider.name}}</q-item-label>
              <q-item-label caption>{{item.provider.address}}</q-item-label>
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
        <NoTrashData :total-items="command.meta.totalItems" :loading="loading" />
      </q-card-section>
      <q-separator />
      <q-card-actions align="center">
        <q-pagination
          :model-value="input.page"
          v-model="input.page"
          :max="command.meta.totalPages"
          input
          input-class="text-orange-10"
          :disable="command.meta.totalPages <= 1"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TrashCardBase from './TrashCardBase.vue';
import { usePaginateDeletedCommands, useRemoveCommand, useRestoreCommand } from '../../graphql/command/command.service';
import { formatDate } from '../../shared/date';
import TrashOperations from './TrashOperations.vue';
import NoTrashData from './NoTrashData.vue';

export default defineComponent({
  name: 'CommandTrash',
  components: { TrashCardBase, TrashOperations, NoTrashData },
  setup() {
    return {
      show: ref<boolean>(false),
      ...usePaginateDeletedCommands(),
      ...useRestoreCommand(),
      ...useRemoveCommand(),
      formatDate
    }
  }
});
</script>

<style scoped>

</style>
