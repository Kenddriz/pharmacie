<template>
  <q-page class="q-pa-sm">
    <q-splitter
      v-model="splitterModel"
      style="height: 83vh"
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
        <q-splitter
          v-model="insideModel"
        >

          <template v-slot:before>
            <Medicine :article="selected[0]">
              <template v-slot:add>
                <q-menu>
                  <MedicineForm />
                </q-menu>
              </template>
            </Medicine>
          </template>

          <template v-slot:separator>
            <q-avatar color="amber" text-color="white" size="lg" icon="drag_indicator" />
          </template>

          <template v-slot:after>
            <div class="q-pa-md">
              <div class="text-h4 q-mb-md">Lots</div>
            </div>
          </template>

        </q-splitter>
      </template>

    </q-splitter>
    <!--dialog -->
    <q-dialog v-model="articleDialog">
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-icon name="info" />
          <q-icon name="delete_forever" />
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
import { useArticle, useSaveArticle } from '../../graphql/article/article.service';
import ArticleForm from '../../components/article/ArticleForm.vue';
import Medicine from '../../components/medicine/Medicine.vue';
import MedicineForm from '../../components/medicine/MedicineForm.vue';

export default {
  name: 'MedicinePage',
  components: {Article, ArticleForm, Medicine, MedicineForm},
  setup () {
    return {
      splitterModel: ref(25), // start at 50%
      insideModel: ref(50),
      ...useArticle(),
      ...useSaveArticle()
    }
  }
};
</script>

<style scoped)>

</style>
