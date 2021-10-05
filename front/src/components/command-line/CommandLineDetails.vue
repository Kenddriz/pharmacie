<template>
  <q-table
    title="Lignes de commande"
    :rows="command.commandLines"
    :columns="columns"
    row-key="id"
    separator="vertical"
    hide-pagination
    flat
    bordered
    :pagination="{page: 1, rowPerPage: command.commandLines?.length}"
    table-class="overflow-hidden text-blue-grey-14"
    no-data-label="Aucune ligne pour cette commande"
    title-class="text-blue-grey-14"
  >
    <template v-slot:top-right>
      <q-btn
        color="primary"
        icon-right="archive"
        label="version pdf"
        no-caps
      />
    </template>
    <template v-slot:body="props">
      <q-tr no-hover :props="props">
        <q-td key="id" auto-width>
          {{props.row.medicine.id}}
        </q-td>
        <q-td key="medicine" class="text-center">
          {{ getMedicineName(props.row.medicine) }}
        </q-td>

        <q-td key="quantity" class="text-center">
          <UnitConverter
            :value="props.row.quantity"
            :units="props.row.medicine.packaging.units"
          />
        </q-td>
      </q-tr>
    </template>
    <template v-slot:bottom>
      <div class="row full-width justify-end">
        <q-btn
          no-caps
          icon-right="store"
          color="primary"
          label="voir la facture"
          @click="assuredLineDialog = true"
        />
      </div>
      <q-dialog
        v-model="assuredLineDialog"
        full-height
        full-width
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card square>
          <q-bar class="text-white bg-teal-14" style="font-size: 14px;">
            N°Commande : {{command.id}} - Fournisseur : {{command.provider.name}}
            <q-space />
            <q-btn dense size="md" flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Fermer</q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section>
            <AssuredLineDetails
              :command-lines="command.commandLines"
              :invoice="command.invoice"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Command } from '../../graphql/types';
import { cmData } from './cmData';
import UnitConverter from '../packaging/UnitConverter.vue';
import AssuredLineDetails from '../stock-movement/AssuredLineDetails.vue';
import { getMedicineName } from '../../graphql/utils/utils';

export default defineComponent({
  name: 'CommandLineDetails',
  components: { UnitConverter, AssuredLineDetails},
  props: {
    command: Object as PropType<Command>
  },
  setup() {
    const columns = cmData.slice(0, 2);
    columns.unshift({
      name: 'id',
      field: 'medicine',
      label: 'ID',
      align: 'center'
    })
    return {
      columns,
      assuredLineDialog: ref<boolean>(false),
      getMedicineName
    }
  }
});
</script>
