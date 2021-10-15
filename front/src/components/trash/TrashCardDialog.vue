<template>
  <q-card square>
    <q-bar class="bg-teal-14 text-white">
      <span style="font-size: 12px">{{title}}</span>
      <q-space />
      <q-btn v-close-popup flat dense icon="close" />
    </q-bar>
    <q-card-section style="height: calc(100% - 90px)" class="overflow-auto">
      <q-list v-if="totalItems">
        <slot></slot>
      </q-list>
      <NoData :total-items="totalItems" :loading="loading" />
    </q-card-section>
    <q-separator />
    <q-card-actions align="between">
      <q-btn
        :disable="totalItems === 0"
        no-caps
        color="red"
        flat
        label="Vider la corbeille"
        @click="clearTrash"
      />
      <slot name="pagination"></slot>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NoData from '../shared/NoData.vue';
import { useQuasar } from 'quasar';
import { useRemoveAllArchived } from '../../graphql/other/other.service';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'TrashCardDialog',
  emits: ['empty'],
  components: { NoData },
  props: {
    title: String,
    totalItems: {
      type: Number,
      default: 0
    },
    loading: Boolean,
    repo: {
      type: String,
      default: ''
    }
  },
  setup(props){
    const { dialog, loading } = useQuasar();
    const { t } = useI18n();
    const { clear } = useRemoveAllArchived();
    function clearTrash() {
      dialog({
        message: t(props.totalItems > 1 ? 'remove.many' : 'remove.title')||'',
        html: true,
        ok: {
          flat: true,
          label: 'Confirmer',
          color: 'amber',
          noCaps: true
        },
        cancel: {
          flat: true,
          color: 'primary',
          label: 'Annuler',
          noCaps: true
        },
      }).onOk(() => {
        loading.show({ message: 'Suppression ...'});
        clear(props.repo);
      });
    }
    return {
      clearTrash
    }
  }
});
</script>

<style scoped>

</style>
