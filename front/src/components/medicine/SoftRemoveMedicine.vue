<template>
  <q-card style="width: 600px; max-width: 600px" square>
    <q-bar class="bg-teal-14 text-white">
      <q-icon name="delete" color="warning" />
      <span style="font-size: 12px">
          {{article.commercialName}} {{medicine.form.label}}, {{medicine.dosage.label}}
        </span>
      <q-space />
      <q-btn dense flat icon="close" v-close-popup />
    </q-bar>
    <ScrollArea
      :style="`height:${$q.screen.height - 80}px`"
      v-if="medicine.batches.length > 0"
      class="q-pa-sm"
    >
      <q-item class="col-12 text-body1">
        <q-item-section>
          <q-item-label>Vous ne pouvez pas supprimer ce médicament</q-item-label>
          <q-item-label caption>
            Il comporte {{batchCount}} lot{{batchCount > 1 ? 's' : ''}}.
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <Batch :article="article" :medicine="medicine" />
    </ScrollArea>
    <q-card-section
      v-else
      style="height: 90%"
      class="column justify-center items-center"
    >
      <p class="text-subtitle1 text-center">
        Le médicament n'est pas utilisé actuellement.
      </p>
      <q-btn
        no-caps
        rounded
        v-close-popup
        icon="delete"
        color="warning"
        outline
        label="Supprimer"
        @click="softRemoveMedicine(medicine.id)"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { Article, Medicine } from '../../graphql/types';
import Batch from '../batch/Batch.vue';
import { useSoftRemoveMedicine } from '../../graphql/medicine/medicine.service';
import ScrollArea from '../shared/ScrollArea.vue';
export default defineComponent({
  name: 'SoftRemoveMedicine',
  components: { Batch, ScrollArea },
  props: {
    medicine: {
      type: Object as PropType<Medicine>,
      required: true
    },
    article: {
      type: Object as PropType<Article>,
      required: true
    }
  },
  setup(props) {
    const { dialogRef } = useDialogPluginComponent();
    return {
      dialogRef,
      ...useSoftRemoveMedicine(),
      batchCount: props.medicine.batches.length
    }
  }
});
</script>
<style scoped>
</style>
