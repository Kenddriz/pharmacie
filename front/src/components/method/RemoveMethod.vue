<template>
  <q-dialog seamless ref="dialogRef">
    <MovableCard resizable>
      <template v-slot:title>
        Les factures dependantes du mode <b>{{method.label}}</b>
        <q-badge color="warning" text-color="white" :label="pInvoice.total" />
      </template>
      <InvoiceList
        v-model="pInvoice.selected"
        v-model:total="pInvoice.total"
        v-model:p-loading="pInvoice.loading"
        :height="230"
        :payment-id="method.id"
        show-menu-op
        @update:modelValue="() => { if(pInvoice.selected.length)$emit('ok', pInvoice.selected); }"
      >
        <NoData
          :sizes="[100, 150]"
          :loading="pInvoice.loading"
          :total-items="pInvoice.total"
        >
          <br/>
          <q-btn
            no-caps
            label="supprimer définitivement"
            :loading="pInvoice.loading"
            outline
            icon="delete_forever"
            color="deep-orange"
            :disable="pInvoice.total > 0"
            @click="removeMethod(method.id)"
            v-close-popup
          />
        </NoData>
      </InvoiceList>
      <template v-slot:footer>
        <q-banner class="bg-grey-3 full-width">
          Ce mode de payment a été utilisé {{ pInvoice.total }} fois.
          <template v-slot:action>
            <q-btn
              :loading="pInvoice.loading"
              outline
              icon="delete_forever"
              color="deep-orange"
              :disable="pInvoice.total > 0 || pInvoice.loading"
              @click="removeMethod(method.id)"
              v-close-popup
            />
          </template>
        </q-banner>
      </template>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import MovableCard from '../shared/MovableCard.vue';
import { useDialogPluginComponent } from 'quasar';
import InvoiceList from '../invoice/InvoiceList.vue';
import { SelectedInvoice } from '../../pages/invoice/Invoice.vue';
import { Method } from '../../graphql/types';
import NoData from '../shared/NoData.vue';
import { useRemoveMethod } from '../../graphql/method/method.service';

export default defineComponent({
  name: 'RemoveMethod',
  components: { MovableCard, InvoiceList, NoData },
  props: {
    method: Object as PropType<Method>
  },
  emits: ['ok'],
  setup() {
    const { dialogRef } = useDialogPluginComponent();
    return {
      dialogRef,
      pInvoice: reactive<SelectedInvoice>({
        selected: [],
        loading: false,
        total: 0
      }),
      ...useRemoveMethod()
    }
  }
});
</script>

<style scoped>

</style>
