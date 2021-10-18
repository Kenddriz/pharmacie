<template>
  <q-dialog ref="dialogRef">
    <MovableCard resizable>
      <template v-slot:title>
        Mise à jour de la ligne de commande
      </template>
      <CommandLineForm
        class="q-pa-lg"
        @save="updateCommandLine(commandLine.id, $event);"
        :command-line="commandLine"
      />
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CommandLineForm from './CommandLineForm.vue';
import { useDialogPluginComponent } from 'quasar';
import MovableCard from '../shared/MovableCard.vue';
import { useUpdateCommandLine } from '../../graphql/command-line/commandLine.service';
import { CommandLine } from '../../graphql/types';

export default defineComponent({
  name: 'UpdateCommandLine',
  components: { CommandLineForm, MovableCard },
  props: { commandLine: Object as PropType<CommandLine>},
  setup() {
    const { dialogRef, onDialogHide } = useDialogPluginComponent() ;
    return {
      dialogRef,
      ...useUpdateCommandLine(),
      onDialogHide
    }
  }
});
</script>

<style scoped>

</style>
