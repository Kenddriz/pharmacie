<template>
  <q-page class="q-pa-xs">
    <q-splitter
      v-model="splitterModel"
      style="height: 88vh"
    >
      <template v-slot:before>
        <Article
          v-model:selected="selected"
          :article-pagination="articles"
          @edit="setSaveInput"
          :loading="listLoading||saveLoading"
          v-model:keyword="searchInput.keyword"
          v-model:page="searchInput.page"
          @search="submitSearch()"
        >
          <template v-slot:add>
            <ArticleForm @submit="addArticle($event)">
              <template v-slot:title>
                <div class="text-subtitle1 row justify-between items-center">
                  {{$tm('article.update')}}
                  <q-icon class="cursor-pointer" v-close-popup name="close" color="red" size="sm" />
                </div>
              </template>
            </ArticleForm>
          </template>
        </Article>
      </template>
      <template v-slot:separator>
        <q-avatar color="amber" text-color="white" size="lg" icon="drag_indicator" />
      </template>
      <template v-slot:after>
        <div v-if="listLoading" class="row full-height justify-center items-center">
          <q-spinner-oval size="8rem" color="positive" />
        </div>
        <template v-else-if="selected.length">
          <div class="text-h6 text-center text-blue-grey-14">
            Détails d'article «{{selected[0].commercialName}}»
          </div>
          <Medicine :article="selected[0]" />
        </template>
      </template>
    </q-splitter>
    <!--dialog -->
    <q-dialog v-model="articleDialog">
      <q-card square>
        <q-bar class="bg-primary text-white">
          <q-icon size="sm" color="warning" name="delete_forever" />
          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Fermer</q-tooltip>
          </q-btn>
        </q-bar>
        <ArticleForm
          :model="saveInput"
          @submit="updateArticle($event)"
          mode="update"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { ref } from 'vue';
import Article from '../../components/article/Article.vue';
import { usePaginateArticle, useSaveArticle } from '../../graphql/article/article.service';
import ArticleForm from '../../components/article/ArticleForm.vue';
import Medicine from '../../components/medicine/Medicine.vue';

export default {
  name: 'MedicinePage',
  components: {Article, ArticleForm, Medicine},
  setup () {
    return {
      splitterModel: ref(35), // start at 26%
      ...usePaginateArticle(),
      ...useSaveArticle()
    }
  }
};
</script>

<style scoped)>

</style>
