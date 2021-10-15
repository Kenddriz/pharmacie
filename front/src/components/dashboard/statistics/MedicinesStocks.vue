<template>
  <q-card class="fit" style="height: 300px" flat bordered>
    <q-card-section class="q-py-none">
      <q-input
        :model-value="searchInput.keyword"
        dense
        placeholder="Entrer un nom d'article et taper la touche entrée"
        @update:model-value="searchInput.keyword = $event"
        @keyup.enter="submitSearch"
        :loading="listLoading"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card-section>
    <ScrollArea style="height: 240px" class="q-pa-md">
      <template v-for="art in articles.items" :key="art.id">
        <Divider align="center" class="text-blue-grey-14 text-capitalize">
          {{art?.commercialName}}
        </Divider>
        <q-list dense class="text-blue-grey-14">
          <template v-if="art.medicines.length">
            <q-item
              v-for="(med, iMed) in art.medicines"
              :key="iMed"
            >
              <q-item-section side>
                {{ iMed + 1}}
              </q-item-section>
              <q-item-section side>
                {{med.dosage.label}}, {{med.form.label}}
              </q-item-section>
              <q-item-section class="text-center">
                <SubdivideList
                  class="flex-center"
                  :units="med.packaging.units"
                  :current-stock="med.stockTotal"
                />
              </q-item-section>
            </q-item>
          </template>
          <q-item v-else>
            Aucune forme & dosage
          </q-item>
        </q-list>
      </template>
    </ScrollArea>
    <template v-if="articles.meta.totalPages < 1">
      <q-separator inset />
      <q-card-actions align="center">
        <q-pagination
          :model-value="searchInput.page"
          v-model="searchInput.page"
          outline
          color="grey"
          :max="articles.meta.totalPages"
          :max-pages="10"
          boundary-numbers
          @update:model-value="submitSearch"
        />
      </q-card-actions>
    </template>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePaginateArticle } from '../../../graphql/article/article.service';
import SubdivideList from '../../packaging/SubdivideList.vue';
import Divider from '../../shared/Divider.vue';
import ScrollArea from '../../shared/ScrollArea.vue';

export default defineComponent({
  name: 'MedicinesStocks',
  components: { SubdivideList, Divider, ScrollArea },
  setup() {
    return {
      ...usePaginateArticle(10, false)
    }
  }
});
</script>

<style scoped>

</style>
