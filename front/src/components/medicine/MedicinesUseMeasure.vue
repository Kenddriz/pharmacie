<template>
  <q-dialog style="overflow: hidden" seamless ref="dialogRef">
    <MovableCard resizable class="resizable">
      <template v-slot:title>
        Médicaments dependant {{$t('measure.delete.' + foreignKey)}}
        <q-badge align="top" color="warning">{{size}}</q-badge>
      </template>
      <q-list v-if="size" separator>
        <q-item clickable v-for="(med, index) in medicines.items" :key="index">
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
      <NoData :total-items="size" :sizes="[50, 150]" :loading="loading">
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
          L'élément est utilisé dans {{ size }}
          médicament{{size > 1 ? 's' : ''}}.
          <template v-slot:action>
            <q-pagination
              :model-value="input.page"
              :disable="medicines.meta.totalPages <= 1"
              flat
              v-model="input.page"
              :max="medicines.meta.totalPages"
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
import { useFindMedicinesByMeasure } from '../../graphql/medicine/medicine.service';
import { getMedicineName } from '../../graphql/utils/utils';
import { useDialogPluginComponent } from 'quasar';
import { useDeleteForm } from '../../graphql/form/form.service';
import { useSoftRemovePackaging } from '../../graphql/packaging/packaging.service';
import { useDeleteDosage } from '../../graphql/dosage/dosage.service';
import MovableCard from '../shared/MovableCard.vue';
import NoData from '../shared/NoData.vue';

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
    const { medicines, loading, input } = useFindMedicinesByMeasure(props.measureId, props.foreignKey);
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
      loading,
      input,
      getMedicineName,
      dialogRef,
      size: computed(() => medicines.value.meta.totalItems),
      submitDelete
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
