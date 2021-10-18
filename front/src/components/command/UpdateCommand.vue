<template>
  <q-table
    title="Lignes de commande"
    :rows="command.commandLines"
    :columns="cmData"
    row-key="id"
    separator="cell"
    hide-pagination
    flat
    bordered
    :loading="aclLoading"
    v-model:pagination="pagination"
    table-class="overflow-hidden text-blue-grey-14"
    no-data-label="Aucune ligne pour cette commande"
    :selected-rows-label="selectedLabel"
    selection="multiple"
    v-model:selected="assuredLines"
    title-class="text-blue-grey-14"
  >
    <template v-slot:top-right>
      <q-btn
        no-caps
        outline
        color="primary"
        label="Ajouter une ligne de commande"
        icon-right="add"
        class="q-mr-md"
      >
        <q-menu>
          <CommandLineForm
            class="q-pa-lg"
            @save="addCommandLine(command.id, $event)"
          >
            <template v-slot:title>
              Nouvelle ligne de commande
            </template>
          </CommandLineForm>
        </q-menu>
      </q-btn>

      <q-btn
        color="primary"
        icon-right="archive"
        label="version pdf"
        no-caps
        @click="downloadPdf(command)"
      />
    </template>
    <template v-slot:body="props">
      <q-tr no-hover :props="props">
        <q-td>
          <q-checkbox color="secondary" v-model="props.selected" :model-value="props.selected" />
        </q-td>
        <q-td key="medicine" :props="props">
          {{ getMedicineName(props.row.medicine) }}
        </q-td>
        <q-td key="quantity" :props="props">
          <UnitConverter
            :value="props.row.quantity||0"
            :units="props.row.medicine.packaging.units"
          />
        </q-td>
        <q-td class="row justify-between" style="height: 100%" key="action">
          <q-btn
            round
            icon="delete_forever"
            color="orange"
            size="md"
            flat
            @click="removeCommandLine(props.row.id)"
          />
          <q-btn
            round
            icon="edit"
            color="positive"
            size="md"
            flat
            @click="updateCommandLine(props.row)"
          />
        </q-td>
      </q-tr>
    </template>
    <template v-slot:bottom-row>
      <q-td colspan="100%">
        <q-icon size="sm" name="check_box" />
        Séléctionner les lignes de commande assurées pour les mettre en stock
      </q-td>
    </template>
  </q-table>
  <q-card flat bordered class="q-mt-md">
    <q-card-actions align="between">
      <q-btn
        v-close-popup
        no-caps
        rounded
        icon="delete_forever"
        color="red"
        label="Supprimer cette commande"
        @click="softRemoveCommand(command.id)"
      />
      <q-btn
        :disable="!assuredLines.length"
        no-caps
        unelevated
        rounded
        :icon="assuredLines.length ? 'local_shipping' : 'store'"
        color="warning"
        label="Passer à la facturation"
        @click="createInvoice"
      />
    </q-card-actions>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from 'vue';
import { Command, CommandLine } from '../../graphql/types';
import { cmData } from '../command-line/cmData';
import { formatDate } from '../../shared/date';
import CommandLineForm from '../command-line/CommandLineForm.vue';
import UpdateCommandLine from '../command-line/UpdateCommandLine.vue';
import {
  useAddCommandLine,
  useRemoveCommandLine,
} from '../../graphql/command-line/commandLine.service';
import UnitConverter from '../packaging/UnitConverter.vue';
import CreateInvoice from '../invoice/CreateInvoice.vue';
import { getMedicineName } from '../../graphql/utils/utils';
import { downloadPdf } from '../../graphql/utils/utils';
import { useSoftRemoveCommand } from '../../graphql/command/command.service';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'UpdateCommand',
  components: { CommandLineForm, UnitConverter },
  props: {
    command: {
      type: Object as PropType<Command>,
      required: true
    }
  },
  setup(props) {
    const pagination = reactive({
      page: 1,
      rowPerPage: 0
    });
    watch(() => props.command.commandLines, lines => {
      if(lines)pagination.rowPerPage = lines.length;
    });
    const { dialog } = useQuasar();
    const assuredLines = ref<CommandLine[]>([]);
    const { softRemoveCommand } = useSoftRemoveCommand();
    return {
      pagination,
      cmData,
      formatDate,
      ...useAddCommandLine(),
      ...useRemoveCommandLine(),
      assuredLines,
      softRemoveCommand,
      createInvoice: () => {
        dialog({
          component: CreateInvoice,
          componentProps: { assuredLines: assuredLines.value, command: props.command }
        }).onOk(() => softRemoveCommand(props.command.id))
      },
      updateCommandLine: (commandLine: CommandLine) => {
        dialog({
          component: UpdateCommandLine,
          componentProps: { commandLine }
        })
      },
      selectedLabel: function(nbr: number) {
        const plural =  nbr > 1 ? 's' : '';
        return `${nbr}/${props.command.commandLines?.length} commande${plural} assurée${plural}`;
      },
      getMedicineName,
      downloadPdf
    }
  }
});
</script>
<style lang="scss">

</style>
