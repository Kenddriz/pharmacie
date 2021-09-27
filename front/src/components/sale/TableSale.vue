<template>
  <q-markup-table separator="cell" class="q-mt-sm text-blue-grey-14" flat bordered>
    <thead>
      <tr>
        <th colspan="4">
          <span class="text-subtitle1">Lignes de vente en cours ({{shop.length}})</span>
          <span
            v-if="costs.zeros.length"
            class="text-caption text-deep-orange q-ml-md"
          >
              [Quantité zéro sur N°: {{ costs.zeros.join(', ')}}]
            </span>
        </th>
        <th :colspan="uSize + 4">
          <q-btn
            @click="searchTool = !searchTool"
            rounded
            no-caps
            color="white"
            outline
            dense
            text-color="primary"
            :label="`${searchTool ? 'Fermer' : 'Ouvrir' } l'outil de recherche`"
            size="md"
            :icon-right="searchTool ? 'close' : 'search'"
            class="full-width"
          />
        </th>
      </tr>
      <CommonSaleHeader :max-unit-size="uSize">
        <q-icon name="delete" size="sm" color="deep-orange" />
      </CommonSaleHeader>
    </thead>
    <tbody>
      <tr
        v-for="(batch, index) in shop"
        :key="batch.id"
        class="q-tr--no-hover"
      >
        <td class="text-center">{{batch.id}}</td>
        <td>
          <q-item-section>
            <q-item-label>
              {{getMedicineName(batch.medicine)}}
            </q-item-label>
            <q-item-label caption>
              <SubdivideList
                :units="batch.medicine.packaging.units"
                :current-stock="batch.currentStock"
              />
            </q-item-label>
          </q-item-section>
        </td>
        <SaleLine
          :colspan="uSize"
          :batch="batch"
          v-model="saleLines[index]"
        >
          {{costs.lines[index]}}
        </SaleLine>
        <td width="50">
          <q-btn
            round
            flat
            dense
            size="sm"
            icon="close"
            color="deep-orange"
            @click="removeShop(index)"
          />
        </td>
      </tr>
      <tr class="q-tr--no-hover">
        <td colspan="2">
          <q-btn
            icon="refresh"
            @click="reset"
            outline
            color="primary"
            label="Réinitialiser"
            rounded
            no-caps
            :disable="!shop.length"
          />
        </td>
        <td :colspan="uSize + (uSize > 0 ? 3 : 4)">
          <q-btn
            :disable="costs.zeros.length > 0 || !shop.length"
            rounded
            no-caps
            icon="save"
            label="Enregistrer"
            class="full-width"
            outline
            color="primary"
            @click="$emit('sell', saleLines)"
          />
        </td>
        <td>{{costs.total}}</td>
        <td>
          <q-btn
            icon-right="calculate"
            no-caps
            dense
            color="teal-6"
          >
            <q-menu anchor="top start" self="top right">
              <DiscountCalculator :cost="costs.total" />
            </q-menu>
          </q-btn>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <q-page-sticky position="bottom-right" :offset="fabPos">
    <q-avatar
      size="xs"
      class="q-btn q-btn--round cursor-pointer shadow-10"
      text-color="white"
      color="primary"
      v-touch-pan.prevent.mouse="moveFab"
      v-ripple
    >
      <q-icon
        size="md"
        class="q-ml-xs"
        color="white"
        style="margin-top: 15px"
        name="search"
      />
      <q-menu
        max-height="85vh"
        v-model="searchTool"
        anchor="bottom left"
        self="bottom right"
      >
        <SearchTool
          @add-shop="addShop"
          @individual-sale="handleIndividualSale"
        />
      </q-menu>
    </q-avatar>
  </q-page-sticky>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue';
import SearchTool from './SearchTool.vue';
import DiscountCalculator from './create/DiscountCalculator.vue';
import CommonSaleHeader from './CommonSaleHeader.vue';
import SubdivideList from '../packaging/SubdivideList.vue';
import SaleLine from './create/SaleLine.vue';
import { Batch, SaleLineInput } from '../../graphql/types';
import { useQuasar } from 'quasar';
import { getMedicineName, saleLineCost } from '../../graphql/utils/utils';

export default defineComponent({
  name: 'TableSale',
  components: {
    SearchTool,
    SaleLine,
    SubdivideList,
    DiscountCalculator,
    CommonSaleHeader
  },
  emits: ['sell'],
  props: {
    done: {
      type: Boolean,
      default: false
    },
    existingIds: {
      type: Array as PropType<number[]>,
      default: () =>([])
    },
  },
  setup(props) {
    const shop = ref<Batch[]>([]);
    const saleLines = ref<SaleLineInput[]>([]);
    watch(() => props.done, (done) => {
      if(done) {
        shop.value.forEach((batch, index) => {
          batch.currentStock -= saleLines.value[index].quantity;
        });
      }
    });
    const { notify } = useQuasar();
    const costs = computed(() => {
      let total = 0;
      const lines: number[] = [];
      const zeros: number[] = [];
      saleLines.value.forEach((saline, index) => {
        lines.push(saleLineCost(saline));
        total += lines[index];
        if(saline.quantity === 0)zeros.push(index + 1);
      });
      return { total: total.toFixed(3), lines, zeros }
    });
    const uSize = ref<number>(0);
    function setUSize() {
      const x = shop.value.find(b => b.medicine.packaging.units.length > uSize.value);
      if(x)uSize.value = x.medicine.packaging.units.length;
    }
    function addShop(batch: Batch) {
      const source1 = shop.value.find(s => s.id === batch.id);
      const source2 = props.existingIds.find(id => id === batch.id);
      if(!source1 && !source2) {
        shop.value.push(batch);
        saleLines.value.push({
          batchId: batch.id,
          quantity: 0,
          price: batch.medicine.currentSalePrice,
          vat: batch.medicine.currentVat,
          discount: 0
        })
        setUSize();
      }else notify({
        position: 'top-right',
        color: 'warning',
        icon: 'warning',
        message: source1 ? 'Déjà en cours !': 'Déjà dans la liste de vente !'
      })
    }
    function removeShop(index: number) {
      shop.value.splice(index, 1);
      saleLines.value.splice(index, 1);
      setUSize();
    }
    function reset() {
      shop.value.length = 0;
      saleLines.value.length = 0;
    }
    function handleIndividualSale(b: Batch) {
      const batch = shop.value.find(s => s.id === b.id);
      if(batch)Object.assign(batch, b);
    }
    const fabPos = ref([ 8, 8 ]);
    const searchTool = ref<boolean>(true);
    return {
      saleLines,
      addShop,
      removeShop,
      shop,
      getMedicineName,
      uSize,
      costs,
      reset,
      handleIndividualSale,
      fabPos,
      searchTool,
      moveFab (ev: any) {
        if(ev.isFirst !== true && !ev.isFinal && searchTool.value)
          searchTool.value = false;
        fabPos.value = [
          fabPos.value[0] - ev.delta.x,
          fabPos.value[1] - ev.delta.y
        ]
      }
    }
  }
});
</script>

<style lang="scss" scoped>
</style>
