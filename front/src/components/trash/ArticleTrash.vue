<template>
  <TrashCardBase
    @click="show = true"
    label="Articles"
    :loading="loading"
    :total="article.meta.totalItems"
  />
  <q-dialog full-width full-height v-model="show">
    <TrashCardDialog
      :total-items="article.meta.totalItems"
      :title="`Articles supprimés(${article.meta.totalItems})`"
      :loading="loading"
      repo="Article"
    >
      <q-item v-for="(item, index) in article.items" :key="index">
        <q-item-section avatar>
          <q-avatar size="sm" color="primary" text-color="white">{{index +1 }}</q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{item.commercialName}}</q-item-label>
          <q-item-label caption>{{item.dci}}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Date de création</q-item-label>
          <q-item-label caption>{{formatDate(item.createdAt, 'DATE_TIME')}}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Date de suppression</q-item-label>
          <q-item-label caption>{{formatDate(item.archivedAt, 'DATE_TIME')}}</q-item-label>
        </q-item-section>
        <TrashOperations
          @restore="restore(item.id)"
          @remove="remove(item.id)"
        />
      </q-item>
      <template v-slot:pagination>
        <q-pagination
          :model-value="input.page"
          v-model="input.page"
          :max="article.meta.totalPages"
          input
          input-class="text-orange-10"
          :disable="article.meta.totalPages <= 1"
        />
      </template>
    </TrashCardDialog>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TrashCardBase from './TrashCardBase.vue';
import { usePaginateDeletedArticles, useRemoveArticle, useRestoreArticle } from '../../graphql/article/article.service';
import { formatDate } from '../../shared/date';
import TrashOperations from '../shared/MenuOperations.vue';
import TrashCardDialog from './TrashCardDialog.vue';

export default defineComponent({
  name: 'ArticleTrash',
  components: { TrashCardBase, TrashOperations, TrashCardDialog },
  setup() {
    return {
      show: ref<boolean>(false),
      ...usePaginateDeletedArticles(),
      ...useRestoreArticle(),
      ...useRemoveArticle(),
      formatDate
    }
  }
});
</script>

<style scoped>

</style>
