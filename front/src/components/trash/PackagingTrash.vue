<template>
  <TrashCardBase
    @click="show = true"
    label="Unités de vente"
    :total="list.length"
    :loading="loading"
  />
  <q-dialog full-width full-height v-model="show">
    <q-card square>
      <q-bar class="bg-teal-14 text-white">
        <span style="font-size: 12px">Unités de vente supprimés</span>
        <q-space />
        <q-btn v-close-popup flat dense icon="close" />
      </q-bar>
      <q-card-section style="height: calc(100% - 32px)" class="overflow-auto">
        <q-list v-if="list.length">
          <q-item v-for="(pk, index) in list" :key="index">
            <q-item-section>
              <q-avatar text-color="white" size="sm" color="primary">
                {{ index + 1 }}
              </q-avatar>
            </q-item-section>
            <q-item-section>
              {{pk.units.map(u => u.label).join(' - ')}}
            </q-item-section>
            <q-item-section>
              <q-item-label>Date de suppression</q-item-label>
              <q-item-label caption>{{formatDate(pk.archivedAt, 'DATE_TIME')}}</q-item-label>
            </q-item-section>
            <TrashOperations
              @restore="restore(pk.id)"
              @remove="remove(pk.id)"
            />
          </q-item>
        </q-list>
        <NoTrashData :total-items="list.length" :loading="loading" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TrashCardBase from './TrashCardBase.vue';
import TrashOperations from './TrashOperations.vue';
import {
  useDeletedPackaging,
  useRemovePackaging,
  useRestorePackaging,
} from '../../graphql/packaging/packaging.service';
import { formatDate } from '../../shared/date';
import NoTrashData from './NoTrashData.vue';

export default defineComponent({
  name: 'ProviderTrash',
  components: { TrashCardBase, TrashOperations, NoTrashData },
  setup() {
    return {
      show: ref<boolean>(false),
      ...useDeletedPackaging(),
      formatDate,
      ...useRestorePackaging(),
      ...useRemovePackaging()
    }
  }
});
</script>

<style scoped>

</style>
