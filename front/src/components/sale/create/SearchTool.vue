<template>
  <q-card
    square
    bordered
    style="width: 700px;"
  >
    <q-card-section>
      <q-input
        outlined
        label="Entrer le nom de l'article"
        :model-value="keyword"
        v-model="keyword"
        dense
        hide-bottom-space
        @update:model-value="findArticle"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
        <template v-slot:after>
          <q-btn dense v-close-popup icon="close" color="deep-orange" flat round />
        </template>
      </q-input>
    </q-card-section>
    <ScrollArea style="height: calc(86vh - 100px)" class="q-pa-sm">
      <ArticleMedicinesBatches
        v-if="article"
        :article="article"
        @add-shop="$emit('add-shop', $event)"
        @individual-sale="$emit('individual-sale', $event)"
      />
      <q-inner-loading
        class="text-blue-grey-14 text-h6"
        color="white"
        :showing="!article && !faLoading"
      >
        Aucun médicament disponible
      </q-inner-loading>
      <q-inner-loading :showing="faLoading">
        <q-spinner-ball size="80px" color="primary" />
      </q-inner-loading>
    </ScrollArea>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ArticleMedicinesBatches from './ArticleMedicinesBatches.vue';
import ScrollArea from '../../shared/ScrollArea.vue';
import { useFindOneArticle } from '../../../graphql/article/article.service';

export default defineComponent({
  name: 'SearchTool',
  components: { ArticleMedicinesBatches,ScrollArea },
  emits: ['add-shop', 'individual-sale'],
  setup() {
    return {
      ...useFindOneArticle()
    }
  }
});
</script>

<style scoped>

</style>
