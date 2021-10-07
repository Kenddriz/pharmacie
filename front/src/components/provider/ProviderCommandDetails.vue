<template>
  <q-dialog
    ref="dialogRef"
    full-width
    full-height
  >
    <q-card>
      <q-bar class="bg-primary text-white">
        <q-icon size="md" name="person" />
        <div class="text-h6">
          {{command.provider.name}} - {{command.provider.address}}
        </div>
        <q-space />
        <q-btn v-close-popup color="red" flat round icon="close" />
      </q-bar>
      <q-card-section>
        <CommandLineDetails
          v-if="command?.invoice"
          :command="command"
        />
        <UpdateCommand
          v-else
          :command="command"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { Command } from '../../graphql/types';
import UpdateCommand from '../command/UpdateCommand.vue';
import CommandLineDetails from '../command-line/CommandLineDetails.vue';

export default defineComponent({
  name: 'ProviderCommandDetails',
  components: {
    UpdateCommand,
    CommandLineDetails
  },
  props: {
    command: {
      type: Object as PropType<Command>,
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
