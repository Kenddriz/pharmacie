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
    :loading="aclLoading||rclLoading||uclLoading"
    v-model:pagination="pagination"
    table-class="overflow-hidden text-blue-grey-14"
    no-data-label="Aucune ligne pour cette commande"
    :selected-rows-label="selectedLabel"
    selection="multiple"
    v-model:selected="selectedCls"
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
      <q-tr :props="props">
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

        <q-td class="row justify-around" style="height: 100%" key="action">
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
            @click="uclDialog = true; updateCl = props.row"
          />
        </q-td>
      </q-tr>
    </template>
    <template v-slot:bottom-row>
      <q-td colspan="100%">
        <div class="row items-center justify-around">
              <span class="text-weight-bolder">
                <q-icon size="sm" name="check_box" />
                Séléctionner les lignes de commande assurées pour les mettre en stock
              </span>
          <q-btn
            :disable="!selectedCls.length"
            no-caps
            unelevated
            rounded
            :icon="selectedCls.length ? 'local_shipping' : 'store'"
            color="warning"
            label="Passer à la facturation"
            class="col-12 col-md-3"
            @click="ciDialog = true"
          />
        </div>
      </q-td>
    </template>
  </q-table>
  <q-card flat bordered class="q-mt-md">
    <q-card-actions>
      <q-btn
        v-close-popup
        no-caps
        rounded
        icon="delete_forever"
        color="red"
        label="Supprimer cette commande"
        class="col-12 col-md-3"
        @click="softRemoveCommand(command.id)"
      />
    </q-card-actions>
  </q-card>

  <q-dialog v-model="uclDialog">
    <q-card>
      <CommandLineForm
        class="q-pa-lg"
        @save="updateCommandLine(updateCl?.id, $event); uclDialog = false"
        :command-line="updateCl"
      >
        <template v-slot:title>
          Mise à jour de la ligne de commande
          <q-space />
          <q-icon
            color="red"
            size="sm"
            class="cursor-pointer"
            name="close"
            v-close-popup
          />
        </template>
      </CommandLineForm>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="ciDialog"
    persistent
    full-width
    full-height
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <CreateInvoice
      :command-lines="selectedCls"
      @delete="softRemoveCommand(command.id)"
      @submit="createInvoice"
      :command-id="command.id"
    >
      <div class="text-white" style="font-size: 14px;">
        N°Commande : CM{{command.id}} - Fournisseur : {{command.provider.name}}
        - Date et Heure : {{formatDate(command.createdAt, 'DATE_TIME')}}
        - Rapport de ligne assurée : {{selectedCls.length}} / {{command.commandLines?.length}}
      </div>
    </CreateInvoice>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from 'vue';
import { Command, CommandLine } from '../../graphql/types';
import { cmData } from '../command-line/cmData';
import { formatDate } from '../../shared/date';
import CommandLineForm from '../command-line/CommandLineForm.vue';
import {
  useAddCommandLine,
  useRemoveCommandLine,
  useUpdateCommandLine,
} from '../../graphql/command-line/commandLine.service';
import UnitConverter from '../packaging/UnitConverter.vue';
import CreateInvoice from '../invoice/CreateInvoice.vue';
import { useCreateInvoice } from '../../graphql/invoice/invoice.service';
import { getMedicineName } from '../../graphql/utils/utils';
import { downloadPdf } from '../../graphql/utils/utils';
import { useSoftRemoveCommand } from '../../graphql/command/command.service';

export default defineComponent({
  name: 'UpdateCommand',
  components: { CommandLineForm, UnitConverter, CreateInvoice },
  props: {
    command: {
      type: Object as PropType<Command>,
      required: true
    }
  },
  setup(props) {
    const uclDialog = ref<boolean>(false);
    const pagination = reactive({
      page: 1,
      rowPerPage: 0
    });
    watch(() => props.command.commandLines, lines => {
      if(lines)pagination.rowPerPage = lines.length;
    })
    return {
      pagination,
      cmData,
      uclDialog,
      formatDate,
      ...useAddCommandLine(),
      ...useRemoveCommandLine(),
      ...useUpdateCommandLine(),
      ...useCreateInvoice(),
      ...useSoftRemoveCommand(),
      updateCl: ref<CommandLine|null>(null),
      selectedCls: ref<CommandLine[]>([]),
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
