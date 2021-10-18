<template>
  <template v-for="(med, iMed) in article.medicines" :key="iMed">
    <Divider align="center" class="text-blue-grey-14">
      {{article.commercialName}}
      {{med.dosage.label}}, {{med.form.label}}
      <q-btn dense color="brown" flat icon="read_more">
        <MoreInfo :medicine="med" />
      </q-btn>
    </Divider>
    <q-list dense class="text-blue-grey-14">
      <q-item
        v-for="(batch, iBatch) in med.batches"
        :key="iBatch"
      >
        <q-item-section side>
          <q-item-label>
            Lot
          </q-item-label>
          <q-item-label caption>
            N°{{batch.id}}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>
            Date exp : {{ formatDate(batch.expirationDate, 'DATE_ONLY') }}
          </q-item-label>
          <q-item-label class="text-deep-orange" caption>
            Jours restants : {{leftDays(batch.expirationDate)}}
          </q-item-label>
        </q-item-section>
        <q-item-section class="text-center">
          <q-item-label>Quantité disponible</q-item-label>
          <SubdivideList
            class="flex-center"
            :units="med.packaging.units"
            :current-stock="batch.currentStock"
          />
        </q-item-section>
        <q-item-section side>
          <q-btn
            dense
            round
            size="12px"
            color="blue-grey-14"
            flat
            icon="add_shopping_cart"
            @click="$emit('add-shop', getBatch(iMed, iBatch))"
            :disable="batch.currentStock === 0"
          />
          <q-btn
            dense
            round
            size="12px"
            color="blue-grey-13"
            flat
            icon="sell"
            @click="individualSale(iMed, iBatch)"
            :disable="batch.currentStock === 0"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Article } from '../../../graphql/types';
import IndividualSale from './IndividualSale.vue';
import { useQuasar } from 'quasar';
import Divider from '../../shared/Divider.vue';
import SubdivideList from '../../packaging/SubdivideList.vue';
import { formatDate } from '../../../shared/date';
import { leftDays, subdivideToUnits } from '../../../graphql/utils/utils';
import MoreInfo from '../../medicine/MoreInfo.vue';

export default defineComponent({
  name: 'ArticleMedicinesBatches',
  components: {Divider, SubdivideList, MoreInfo},
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true
    }
  },
  emits: ['add-shop', 'individual-sale'],
  setup(props, { emit }) {
    const { dialog } = useQuasar();
    function getBatch(iMed: number, iBatch: number) {
      const { medicines, ...article } = props.article;
      if(medicines) {
        const { batches, ...medicine } = medicines[iMed];
        return {
          ...batches[iBatch],
          medicine: { ...medicine, article }
        };
      }
      return undefined;
    }
    return {
      individualSale: (iMed: number, iBatch: number) => {
        const batch = getBatch(iMed, iBatch);
        dialog({
          component: IndividualSale,
          componentProps: { batch }
        }).onOk(() => { emit('individual-sale', batch)})
      },
      formatDate,
      leftDays,
      subdivideToUnits,
      getBatch
    }
  }
});
</script>

<style scoped>

</style>
