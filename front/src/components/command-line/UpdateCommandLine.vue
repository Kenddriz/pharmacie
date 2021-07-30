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
        <q-icon class="q-ml-sm" name="tips_and_updates" color="amber" />
      </q-item-section>
      <q-item-section>
        Dernière mise à jour : {{formatDate(command.provider.updatedAt, 'DATE_TIME')}}
      </q-item-section>
     <!-- <q-item-section>
        <q-checkbox
          color="amber"
          keep-color
          :model-value="command.arrived"
        />
      </q-item-section>
      <q-item-section>
        Cocher si la commande est arrivée et prête à être importée dans les stocks ou magasin
      </q-item-section>-->
    </q-item>

    <q-item v-if="command.commandLines.length && !command.arrived">
      <q-item-section side>
        <q-btn
          @click="invoiceDialog = true"
          icon="receipt"
          text-color="dark"
          label="Facturer la commande"
          class="q-ma-md"
        />
      </q-item-section>
    </q-item>

    <q-item v-else-if="command.arrived">
      <q-item-section side>
        <q-radio color="orange" :model-value="command.arrived" :val="command.arrived" />
      </q-item-section>
      <q-item-section>
        Facturée
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <q-btn
            flat
            no-caps
            icon="info"
            label="Voir la facture"
            text-color="primary"
            :loading="findInvoiceLoading"
          >
            <q-menu transition-show="flip-right" transition-hide="flip-left">
              <q-list dense bordered>
                <q-item-label header>Facture</q-item-label>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="tag" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Référence</q-item-label>
                    <q-item-label caption>{{cmdInvoice.reference}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="pin_end" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Date d'échéance</q-item-label>
                    <q-item-label caption>{{formatDate(cmdInvoice.dueDate, 'DATE_ONLY')}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item-label header>Payement</q-item-label>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
  <q-dialog v-model="invoiceDialog">
    <InvoiceForm
      @close="invoiceDialog = false"
      v-model="createInvoiceInput"
      @submit="createInvoice(command.id)"
    />
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, watch } from 'vue';
import { Command, Form, Medicine, Unit } from '../../graphql/types';
import { cmData } from './cmData';
import CommandLineRow from './CommandLineRow.vue';
import CustomSelect from '../shared/CustomSelect.vue';
import InvoiceForm from '../invoice/InvoiceForm.vue';
import { formatDate } from '../../shared/date';
import { useRemoveCommandLine } from '../../graphql/command-lines/remove/remove.command-line.service';
import { useUpdateCommandLine } from '../../graphql/command-lines/update/update.command-line.service';
import { useCreateInvoice, useFindOneInvoice } from '../../graphql/invoice/invoice.service';
export default defineComponent({
  name: 'UpdateCommandLine',
  components: { CustomSelect, CommandLineRow, InvoiceForm },
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
  setup(props) {
    const {findInvoiceLoading, findOneInvoice, cmdInvoice } = useFindOneInvoice();
    watch(() => props.command.id, id => {
      if(props.command.arrived) findOneInvoice(id);
    }, { immediate: true });
    return {
      cmData,
      formatDate,
      ...useRemoveCommandLine(),
      ...useUpdateCommandLine(),
      ...useCreateInvoice(),
      cmdInvoice, findInvoiceLoading
    }
  }
});
</script>
