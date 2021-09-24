<template>
  <q-dialog full-width full-height ref="dialogRef">
    <q-card>
      <q-bar class="bg-primary text-white">
        <q-icon name="sell" />&nbsp;Vente individuelle
        <span class="text-caption">
          &nbsp;[ Le client/Patient n'achète qu'un seul médicament ]
        </span>
        <q-space />
        <q-btn icon="close" v-close-popup dense unelevated color="red" />
      </q-bar>
      <q-separator />
      <q-card-section>
        <SaleType
          v-model="prescription"
          v-model:saleType="saleType"
        />
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <q-markup-table separator="cell" flat bordered>
          <thead>
          <tr>
            <th colspan="3">{{getMedicineName(batch.medicine)}}</th>
            <th :colspan="batch.medicine.packaging.units.length">
              QUANTITE A ACHETER
            </th>
            <th class="text-left" rowspan="2">MONTANT</th>
          </tr>
          <tr>
            <th>PRIX UNITAIRE</th>
            <th>TVA(%)</th>
            <th>REMISE(%)</th>
            <th :colspan="batch.medicine.packaging.units.length">
              <div class="flex flex-center">
                Disponible : &nbsp;
                <SubdivideList
                  class="flex-center"
                  :units="batch.medicine.packaging.units"
                  :current-stock="batch.currentStock"
                />
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
            <tr class="q-tr--no-hover">
              <SaleLine
                :batch="batch"
                v-model="saleLineInput"
              >
                {{cost}}
              </SaleLine>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
      <q-card-section class="flex justify-end">
        <div class="col flex flex-center q-gutter-md">
          <q-btn
            no-caps
            outline
            color="primary"
            icon-right="send"
            label="Réinitialiser"
            @click="reset"
          />
          <q-btn
            :disable="saleLineInput.quantity <= 0"
            no-caps
            outline
            color="primary"
            icon-right="send"
            label="Enregistrer la vente"
            @click="createS"
          />
        </div>
        <DiscountCalculator :cost="cost" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from 'vue';
import { useDialogPluginComponent, useQuasar } from 'quasar';
import SaleLine from './SaleLine.vue';
import SaleType from './SaleType.vue';
import { Batch, SaleLineInput } from '../../../graphql/types';
import DiscountCalculator from './DiscountCalculator.vue';
import { cloneDeep, getMedicineName, saleLineCost } from '../../../graphql/utils/utils';
import SubdivideList from '../../packaging/SubdivideList.vue';
import { useCreateSale } from '../../../graphql/sale/sale.service';

export default defineComponent({
  name: 'IndividualSale',
  components: { SaleLine, SaleType, DiscountCalculator, SubdivideList },
  props: {
    batch: {
      type: Object as PropType<Batch>,
      required: true
    },
  },
  emits: ['ok'],
  setup(props, { emit }) {
    const { notify, loading } = useQuasar();
    const { dialogRef } = useDialogPluginComponent();
    const { createSale, prescription, saleType, onDone } = useCreateSale();
    const defaultInput = {
      batchId: props.batch.id,
      quantity: 0,
      price: props.batch.medicine.currentSalePrice,
      vat: props.batch.medicine.currentVat,
      discount: 0
    }
    const saleLineInput = reactive<SaleLineInput>(cloneDeep(defaultInput));
    function createS() {
      createSale([saleLineInput]);
    }
    onDone(() => {
      loading.hide();
      notify({
        message: 'Vente a bien été effectuée!',
        position: 'right'
      });
      /**update batch*/
      Object.assign(props.batch,{
        currentStock: props.batch.currentStock - saleLineInput.quantity
      });
      Object.assign(props.batch.medicine, {
        currentVat: saleLineInput.vat,
        currentSalePrice: saleLineInput.price
      });
      emit('ok');
      dialogRef.value?.hide();
    });
    function reset() {
      Object.assign(saleLineInput, defaultInput);
    }
    return {
      dialogRef,
      prescription,
      cost: computed(() => saleLineCost(saleLineInput)),
      saleType,
      getMedicineName,
      reset,
      saleLineInput,
      createS
    }
  }
});
</script>

<style scoped>

</style>
