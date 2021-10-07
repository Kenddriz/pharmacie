<template>
  <q-dialog :full-height="medicineCount > 0" ref="dialogRef">
    <q-card square>
      <q-bar class="bg-teal-14 text-white">
        <span style="font-size: 12px!important;">
          {{article.commercialName}}
        </span>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Fermer</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section
        class="column justify-center items-center"
        style="height: calc(100% - 35px)"
      >
        <template v-if="medicineCount > 0">
          <q-item class="full-width text-body1">
            <q-item-section>
              <q-item-label>Vous ne pouvez pas supprimer cet article</q-item-label>
              <q-item-label caption>
                Il est utilisé par {{medicineCount}} médicament{{medicineCount > 1 ? 's' : ''}}.
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <MedicineList :article="article" />
        </template>
        <div v-else>
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
            label="Supprimer définitivement"
            @click="deleteForeverArticle(article.id)"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Article } from '../../graphql/types';
import { useDeleteForeverArticle } from '../../graphql/article/article.service';
import { getMedicineName } from '../../graphql/utils/utils';
import MedicineList from '../medicine/MedicineList.vue';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  name: 'DeleteForeverArticle',
  components: {
    MedicineList
  },
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true
    }
  },
  setup(props) {
    const { dialogRef } = useDialogPluginComponent();
    return {
      ...useDeleteForeverArticle(),
      getMedicineName,
      dialogRef,
      medicineCount: props.article.medicines?.length
    }
  }
});
</script>

<style scoped>

</style>
