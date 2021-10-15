<template>
  <TrashCardBase
    @click="show = true"
    label="Unités de vente"
    :total="list.length"
    :loading="loading"
  />
  <q-dialog full-width full-height v-model="show">
    <TrashCardDialog
      :total-items="list.length"
      :title="`Unités de mesure supprimées(${list.length})`"
      :loading="loading"
      repo="Packaging"
    >
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
    </TrashCardDialog>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TrashCardBase from './TrashCardBase.vue';
import TrashOperations from '../shared/MenuOperations.vue';
import {
  useDeletedPackaging,
  useRemovePackaging,
  useRestorePackaging,
} from '../../graphql/packaging/packaging.service';
import { formatDate } from '../../shared/date';
import TrashCardDialog from './TrashCardDialog.vue';

export default defineComponent({
  name: 'ProviderTrash',
  components: { TrashCardBase, TrashOperations, TrashCardDialog },
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
