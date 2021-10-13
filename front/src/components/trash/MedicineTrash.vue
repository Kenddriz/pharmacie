<template>
  <TrashCardBase
    @click="show = true"
    label="Médicaments"
    :total="medicines.meta.totalItems"
    :loading="pmLoading"
  />
  <q-dialog full-width full-height v-model="show">
    <q-card square>
      <q-bar class="bg-teal-14 text-white">
        <span style="font-size: 12px">Médicaments supprimés ({{medicines.meta.totalItems}})</span>
        <q-space />
        <q-btn v-close-popup flat dense icon="close" />
      </q-bar>
      <q-card-section style="height: calc(100% - 90px)" class="overflow-auto">
        <q-list v-if="medicines.meta.totalPages">
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
        </q-list>
        <NoTrashData :total-items="medicines.meta.totalItems" :loading="pmLoading" />
      </q-card-section>
      <q-separator />
      <q-card-actions align="center">
        <q-pagination
          :disable="medicines.meta.totalPages < 1"
          :model-value="input.page"
          v-model="input.page"
          :max="medicines.meta.totalPages"
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
import TrashOperations from './TrashOperations.vue';
import {
  usePaginateDeletedMedicines,
  useRemoveMedicine,
  useRestoreMedicine,
} from '../../graphql/medicine/medicine.service';
import { formatDate } from '../../shared/date';
import { getMedicineName } from '../../graphql/utils/utils';
import NoTrashData from './NoTrashData.vue';

export default defineComponent({
  name: 'MedicineTrash',
  components: { TrashCardBase, TrashOperations, NoTrashData },
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
