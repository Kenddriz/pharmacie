<template>
  <q-dialog ref="dialogRef">
    <MovableCard resizable>
      <template v-slot:title>
        {{command.provider.name}} - {{command.provider.address}}
      </template>
      <CommandLineDetails
        v-if="command?.invoice"
        :command="command"
      />
      <UpdateCommand
        v-else
        :command="command"
      />
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { Command } from '../../graphql/types';
import UpdateCommand from '../command/UpdateCommand.vue';
import CommandLineDetails from '../command-line/CommandLineDetails.vue';
import MovableCard from '../shared/MovableCard.vue';

export default defineComponent({
  name: 'ProviderCommandDetails',
  components: {
    UpdateCommand,
    CommandLineDetails,
    MovableCard
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
