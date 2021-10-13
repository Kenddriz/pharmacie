<template>
  <q-card style="width: 600px; max-width: 600px" square>
    <q-bar class="bg-teal-14 text-white">
      <q-icon name="delete" />
      <span style="font-size: 12px!important;">
          {{article.commercialName}}
        </span>
      <q-space />
      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip class="bg-white text-primary">Fermer</q-tooltip>
      </q-btn>
    </q-bar>
    <ScrollArea
      :style="`height:${$q.screen.height - 80}px`"
      v-if="medicineCount > 0"
      class="q-pa-sm"
    >
      <q-item class="full-width text-body1">
        <q-item-section>
          <q-item-label>Vous ne pouvez pas supprimer cet article</q-item-label>
          <q-item-label caption>
            Il est utilisé par {{medicineCount}} médicament{{medicineCount > 1 ? 's' : ''}}.
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator class="q-my-sm" />
      <MedicineList :article="article" />
    </ScrollArea>
    <q-card-section
      v-else style="height: 90%"
      class="column justify-center items-center"
    >
      <p class="text-subtitle1 text-center">
        L'article n'est pas utilisé.
      </p>
      <q-btn
        no-caps
        rounded
        v-close-popup
        icon="delete_forever"
        color="red"
        outline
        label="Supprimer"
        @click="softRemoveArticle(article.id)"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Article } from '../../graphql/types';
import { useSoftRemoveArticle } from '../../graphql/article/article.service';
import { getMedicineName } from '../../graphql/utils/utils';
import MedicineList from '../medicine/MedicineList.vue';
import ScrollArea from '../shared/ScrollArea.vue';

export default defineComponent({
  name: 'SoftRemoveArticle',
  components: { MedicineList, ScrollArea },
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true
    }
  },
  setup(props) {
    return {
      ...useSoftRemoveArticle(),
      getMedicineName,
      medicineCount: props.article?.medicines?.length
    }
  }
});
</script>

<style scoped>

</style>
