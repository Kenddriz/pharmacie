<template>
    <q-table
      square
      flat
      :rows="articlePagination.items"
      :columns="columns"
      row-key="id"
      separator="none"
      hide-bottom
      class="sticky-header-table"
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
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Article, ArticlePagination } from '../../graphql/types';

export default defineComponent({
  name: 'Article',
  components: { },
  props: {
    articlePagination: Object as PropType<ArticlePagination>,
    selected: Array as PropType<Article[]>,
    loading: Boolean,
    keyword: String,
    page: Number,
    max: Number,
    maxPages: Number
  },
  emits: ['edit', 'update:selected', 'update:keyword', 'update:page', 'search'],
  setup() {
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
      ]
    }
  }
});
</script>

<style scoped lang="sass">
.sticky-header-table
  /* height or max-height is important */
  max-height: 100%
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
