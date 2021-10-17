<template>
  <q-dialog style="overflow: hidden" seamless ref="dialogRef">
    <MovableCard resizable class="resizable">
      <template v-slot:title>
        Médicaments dependant {{$t('measure.delete.' + foreignKey)}}
        <q-badge align="top" color="warning">{{medicines.size}}</q-badge>
      </template>
      <q-list v-if="medicines.size" separator>
        <q-item clickable v-for="(med, index) in medicines.list" :key="index">
          <q-item-section side>{{index + 1}}</q-item-section>
          <q-item-section>
            <q-item-label>
              {{getMedicineName(med)}}
            </q-item-label>
            <q-item-label class="text-brown" caption>
              {{med.archivedAt ? 'archivé' : 'non archivé'}}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            {{med.packaging.units.map(u => u.label).join(' - ')}}
          </q-item-section>
          <q-item-section side>
            <q-btn icon="more_vert" color="primary" flat round />
          </q-item-section>
        </q-item>
      </q-list>
      <NoData :total-items="medicines.size" :sizes="[50, 150]" :loading="listLoading">
        <div class="text-subtitle1">L'élément n'est pas utilisé.</div>
        <div class="row q-gutter-md q-mt-ms">
          <q-btn
            icon="cancel"
            no-caps
            outline
            rounded
            label="Annuler"
            color="primary"
            v-close-popup
          />
          <q-btn
            v-close-popup
            icon="delete_forever"
            no-caps
            outline
            rounded
            label="Supprimer"
            color="primary"
            text-color="red"
            @click="submitDelete"
          />
        </div>
      </NoData>
      <template v-slot:footer>
        <q-banner class="full-width">
          L'élément est utilisé dans {{ medicines.size }}
          médicament{{medicines.size > 1 ? 's' : ''}}.
          <template v-slot:action>
            <q-pagination
              :model-value="searchInput.page"
              :disable="articles.meta.totalPages <= 1"
              flat
              v-model="searchInput.page"
              :max="articles.meta.totalPages"
              input
              icon-first="skip_previous"
              icon-last="skip_next"
              icon-prev="fast_rewind"
              icon-next="fast_forward"
            />
          </template>
        </q-banner>
      </template>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getMedicineName } from '../../graphql/utils/utils';
import { useDialogPluginComponent } from 'quasar';
import { useDeleteForm } from '../../graphql/form/form.service';
import { useSoftRemovePackaging } from '../../graphql/packaging/packaging.service';
import { useDeleteDosage } from '../../graphql/dosage/dosage.service';
import MovableCard from '../shared/MovableCard.vue';
import NoData from '../shared/NoData.vue';
import { usePaginateArticle } from '../../graphql/article/article.service';
import { Article, Medicine } from '../../graphql/types';

export default defineComponent({
  name: 'MedicinesUseMeasure',
  components: { MovableCard, NoData },
  props: {
    measureId: {
      type: Number,
      required: true
    },
    foreignKey: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { dialogRef } = useDialogPluginComponent();
    const {
      listLoading,
      searchInput,
      articles,
      submitSearch
    } = usePaginateArticle(4, false, { foreignKey: props.foreignKey, id: props.measureId });
    const medicines = computed(() => {
      const list: Medicine[] = [];
      let table = 'packaging';
      switch (props.foreignKey) {
        case 'dosageId':
          table = 'dosage';
          break;
        case 'formId':
          table = 'form';
          break;
      }
      articles.value.items.forEach((art: Article) => {
        const { medicines, ...article } = art;
        medicines?.forEach((med: Medicine) => {
          if((med as any)[table].id === props.measureId) {
            list.push({ ...med, article });
          }
        });
      });
      return {list, size: articles.value.meta.totalItems };
    })
    const { softRemovePackaging } = useSoftRemovePackaging();
    const { deleteForm } = useDeleteForm();
    const { deleteDosage } = useDeleteDosage();
    function submitDelete() {
      switch (props.foreignKey) {
        case 'packagingId':
          softRemovePackaging(props.measureId);
          break;
        case 'formId':
          deleteForm(props.measureId);
          break;
        case 'dosageId':
          deleteDosage(props.measureId);
          break;
      }
    }
    return {
      medicines,
      getMedicineName,
      dialogRef,
      submitDelete,
      listLoading,
      searchInput,
      submitSearch,
      articles
    }
  }
});
</script>

<style lang="scss" scoped>
  .resizable {
    width: 700px;
    height: 350px;
  }
</style>
