<template>
  <q-btn
    align="left"
    color="orange"
    flat
    dense
    no-caps
    outline
    icon="drive_file_move"
    label="Archiver"
  >
    <q-popup-proxy>
      <q-banner>
        <template v-slot:avatar>
          <q-icon size="sm" name="delete" color="orange" />
        </template>
        {{count === 0 ? 'Aucun mouvement de vente sur ce lot' :
        'Ce lot contient ' + count + ' mouvement' + (count > 1 ? 's' : '') + ' de stock.'
        }}
        <template v-slot:action>
          <q-btn
            dense
            v-if="count === 0"
            no-caps
            flat
            color="orange"
            label="Supprimer"
            @click="softRemove(id)"
          />
          <q-btn
            v-else
            align="left"
            color="primary"
            flat
            no-caps
            dense
            label="Fiche de stock"
            @click="$emit('stock')"
          />
          <q-btn
            dense
            v-close-popup
            no-caps
            flat
            color="positive"
            label="Fermer"
          />
        </template>
      </q-banner>
    </q-popup-proxy>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useCountStockMovements, useSoftRemoveBatch } from '../../graphql/batch/batch.service';

export default defineComponent({
  name: 'RemoveBatch',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  emits: ['stock'],
  setup(props) {
    const { count, getCount } = useCountStockMovements(props.id);
    watch(() => props.id, id => getCount(id));
    return {
      count,
      ...useSoftRemoveBatch()
    }
  }
});
</script>

<style scoped>

</style>
