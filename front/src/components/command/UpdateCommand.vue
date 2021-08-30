<template>
  <q-table
    title="Lignes de commande"
    :rows="command?.commandLines||[]"
    :columns="cmData"
    row-key="name"
    separator="cell"
    hide-pagination
    hide-no-data
    class="q-ma-md"
  >
    <template v-slot:top-right>
      <q-btn
        outline
        label="sauvegarder vos modifications"
        class="q-mr-md"
        color="primary"
        icon="save"
        no-caps
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
        <q-td key="article" :props="props">
          {{ props.row.medicine }}
        </q-td>

        <q-td key="form" :props="props">
          {{ props.row.form.label }}
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
          />
        </q-td>
      </q-tr>
    </template>
    <template v-slot:bottom-row>
      <CommandLineRow />
    </template>
  </q-table>

  <q-list v-if="command">
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

    <q-item>
      <q-item-section side>
        <q-btn
          v-if="command.delivery"
          icon="store"
          text-color="dark"
          label="Livraison"
          class="q-ma-md"
          :to="`command/delivery/${command.id}`"
        />
        <q-btn
          v-else
          icon="receipt"
          text-color="dark"
          label="Facturation"
          class="q-ma-md"
          :to="`command/invoice/${command.id}`"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CommandLineRow from '../command-line/CommandLineRow.vue';
import { Command } from '../../graphql/types';
import { cmData } from '../command-line/cmData';
import { formatDate } from '../../shared/date';

export default defineComponent({
  name: 'UpdateCommand',
  components: { CommandLineRow },
  props: {
    command: {
      type: Object as PropType<Command>,
      required: true
    }
  },
  setup() {
    return {
      cmData,
      formatDate,
    }
  }
});
</script>
