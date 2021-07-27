<template>
  <q-table
    title="Lignes de commande"
    :rows="command.commandLines"
    :columns="cmData"
    row-key="name"
    separator="cell"
    hide-pagination
    hide-no-data
    class="q-ma-md"
    :loading="removeCmdLineLoading||updateCmdLineLoading"
  >
    <template v-slot:top-right>
      <q-btn
        outline
        label="sauvegarder vos modifications"
        class="q-mr-md"
        color="primary"
        icon="save"
        no-caps
        @click="updateCmdLine(command)"
      />
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
          {{ props.row.medicine }}
        </q-td>

        <q-td key="form" :props="props">
          {{ props.row.form.label }}
        </q-td>

        <q-td key="unit" :props="props">
          {{findUnit(props.row.unit.id).label}}
          <q-popup-edit
            buttons
            label-cancel="Annuler"
            label-set="ok"
            :model-value="props.row.unit.id"
            v-model="props.row.unit.id"
          >
            <custom-select
              :borderless="false"
              :options="units"
              v-model="props.row.unit.id"
            />
          </q-popup-edit>
        </q-td>

        <q-td key="quantity" :props="props">
          {{ props.row.quantity }}
          <q-popup-edit
            buttons
            label-cancel="Annuler"
            label-set="ok"
            :model-value="props.row.quantity"
            v-model="props.row.quantity"
          >
            <q-input
              :model-value="props.row.quantity"
              type="number"
              v-model.number="props.row.quantity"
              dense autofocus
            />
          </q-popup-edit>
        </q-td>

        <q-td key="price" :props="props">
          {{ props.row.price }}
          <q-popup-edit
            title="Prix unitaire"
            buttons
            label-cancel="Annuler"
            label-set="ok"
            :model-value="props.row.price"
            v-model="props.row.price"
          >
            <q-input
              :model-value="props.row.price"
              type="number"
              v-model.number="props.row.price"
              dense autofocus
            />
          </q-popup-edit>
        </q-td>

        <q-td key="vat" :props="props">
          {{ props.row.vat }} %
          <q-popup-edit
            title="Nouveau TVA"
            buttons
            label-cancel="Annuler"
            label-set="ok"
            :model-value="props.row.vat"
            v-model="props.row.vat"
          >
            <q-input
              :model-value="props.row.vat"
              type="number"
              v-model.number="props.row.vat"
              dense
              autofocus
              prefix="%"
            />
          </q-popup-edit>
        </q-td>

        <q-td key="action">
          <q-btn
            round
            icon="delete_forever"
            color="orange"
            size="md"
            flat
            @click="removeCmdLine(props.row.id)"
          />
        </q-td>
      </q-tr>
    </template>
    <template v-slot:bottom-row>
      <CommandLineRow
        :commandId="command.id"
        :medicines="medicines"
        :forms="forms"
        :units="units"
        :path-to-child="pathToChild"
      />
    </template>
  </q-table>
  <q-list>
    <q-item>
      <q-item-section side>
        <q-icon class="q-ml-sm" name="event" color="amber" />
      </q-item-section>
      <q-item-section>
        Date de commande : {{formatDate(command.provider.createdAt, 'DATE_TIME')}}
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section side>
        <q-checkbox
          color="amber"
          keep-color
          :model-value="command.arrived"
        />
      </q-item-section>
      <q-item-section>
        Cocher si la commande est arrivée et prête à être importée dans les stocks ou magasin
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section side>
        <q-btn
          icon="add"
          text-color="dark"
          label="Payer la commande"
          class="q-ma-md"
        />
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section side>
        <q-radio color="orange" :model-value="true" :val="true" />
      </q-item-section>
      <q-item-section>
        Payée
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <q-btn flat no-caps icon="info" label="Voir les informations de payement" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Command, Form, Medicine, Unit } from '../../graphql/types';
import { cmData } from './cmData';
import CommandLineRow from './CommandLineRow.vue';
import CustomSelect from '../shared/CustomSelect.vue';
import { formatDate } from '../../shared/date';
import { useRemoveCommandLine } from '../../graphql/command-lines/remove/remove.command-line.service';
import { useUpdateCommandLine } from '../../graphql/command-lines/update/update.command-line.service';
export default defineComponent({
  name: 'UpdateCommandLine',
  components: {CustomSelect, CommandLineRow},
  props: {
    medicines: {
      type: Array as PropType<Medicine[]>,
      required: true
    },
    command: {
      type: Object as PropType<Command>,
      required: true
    },
    forms: {
      type: Array as PropType<Form[]>,
      required: true
    },
    units: {
      type: Array as PropType<Unit[]>,
      required: true
    },
    findUnit: {
      type: Function,
      required: true
    },
    pathToChild: {
      type: Function,
      required: true
    },
  },
  setup() {
    return {
      cmData,
      formatDate,
      ...useRemoveCommandLine(),
      ...useUpdateCommandLine()
    }
  }
});
</script>
