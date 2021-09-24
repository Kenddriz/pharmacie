<template>
  <q-dialog
    :full-width="!maximized"
    :full-height="!maximized"
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    :maximized="maximized"
  >
    <q-card square>
      <q-card-section class="full-height q-pb-lg q-pt-none q-pr-none q-pl-none">
        <q-bar class="bg-teal-14 text-white">
          Ajout de nouvelles lignes pour la vente n°{{saleId}}
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximized = false" :disable="!maximized" />
          <q-btn dense flat icon="crop_square" @click="maximized = true" :disable="maximized" />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <TableSale />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TableSale from '../sale/TableSale.vue';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  name: 'AddSaleLine',
  components: { TableSale },
  props: {
    saleId: {
      type: Number,
      required: true
    }
  },
  setup() {
    const { dialogRef } = useDialogPluginComponent();
    return {
      dialogRef,
      maximized: ref<boolean>(false)
    }
  }
});
</script>

<style scoped>

</style>
