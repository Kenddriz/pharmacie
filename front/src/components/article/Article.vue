<template>
    <q-table
      square
      flat
      :rows="articlePagination.items"
      :columns="columns"
      row-key="id"
      separator="none"
      hide-bottom
      class="sticky-header-table text-blue-grey-14"
      selection="single"
      :selected="selected"
      @update:selected="$emit('update:selected', $event)"
      :loading="loading"
    >
      <template v-slot:body-selection="scope">
        <q-fab
          flat
          :color="scope.selected ? 'positive' : 'dark'"
          icon="read_more"
          direction="right"
          padding="xs"
        >
          <q-fab-action
            square
            label="Détails"
            padding="xs"
            color="primary"
            @click="scope.selected = true"
          />
          <q-fab-action
            square
            label="Editer"
            padding="xs"
            color="primary"
            @click="$emit('edit', scope.row)"
          />
          <q-fab-action
            square
            label="Supprimer"
            padding="xs"
            color="red"
            @click="scope.selected = true;dialogRemove = true"
          />
        </q-fab>
      </template>
      <template v-slot:top>
        <div class="col-5 q-table__title">Articles({{articlePagination.meta.totalItems}})</div>
        <q-btn size="xs" color="positive" round icon="add">
          <q-menu>
            <slot name="add"></slot>
          </q-menu>
        </q-btn>
        <q-space />
        <div class="flex no-wrap q-gutter-sm q-ma-sm">
          <q-input
            :model-value="keyword"
            borderless
            dense
            placeholder="Chercher ..."
            @update:model-value="$emit('update:keyword', $event)"
            @keyup.enter="$emit('search')"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-pagination
            v-if="articlePagination.meta.totalPages > 1"
            :model-value="page"
            outline
            color="grey"
            :max="articlePagination.meta.totalPages"
            :max-pages="4"
            boundary-numbers
            @update:model-value="$emit('update:page', $event);$emit('search')"
          />
        </div>
      </template>
    </q-table>
    <q-dialog
      full-height
      v-model="dialogRemove"
    >
      <SoftRemoveArticle
        v-if="selected.length"
        :article="selected[0]"
      />
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Article, ArticlePagination } from '../../graphql/types';
import SoftRemoveArticle from './SoftRemoveArticle.vue';

export default defineComponent({
  name: 'Article',
  components: { SoftRemoveArticle },
  props: {
    articlePagination: Object as PropType<ArticlePagination>,
    selected: {
      type: Array as PropType<Article[]>,
      required: true
    },
    loading: Boolean,
    keyword: String,
    page: Number,
    max: Number,
    maxPages: Number
  },
  emits: ['edit', 'update:selected', 'update:keyword', 'update:page', 'search'],
  setup() {
    const dialogRemove = ref<boolean>(false);
    return {
      columns: [
        {
          name: 'dci',
          label: 'DCI',
          align: 'left',
          field: 'dci',
          sortable: true
        },
        {
          name: 'commercialName',
          label: 'Nom Commercial',
          align: 'left',
          field: 'commercialName',
          sortable: true
        }
      ],
      dialogRemove
    }
  }
});
</script>

<style scoped lang="sass">
.sticky-header-table
  /* height or max-height is important */
  max-height: 100%
</style>
