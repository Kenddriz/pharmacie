<template>
  <q-splitter
    :model-value="insideModel"
    v-model="insideModel"
    style="height: 82vh"
    class="text-blue-grey-14"
  >
    <template v-slot:before>
      <div class="q-pa-md">
        <div class="q-table__title q-mb-md">
          Formes et dosages
          <AddMedicine :article-id="article.id" />
        </div>
        <MedicineList
          :article="article"
          v-model="selectedMedicine"
        />
      </div>
    </template>
    <template v-slot:separator>
      <q-avatar color="amber" text-color="white" size="lg" icon="drag_indicator" />
    </template>
    <template v-slot:after>
      <BatchCpt
        v-if="selectedMedicine"
        :medicine="selectedMedicine"
        :article="getArticle()"
      />
      <NoData
        :total-items="selectedMedicine?.batches?.length||0"
        :loading="false"
        :sizes="[70, 100]"
      >
        <div class="text-subtitle1">
          {{ selectedMedicine ? 'Aucune donnée' : 'Ajouter un médicament' }}
        </div>
      </NoData>
    </template>
  </q-splitter>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Article } from '../../graphql/types';
import BatchCpt from '../batch/Batch.vue';
import MedicineList from './MedicineList.vue';
import AddMedicine from './AddMedicine.vue';
import NoData from '../shared/NoData.vue';

export default defineComponent({
  name: 'Medicine',
  components: { AddMedicine, MedicineList, BatchCpt, NoData },
  props: {
    article: {
      type: Object as PropType<Article>,
      default: () => ({}),
    }
  },
  setup(props) {
    const selectedMedicine = ref<any>(null);
    return {
      insideModel: ref(50),
      selectedMedicine,
      getArticle: () => {
        return {
          id: props.article.id,
          commercialName: props.article.commercialName
        }
      }
    }
  }
});
</script>

<style lang="sass">

</style>
