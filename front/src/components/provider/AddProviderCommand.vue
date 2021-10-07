<template>
  <q-dialog
    full-width
    full-height
    ref="dialogRef"
  >
    <q-card>
      <q-card-section>
        <AddCommand :provider="provider">
          <template v-slot:end>
            <q-btn unelevated icon="close" text-color="red" v-close-popup />
          </template>
        </AddCommand>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import AddCommand from '../command/AddCommand.vue';
import { Provider } from '../../graphql/types';

export default defineComponent({
  name: 'AddProviderCommand',
  components: { AddCommand },
  props: {
    provider: {
      type: Object as PropType<Provider>,
      required: true
    }
  },
  setup() {
    const { dialogRef } = useDialogPluginComponent();
    return {
      dialogRef
    }
  }
});
</script>

<style scoped>

</style>
