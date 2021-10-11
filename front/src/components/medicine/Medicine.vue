<template>
  <q-splitter
    :model-value="insideModel"
    v-model="insideModel"
    style="height: 81vh"
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
    </template>
  </q-splitter>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Article } from '../../graphql/types';
import BatchCpt from '../batch/Batch.vue';
import MedicineList from './MedicineList.vue';
import AddMedicine from './AddMedicine.vue';

export default defineComponent({
  name: 'Medicine',
  components: { AddMedicine, MedicineList, BatchCpt },
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
