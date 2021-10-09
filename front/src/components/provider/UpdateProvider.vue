<template>
  <q-dialog ref="dialogRef">
    <ProviderForm
      mode="update"
      style="min-width: 400px"
      :model-value="updateInput"
      @submit="updateProvider($event)"
    />
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Provider } from '../../graphql/types';
import { useDialogPluginComponent } from 'quasar';
import ProviderForm from './ProviderForm.vue';
import { useSaveProvider } from '../../graphql/provider/provider.service';

export default defineComponent({
  name: 'UpdateProvider',
  components: { ProviderForm },
  props: {
    provider: {
      type: Object as PropType<Provider>,
      required: true
    }
  },
  setup(props) {
    const { updateInput, setUpdateInput, updateProvider } = useSaveProvider();
    setUpdateInput(props.provider);
    const { dialogRef } = useDialogPluginComponent();
    return {
      dialogRef,
      updateInput,
      updateProvider
    }
  }
});
</script>

<style scoped>

</style>
