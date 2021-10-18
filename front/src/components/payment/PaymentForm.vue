<template>
  <q-btn icon="edit" size="sm" round flat color="positive">
    <q-menu persistent anchor="bottom middle" self="top middle">
      <q-card flat class="text-blue-grey-14">
        <q-bar class="text-subtitle1 text-white bg-teal-14">
          {{payment ? 'Informations du payment' : 'Régler la facture'}}
          <q-space />
          <q-btn dense v-close-popup flat round icon="close" />
        </q-bar>
        <q-form class="row q-pa-md" @submit.prevent="submit()" @reset="reset">
          <div class="q-gutter-md q-mr-md">
            <q-input
              dense
              hide-bottom-space
              :model-value="model.reference"
              v-model="model.reference"
              stack-label
              outlined
              label="Référence *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Veuiller entrer la référence']"
            />
            <DateInput
              v-model="model.date"
              outlined
              label="Date de payment *"
              dense
            />
            <CustomSelect
              dense
              outlined
              label="Mode de payement"
              :options="paymentModes"
              v-model="model.methodeId"
              lazy-rules
              :rules="[ () => model.methodeId > 0 || 'Entrer le moyen de payment']"
            />
          </div>
          <div class="q-gutter-sm">
            <q-input
              dense
              :model-value="model.note"
              v-model="model.note"
              stack-label
              label="Mettre une note"
              outlined
              type="textarea"
            />
            <q-btn
              v-close-popup
              no-caps
              outline
              label="Enregistrer"
              type="submit"
              color="primary"
            />
            <q-btn
              no-caps
              outline
              label="Réinitialiser"
              type="reset"
              color="primary"
            />
          </div>
        </q-form>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch } from 'vue';
import CustomSelect from '../shared/CustomSelect.vue';
import { Method, Payment, PaymentFormInput } from '../../graphql/types';
import DateInput from '../shared/DateInput.vue';
import { useCreatePayment, useUpdatePayment } from '../../graphql/payment/payment.service';

export default defineComponent({
  name: 'PaymentForm',
  components: { CustomSelect, DateInput },
  props: {
    paymentModes: Array as PropType<Method[]>,
    payment: Object as PropType<Payment>,
    invoiceId: {
      type: Number,
      default: 0
    },
  },
  setup(props) {
    const model = reactive<PaymentFormInput>({
      methodeId: 0,
      reference: '',
      date: '',
      note: ''
    });
    function reset() {
      Object.assign(model, {
        methodeId: props?.payment?.method?.id||0,
        reference: props?.payment?.reference,
        date: props?.payment?.date,
        note: props?.payment?.note
      })
    }
    watch(() => props.invoiceId, () => {
      reset();
    })
    const { createPayment, cpLoading } = useCreatePayment();
    const { updatePayment, upLoading } = useUpdatePayment();
    function submit() {
      if(props.payment) void updatePayment({ id: props.payment.id, form: model });
      else void createPayment({ invoiceId: props.invoiceId, form: model })
    }
    reset();
    return {
      model,
      cpLoading,
      upLoading,
      submit,
      reset
    }
  }
});
</script>

<style scoped>

</style>
