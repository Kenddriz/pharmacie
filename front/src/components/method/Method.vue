<template>
  <q-item>
    <q-item-section side>
      <q-icon name="handyman" size="sm" />
    </q-item-section>
    <q-item-section class="text-subtitle1">
      Les modes de payement
    </q-item-section>
  </q-item>
  <div class="row q-gutter-md justify-center">
    <q-card
      flat
      style="height: 100px!important;"
      bordered
      @click="create"
      class="col-1 justify-center items-center column"
    >
      <span class="q-mb-sm">Nouveau</span>
      <q-btn unelevated color="primary" round icon="add"/>
    </q-card>
    <ScrollArea class="col" style="height: 120px; width: 100%">
      <div class="row no-wrap q-gutter-md">
        <q-card
          flat
          bordered
          v-for="(p,i) in paymentModes.methods"
          :key="i"
          class="mCard justify-center items-center column"
        >
          <q-card-section>{{p.label}}</q-card-section>
          <q-separator class="full-width" />
          <q-card-actions>
            <q-btn dense flat color="primary" @click="update(p)" icon="edit"/>
            <q-btn dense flat color="deep-orange" @click="remove(p)" icon="delete"/>
          </q-card-actions>
        </q-card>
      </div>
    </ScrollArea>
  </div>
</template>

<script lang="ts">
import { defineComponent, UnwrapRef } from 'vue';
import ScrollArea from '../shared/ScrollArea.vue';
import {
  useCreatePaymentsMode, useMethods,
  useUpdatePaymentsMode,
} from '../../graphql/method/method.service';
import MethodForm from './MethodForm.vue';
import { useQuasar } from 'quasar';
import { Method } from '../../graphql/types';
import RemoveMethod from './RemoveMethod.vue';

export default defineComponent({
  name: 'PaymentMode',
  components: { ScrollArea },
  emits: ['ok'],
  setup(_, { emit }) {
    const { dialog } = useQuasar();
    const { submitCreation } = useCreatePaymentsMode();
    const { submitUpdate } = useUpdatePaymentsMode();
    return {
      ...useMethods(),
      create: () => {
        dialog({
          component: MethodForm
        }).onOk((label: string) => submitCreation({ label }))
      },
      update: (method: UnwrapRef<Method>) => {
        dialog({
          component: MethodForm,
          componentProps: { label: method.label }
        }).onOk((label: string) => submitUpdate({ label, id: method.id }))
      },
      remove: (method: UnwrapRef<Method>) => {
        dialog({
          component: RemoveMethod,
          componentProps: { method }
        }).onOk((invoice: any) => emit('ok', invoice))
      }
    }
  }
});
</script>

<style lang="scss" scoped>
  .mCard {
    min-width: 100px;
    height: 100px;
  }
</style>
