<template>
  <TrashCardBase
    @click="show = true"
    label="Fournisseurs"
    :loading="ppLoading"
    :total="providers.meta.totalItems"
  />
  <q-dialog full-width full-height v-model="show">
    <TrashCardDialog
      :total-items="providers.meta.totalItems"
      :title="`Articles supprimés(${providers.meta.totalItems})`"
      :loading="ppLoading"
      repo="Provider"
    >
      <q-item v-for="pro in providers.items" :key="pro.id">
        <q-item-section avatar>
          <q-avatar>
            <q-img :src="uri(pro.avatar)||'avatar.svg'" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{pro.name}}</q-item-label>
          <q-item-label caption>{{pro.address}}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Date de suppression</q-item-label>
          <q-item-label caption>{{formatDate(pro.archivedAt, 'DATE_TIME')}}</q-item-label>
        </q-item-section>
        <TrashOperations
          @restore="restore(pro.id)"
          @remove="remove(pro.id)"
        />
      </q-item>
      <template v-slot:pagination>
        <q-pagination
          :model-value="input.page"
          v-model="input.page"
          :max="providers.meta.totalPages"
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
import TrashOperations from '../shared/MenuOperations.vue';
import {
  usePaginateDeletedProviders,
  useRemoveProvider,
  useRestoreProvider,
} from '../../graphql/provider/provider.service';
import { formatDate } from '../../shared/date';
import TrashCardDialog from './TrashCardDialog.vue';

export default defineComponent({
  name: 'ProviderTrash',
  components: { TrashCardBase, TrashOperations, TrashCardDialog },
  setup() {
    return {
      show: ref<boolean>(false),
      ...usePaginateDeletedProviders(),
      ...useRemoveProvider(),
      formatDate,
      uri: (avatar: string) => avatar ? (String(process.env.uri) + 'avatars/providers/' + avatar) : '',
      ...useRestoreProvider()
    }
  }
});
</script>

<style scoped>

</style>
