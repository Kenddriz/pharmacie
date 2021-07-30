<template>
  <q-form @submit="savePayment" @reset="reset">
    <q-card flat>
      <div class="text-h6 q-mb-md">
        <q-icon name="info" size="md" /> Informations de payement
      </div>
      <q-card-section horizontal class="q-gutter-md">
        <div class="row q-gutter-md items-start">
          <q-input
            :model-value="paymentInput.reference"
            v-model="paymentInput.reference"
            stack-label
            outlined
            label="Référence *"
            hint="La référence de payement"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Veuiller entrer la référence']"
          />
          <q-input
            :model-value="paymentInput.date"
            v-model="paymentInput.date"
            outlined
            stack-label
            mask="##/##/####"
            label="Date de payment *"
            hint="La date de payement"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Veuiller entrer la date de payement']"
          />
          <CustomSelect
            outlined
            :dense="false"
            label="Mode de payement"
            :options="paymentModes"
            v-model="paymentInput.paymentModeId"
          />
        </div>
        <q-input
          :model-value="paymentInput.description"
          v-model="paymentInput.description"
          stack-label
          label="Description de payement"
          class="col"
          outlined
          type="textarea"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn no-caps outline label="Enregistrer" type="submit" color="primary"/>
        <q-btn no-caps outline label="Réinitialiser" type="reset" color="primary" class="q-ml-lg" />
      </q-card-actions>
    </q-card>
    </q-form>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue';
import CustomSelect from '../shared/CustomSelect.vue';
import { Payment, PaymentMode } from '../../graphql/types';
import { useSavePayment } from '../../graphql/payment/payment.service';
export default defineComponent({
  name: 'PaymentForm',
  components: { CustomSelect },
  props: {
    paymentModes: Array as PropType<PaymentMode[]>,
    payment: Object as PropType<Payment>,
    invoiceId: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const { paymentInput,savePayment, setPayment, paymentLoading } = useSavePayment();
    watch(() => props.payment, (payment) => {
      if(payment) setPayment(payment);
      paymentInput.invoiceId = props.invoiceId;
    }, { immediate: true })
    return {
      paymentInput,savePayment, paymentLoading,
      reset: () => {
        if(props.payment)setPayment(props.payment);
        else Object.keys(paymentInput).forEach((key: string) => {
          if(key !== 'paymentModeId' && key !== 'invoiceId') {
            Object.assign(paymentInput, {
              [key]: (typeof paymentInput[key as keyof (typeof paymentInput)]) === 'number' ? 0 : ''
            })
          }
        });
      }
    }
  }
});
</script>

<style scoped>

</style>
