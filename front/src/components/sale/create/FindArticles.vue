<template>
  <q-card
    square
    bordered
    :style="`width: 700px; max-width: 80vw;transform:translate(${pos[0]}px,${pos[1]}px)`"
    v-touch-pan.prevent.mouse="moveFab"
  >
    <q-card-section horizontal class="justify-between q-pa-sm">
      <div class="text-h6">Médicaments & Lots</div>
      <q-input
        :model-value="searchInput.keyword"
        dense
        debounce="300"
        v-model="searchInput.keyword"
        placeholder="Chercher des articles"
        @update:model-value="submitSearch"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card-section>
    <ScrollArea :style="`height:${$q.screen.height - 225}px;`" class="q-pa-sm">
      <ArticleMedicinesBatches
        v-for="art in articles.items"
        :key="art.id"
        :article="art"
        @add-shop="$emit('add-shop', $event)"
      />
      <q-inner-loading :showing="listLoading">
        <q-spinner-ball size="80px" color="primary" />
      </q-inner-loading>
    </ScrollArea>
    <q-separator />
    <q-card-actions align="center">
      <q-pagination
        outline
        :model-value="searchInput.page"
        v-model="searchInput.page"
        color="primary"
        :max="articles.meta.totalPages"
        :max-pages="6"
        boundary-numbers
        @update:model-value="submitSearch"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Batch } from '../../../graphql/types';
import { usePaginateArticle } from '../../../graphql/article/article.service';
import ScrollArea from '../../shared/ScrollArea.vue';
import ArticleMedicinesBatches from './ArticleMedicinesBatches.vue';

export default defineComponent({
  name: 'FindArticles',
  components: {ScrollArea, ArticleMedicinesBatches},
  emits: ['add-shop'],
  setup() {
    const pos = ref([0, 0])
    return {
      pos,
      selectedBatches: ref<Batch[]>([]),
      ...usePaginateArticle(1),
      moveFab (ev: any) {
        pos.value = [pos.value[0] + ev.delta.x, pos.value[1] + ev.delta.y];
      }
    }
  }
});
</script>

<style lang="sass">
</style>
