<template>
  <TrashCardBase
    @click="show = true"
    label="Ventes"
  />
  <q-dialog full-width full-height v-model="show">
    <q-card square>
      <q-bar class="bg-teal-14 text-white">
        <span style="font-size: 12px">Ventes supprimées</span>
        <q-space />
        <q-btn v-close-popup flat dense icon="close" />
      </q-bar>
      <q-card-section></q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TrashCardBase from './TrashCardBase.vue';

export default defineComponent({
  name: 'SaleTrash',
  components: { TrashCardBase },
  setup() {
    return {
      show: ref<boolean>(false)
    }
  }
});
</script>

<style scoped>

</style>
