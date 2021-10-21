<template>
  <q-page class="q-pa-xs">
    <q-splitter v-model="splitterModel">
      <template v-slot:before>
        <q-tabs
          stretch
          no-caps
          v-model="tab"
          vertical
          active-color="primary"
        >
          <q-tab icon="shopping_cart" name="create" label="Vente" />
          <q-tab icon="shop_two" name="story" label="Historique" />
          <q-tab icon="personal_injury" name="patient" label="Patients" />
        </q-tabs>
      </template>
      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
          keep-alive
        >
          <q-tab-panel :style="heightStyle" class="q-pa-xs" name="create">
            <GroupSale />
          </q-tab-panel>

          <q-tab-panel :style="heightStyle" class="q-pa-none" name="story">
            <SaleStory @add="tab = 'create'" />
          </q-tab-panel>

          <q-tab-panel :style="heightStyle" class="q-pa-none" name="patient">
            <PatientCpt />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import GroupSale from '../../components/sale/create/GroupSale.vue';
import SaleStory from '../../components/sale/story/SaleStory.vue'
import { useQuasar } from 'quasar';
import PatientCpt from '../../components/Patient/PatientCpt.vue';

export default defineComponent({
  name: 'Sale',
  components: { GroupSale, SaleStory, PatientCpt },
  setup() {
    const { screen } = useQuasar();
    const heightStyle = computed(() => `height:${screen.height - 74}px;`);
    return {
      tab: ref<string>('create'),
      splitterModel: ref(10),
      heightStyle
    }
  }
});
</script>

<style lang="sass">

</style>
