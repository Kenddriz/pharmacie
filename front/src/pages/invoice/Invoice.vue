<template>
  <q-page class="row q-pa-sm text-blue-grey-14">
    <q-card
      bordered
      flat square
      class="col-12 col-md-9 q-pa-sm overflow-auto"
      :style="`height:${$q.screen.height - 82}px;`"
    >
      <PaymentMode @ok="pInvoice.selected = $event" />
      <q-separator />
      <AssuredLineDetails
        v-if="pInvoice.selected.length"
        :command-lines="pInvoice.selected[0].command.commandLines"
        :invoice="pInvoice.selected[0]"
      />
      <NoData
        :sizes="[60, 150]"
        :loading="pInvoice.loading"
        :total-items="pInvoice.total"
      />
    </q-card>
    <InvoiceList
      class="col-12 col-md-3"
      v-model="pInvoice.selected"
      show-menu-op
      v-model:total="pInvoice.total"
      v-model:p-loading="pInvoice.loading"
    />
  </q-page>
</template>

<script lang="ts">
import PaymentMode from '../../components/method/Method.vue';
import { defineComponent, reactive } from 'vue';
import { Invoice } from '../../graphql/types';
import { formatDate } from '../../shared/date';
import AssuredLineDetails from '../../components/stock-movement/AssuredLineDetails.vue';
import NoData from '../../components/shared/NoData.vue';
import InvoiceList from '../../components/invoice/InvoiceList.vue';

export type SelectedInvoice = {selected: Invoice[], loading: boolean, total: number}

export default defineComponent({
  name: 'Invoice',
  components: { PaymentMode, AssuredLineDetails, NoData, InvoiceList },
  setup() {
    return {
      formatDate,
      pInvoice: reactive<SelectedInvoice>({
        selected: [],
        loading: false,
        total: 0
      })
    }
  },
});
</script>

<style scoped>

</style>
