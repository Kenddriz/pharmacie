<template>
  <q-dialog ref="dialogRef">
    <q-card
      class="text-blue-grey-14"
      :style="`transform:translate(${pos[0]}px,${pos[1]}px)`"
      v-touch-pan.prevent.mouse="moveFab"
    >
      <q-card-section class="text-h6 q-pt-sm q-pb-sm row">
        Détails de la ligne <q-space />
        <q-btn color="red" v-close-popup unelevated size="sm" icon="close" round />
      </q-card-section>
      <q-separator inset />
      <q-card-section style="font-size: 15px" class="q-pb-sm q-pt-sm">
        {{getMedicineName(stm.batch.medicine)}}
        <q-item-label>Disponible :</q-item-label>
        <SubdivideList
          :units="stm.batch.medicine.packaging.units"
          :current-stock="available"
        />
      </q-card-section>
      <q-separator inset />
      <q-card-section horizontal>
        <q-card-section class="q-gutter-md">
          <PackagingInput
            :dense="false"
            label="Prix unitaire"
            outlined
            :is-q="false"
            :value="stm.batch.medicine.currentSalePrice"
            :units="stm.batch.medicine.packaging.units"
            @set-model="uslInput.price = $event"
          />
          <q-input
            :model-value="uslInput.vat"
            v-model.number="uslInput.vat"
            shadow-text="TVA de vente"
            outlined
            dense
            min="0"
            max="100"
            type="number"
            suffix="%"
            input-class="text-blue-grey-14"
          >
            <template v-slot:prepend>
              <div class="self-center label-size" tabindex="0">
                TVA :
              </div>
            </template>
          </q-input>
          <q-input
            :model-value="uslInput.discount"
            v-model.number="uslInput.discount"
            outlined
            dense
            min="0"
            max="100"
            type="number"
            suffix="%"
            input-class="text-blue-grey-14"
          >
            <template v-slot:prepend>
              <div class="self-center label-size" tabindex="0">
                Remise :
              </div>
            </template>
          </q-input>
          <q-card bordered flat>
            <q-card-section>
              <q-item-label>Vendue : </q-item-label>
              <SubdivideInput
                :units="stm.batch.medicine.packaging.units"
                :value="available"
                v-model="uslInput.quantity"
              />
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-separator vertical inset />
        <q-card-actions vertical class="justify-around q-px-md">
          <q-btn
            v-close-popup
            :disable="uslInput.quantity > available"
            icon="save"
            no-caps
            color="primary"
            label="Modifier"
            outline
            @click="updateSaleLine"
          />
          <q-btn
            icon="cancel"
            no-caps
            color="amber-10"
            label="Annuler"
            outline
            @click="cancel"
            v-close-popup
          >
            <q-tooltip
              class="bg-amber-10 text-body2"
              :offset="[5, 5]"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-icon size="xs" class="q-mr-smd" name="info" />
              {{$t('sale.cancelLine')}}
            </q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { StockMovement } from '../../graphql/types';
import { useDialogPluginComponent } from 'quasar';
import { getMedicineName } from '../../graphql/utils/utils';
import PackagingInput from '../packaging/PackagingInput.vue';
import SubdivideInput from '../packaging/SubdivideInput.vue';
import { useCancelSaleLines, useUpdateSaleLine } from '../../graphql/stock-movement/stock-mvt.service';
import SubdivideList from '../packaging/SubdivideList.vue';

export default defineComponent({
  name: 'UpdateSaleLine',
  components: { PackagingInput, SubdivideInput, SubdivideList },
  props: {
    stm: {
      type: Object as PropType<StockMovement>,
      required: true
    },
    saleId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { dialogRef } = useDialogPluginComponent();
    const pos = ref([0, 0]);
    const { cancelSaleLine } = useCancelSaleLines();
    function cancel() {
      cancelSaleLine({ saleId: props.saleId, saleLineIds: [props.stm.id] });
    }
    return {
      dialogRef,
      pos,
      getMedicineName,
      available: props.stm.quantity + props.stm.stock,
      ...useUpdateSaleLine(props.stm),
      cancel,
      moveFab (ev: any) {
        pos.value = [pos.value[0] + ev.delta.x, pos.value[1] + ev.delta.y];
      }
    }
  }
});
</script>

<style lang="scss" scoped>
  .label-size {
    font-size: 15px;
    color: #455a64;
  }
</style>
