<template>
  <TrashCardBase
    @click="show = true"
    label="Médicaments"
    :total="medicines.meta.totalItems"
    :loading="pmLoading"
  />
  <q-dialog full-width full-height v-model="show">
    <TrashCardDialog
      :total-items="medicines.meta.totalItems"
      :title="`Médicaments supprimés(${medicines.meta.totalItems})`"
      :loading="pmLoading"
      repo="Medicine"
    >
      <q-item v-for="(med, index) in medicines.items" :key="index">
        <q-item-section>
          <q-avatar text-color="white" size="sm" color="primary">
            {{ index + 1 }}
          </q-avatar>
        </q-item-section>
        <q-item-section>
          {{getMedicineName(med)}}
        </q-item-section>
        <q-item-section>
          <q-item-label>Date de suppression</q-item-label>
          <q-item-label caption>{{formatDate(med.archivedAt, 'DATE_TIME')}}</q-item-label>
        </q-item-section>
        <TrashOperations
          @restore="restore(med.id)"
          @remove="remove(med.id)"
        />
      </q-item>
      <template v-slot:pagination>
        <q-pagination
          :disable="medicines.meta.totalPages <= 1"
          :model-value="input.page"
          v-model="input.page"
          :max="medicines.meta.totalPages"
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
  usePaginateDeletedMedicines,
  useRemoveMedicine,
  useRestoreMedicine,
} from '../../graphql/medicine/medicine.service';
import { formatDate } from '../../shared/date';
import { getMedicineName } from '../../graphql/utils/utils';
import TrashCardDialog from './TrashCardDialog.vue';

export default defineComponent({
  name: 'MedicineTrash',
  components: { TrashCardBase, TrashOperations, TrashCardDialog },
  setup() {
    return {
      show: ref<boolean>(false),
      ...usePaginateDeletedMedicines(),
      ...useRestoreMedicine(),
      ...useRemoveMedicine(),
      formatDate,
      getMedicineName
    }
  }
});
</script>

<style scoped>

</style>
