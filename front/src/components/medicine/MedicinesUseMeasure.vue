<template>
  <q-dialog seamless full-height ref="dialogRef">
    <q-card
      style="width: 700px; max-width: 80vw;"
      class="text-blue-grey-14"
      :style="`width: 700px; max-width: 80vw;transform:translate(${pos[0]}px,${pos[1]}px)`"
      v-touch-pan.prevent.mouse="move"
    >
      <q-card-section class="row justify-between items-center">
        <div class="text-h6">
          Médicaments dependant {{$t('measure.delete.' + foreignKey)}}
          <q-badge align="top" color="warning">{{size}}</q-badge>
        </div>
        <q-btn v-close-popup dense size="sm" unelevated color="red" icon="close" />
      </q-card-section>
      <q-separator />
      <q-card-section style="height: 75%" class="q-pa-none overflow-auto">
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
        <q-inner-loading class="text-h6" :showing="!loading && !size">
          L'élément n'est pas utilisé.
          <div class="row q-gutter-md q-mt-md">
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
        </q-inner-loading>
        <q-inner-loading :showing="loading">
          <q-spinner-cube size="80" color="warning" />
        </q-inner-loading>
      </q-card-section>
      <q-separator />
      <q-card-actions align="center" class="q-pa-none bg-grey-3">
        <q-banner class="full-width">
          L'élément est utilisé dans {{ size }}
          médicament{{size > 1 ? 's' : ''}}.
          <template v-slot:action>
            <q-pagination
              :disable="medicines.meta.totalPages <= 1"
              flat
              v-model="input.page"
              :max="medicines.meta.totalPages"
              direction-links
              boundary-links
              icon-first="skip_previous"
              icon-last="skip_next"
              icon-prev="fast_rewind"
              icon-next="fast_forward"
            />
          </template>
        </q-banner>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useFindMedicinesByMeasure } from '../../graphql/medicine/medicine.service';
import { getMedicineName } from '../../graphql/utils/utils';
import { useDialogPluginComponent } from 'quasar';
import { useDeleteForm } from '../../graphql/form/form.service';
import { useSoftRemovePackaging } from '../../graphql/packaging/packaging.service';
import { useDeleteDosage } from '../../graphql/dosage/dosage.service';

export default defineComponent({
  name: 'MedicinesUseMeasure',
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
    const size = computed(() => medicines.value.meta.totalItems);
    const pos = ref([0, 0]);
    return {
      medicines,
      loading,
      input,
      getMedicineName,
      dialogRef,
      size,
      pos,
      submitDelete,
      move(ev: any) {
        pos.value = [pos.value[0] + ev.delta.x, pos.value[1] + ev.delta.y];
      },

    }
  }
});
</script>

<style scoped>

</style>
