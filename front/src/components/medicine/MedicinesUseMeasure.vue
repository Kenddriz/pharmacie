<template>
  <q-dialog seamless ref="dialogRef">
    <MovableCard resizable class="resizable">
      <template v-slot:title>
        Médicaments dependant {{$t('measure.delete.' + foreignKey)}}
        <q-badge align="top" color="warning">{{params.size}}</q-badge>
      </template>
      <q-list separator>
        <template v-for="(article, iA) in articles.items" :key="iA">
          <template v-for="(med, iM) in article.medicines" :key="iM">
            <q-item clickable v-if="med[params.table].id === measureId" >
              <q-item-section side>{{iM + 1}}</q-item-section>
              <q-item-section>
                <q-item-label>
                  {{article.commercialName}} {{med.dosage.label}}, {{med.form.label}}
                </q-item-label>
              </q-item-section>
              <q-item-section>
                {{med.packaging.units.map(u => u.label).join(' - ')}}
              </q-item-section>
              <q-item-section side>
                <q-btn icon="more_vert" color="primary" flat round>
                  <MoreInfo :medicine="med" />
                </q-btn>
              </q-item-section>
            </q-item>
          </template>
        </template>
      </q-list>
      <NoData :total-items="params.size" :sizes="[50, 150]" :loading="listLoading">
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
          L'élément est utilisé dans {{ params.size }}
          médicament{{params.size > 1 ? 's' : ''}}.
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
import { useDialogPluginComponent } from 'quasar';
import { useDeleteForm } from '../../graphql/form/form.service';
import { useSoftRemovePackaging } from '../../graphql/packaging/packaging.service';
import { useDeleteDosage } from '../../graphql/dosage/dosage.service';
import MovableCard from '../shared/MovableCard.vue';
import NoData from '../shared/NoData.vue';
import { usePaginateArticle } from '../../graphql/article/article.service';
import { formatDate } from '../../shared/date';
import MoreInfo from './MoreInfo.vue';

export default defineComponent({
  name: 'MedicinesUseMeasure',
  components: { MovableCard, NoData, MoreInfo },
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
    let table = 'packaging';
    switch (props.foreignKey) {
      case 'dosageId':
        table = 'dosage';
        break;
      case 'formId':
        table = 'form';
        break;
    }
    const params = computed(() => {
      let size = 0;
      articles.value.items.forEach(article => {
        size += article.medicines.filter(med => (med as any)[table].id === props.measureId).length;
      })
      return { table, size };
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
      params,
      formatDate,
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
