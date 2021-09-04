<template>
  <q-list dense>
    <q-expansion-item
      expand-separator
      icon="info"
      label="Informations supplémentaires"
      :caption="`Destination de la commande: ${command.provider.name}`"
    >
      <div class="row items-stretch q-pb-sm q-mt-sm justify-around">
        <CardProvider flat :provider="command.provider" />
        <q-timeline class="col-md-4 q-mt-none">
          <div class="text-h6">A propos de la commande</div>
          <q-timeline-entry
            title="Date de création"
            icon="event"
            :body="formatDate(command.createdAt, 'DATE_TIME')"
          >
            <template v-slot:title>
              <div class="text-subtitle2">Date de création</div>
            </template>
          </q-timeline-entry>
          <q-timeline-entry
            icon="event"
            :body="command.commandLines?.length + ''"
          >
            <template v-slot:title>
              <div class="text-subtitle2">Nombre de ligne de commandes</div>
            </template>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </q-expansion-item>
    <q-expansion-item
      default-opened
      expand-separator
      icon="receipt"
      label="Contenu de la commande"
      :caption="`Il y a ${command.commandLines?.length} ligne(s)`"
    >
      <q-table
        title="Lignes de commande"
        :rows="command.commandLines"
        :columns="cmData"
        row-key="name"
        separator="cell"
        hide-pagination
        flat
        bordered
        :loading="aclLoading||rclLoading||uclLoading"
        :pagination="{page:1, rowsPerPage: command?.commandLines?.length||0}"
        table-class="overflow-hidden"
        no-data-label="Aucune ligne pour cette commande"
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
          />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="medicine" :props="props">
              {{ props.row.medicine.article.commercialName }}
              {{ props.row.medicine.dosage.label }}
              , {{ props.row.medicine.form.label }}
            </q-td>

            <q-td key="quantity" :props="props">
              <UnitConverter
                :value="props.row.quantity"
                :units="props.row.medicine.packaging.units"
              />
            </q-td>

            <q-td class="row justify-around" key="action">
              <q-btn
                round
                icon="delete_forever"
                color="orange"
                size="md"
                flat
                @click="removeCommandLine(command.id, props.row.id)"
              />
              <q-btn
                round
                icon="edit"
                color="positive"
                size="md"
                flat
                @click="uclDialog = true; selectedCl = props.row"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-expansion-item>
  </q-list>

  <q-card flat bordered class="q-mt-md">
    <q-card-actions align="around">
      <q-btn
        v-if="!command.delivery"
        no-caps
        rounded
        icon="store"
        color="warning"
        label="Livraison"
        class="col-12 col-md-3"
        @click="$emit('deliver')"
      />
      <template v-else>
        <q-btn
          no-caps
          rounded
          icon="store"
          color="positive"
          label="Infos de la livraison"
          class="col-12 col-md-3"
          @click="$emit('deliver')"
        />
        <q-btn
          no-caps
          rounded
          icon="receipt"
          text-color="dark"
          label="Facturation"
          class="col-12 col-md-3"
          :to="`command/invoice/${command.id}`"
        />
      </template>

      <q-btn
        no-caps
        rounded
        icon="delete"
        color="red"
        label="Supprimer"
        class="col-12 col-md-3"
      />
    </q-card-actions>
  </q-card>

  <q-dialog v-model="uclDialog">
    <q-card>
      <CommandLineForm
        class="q-pa-lg"
        @save="updateCommandLine(selectedCl?.id, $event); uclDialog = false"
        :command-line="selectedCl"
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
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Command, CommandLine } from '../../graphql/types';
import { cmData } from '../command-line/cmData';
import { formatDate } from '../../shared/date';
import CommandLineForm from '../command-line/CommandLineForm.vue';
import {
  useAddCommandLine,
  useRemoveCommandLine,
  useUpdateCommandLine,
} from '../../graphql/command-line/commandLine.service';
import CardProvider from '../provider/CardProvider.vue';
import UnitConverter from '../packaging/UnitConverter.vue';

export default defineComponent({
  name: 'UpdateCommand',
  components: { CommandLineForm, CardProvider, UnitConverter },
  props: {
    command: {
      type: Object as PropType<Command>,
      required: true
    }
  },
  emits: ['deliver'],
  setup() {
    const uclDialog = ref<boolean>(false);
    return {
      cmData,
      uclDialog,
      formatDate,
      ...useAddCommandLine(),
      ...useRemoveCommandLine(),
      ...useUpdateCommandLine(),
      selectedCl: ref<CommandLine|null>(null)
    }
  }
});
</script>
<style lang="scss">

</style>
