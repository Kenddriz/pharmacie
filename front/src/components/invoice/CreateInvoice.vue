<template>
  <q-card square class="text-blue-grey-14">
    <q-toolbar class="bg-teal-5">
      <slot></slot>
      <q-space />
      <q-btn color="red" dense flat icon="close" v-close-popup>
        <q-tooltip class="bg-white text-primary">Fermer</q-tooltip>
      </q-btn>
    </q-toolbar>
    <q-form
      autocomplete="off"
      spellcheck="false"
      class="q-ma-sm"
      @submit.prevent="$emit('submit', invoiceInput)"
    >
      <q-card-section class="text-subtitle1 q-pt-none q-pb-sm text-center">
        Mise en stock des médicaments commandés
      </q-card-section>
      <q-card
        flat
        bordered
        class="row justify-around q-pa-sm q-mb-md"
      >
        <q-input
          dense
          hide-bottom-space
          label="Référence de la facture"
          stack-label
          outlined
          :model-value="invoiceInput.invoice.reference"
          v-model="invoiceInput.invoice.reference"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'La référence est requise']"
        />
        <DateInput
          dense
          label="Date d'échéance"
          stack-label
          outlined
          v-model="invoiceInput.invoice.dueDate"
        />
        <DateInput
          dense
          label="Date de livraison"
          stack-label
          outlined
          v-model="invoiceInput.invoice.deliveryDate"
        />
        <q-input
          dense
          hide-bottom-space
          type="number"
          min="0"
          label="Autres charges"
          stack-label
          outlined
          :model-value="invoiceInput.invoice.expense"
          v-model.number="invoiceInput.invoice.expense"
          lazy-rules
          :rules="[ val => val >= 0 || 'Frais doit être positif']"
        />
      </q-card>
      <q-card-section class="q-pa-none">
        <q-table
          flat
          square
          bordered
          :rows="invoiceInput.assuredLines"
          :columns="columns"
          row-key="id"
          hide-no-data
          separator="cell"
          hide-pagination
          :pagination="{page: 1, rowsPerPage: invoiceInput.assuredLines.length}"
          table-class="text-blue-grey-14"
        >
          <template v-slot:header-cell="props">
            <q-th :props="props">
              {{ props.col.label }}
              <q-icon
                v-if="props.col.name !== 'medicineId' && props.col.name !== 'ht'"
                name="border_color"
                size="xs"
              />
            </q-th>
          </template>

          <template v-slot:top>
            <div class="q-ml-md text-blue-grey-14">
              <q-icon name="warning" color="deep-orange" size="xs" />
              Adapter les valeurs conformement à ce que le fournisseur a livré
            </div>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="medicineId" no-hover :props="props">
                {{getMedicineName(commandLines[props.pageIndex].medicine)}}
              </q-td>
              <q-td key="quantity" no-hover>
                <PackagingInput
                  min="0"
                  :value="props.row.quantity"
                  :units="commandLines[props.pageIndex].medicine.packaging.units"
                  @set-model="props.row.quantity = $event"
                  :is-q="false"
                  lazy-rules
                  :rules="[ val => val > 0 || 'Quntité invalide']"
                />
              </q-td>
              <q-td key="price" no-hover>
                <PackagingInput
                  min="0"
                  :value="props.row.price"
                  :units="commandLines[props.pageIndex].medicine.packaging.units"
                  @set-model="props.row.price = $event"
                  :is-q="false"
                  lazy-rules
                  :rules="[ val => val >= 0 || 'Prix invalide']"
                />
              </q-td>
              <q-td key="ht" no-hover>
                {{props.row.quantity * props.row.price }}
              </q-td>
              <q-td key="discount" no-hover :props="props">
                <q-input
                  hide-bottom-space
                  borderless
                  min="0"
                  type="number"
                  v-model.number="props.row.discount"
                  :model-value="props.row.discount"
                  dense
                  suffix="%"
                  lazy-rules
                  :rules="[ val => val >= 0 || 'TVA doit être positive']"
                />
              </q-td>
              <q-td key="vat" no-hover :props="props">
                <q-input
                  hide-bottom-space
                  borderless
                  min="0"
                  type="number"
                  v-model.number="props.row.vat"
                  :model-value="props.row.vat"
                  dense
                  suffix="%"
                  lazy-rules
                  :rules="[ val => val >= 0 || 'TVA doit être positive']"
                />
              </q-td>
              <q-td key="expirationDate" no-hover :props="props">
                <DateInput
                  dense
                  placeholder="date d'expiration"
                  borderless
                  v-model="props.row.expirationDate"
                />
              </q-td>
            </q-tr>
          </template>

          <template v-slot:bottom-row>
            <q-tr>
              <q-td no-hover colspan="3" class="text-center text-weight-bold">TOTAUX</q-td>
              <q-td no-hover>{{cost.ht}}</q-td>
              <q-td no-hover>{{cost.discount}}</q-td>
              <q-td no-hover>{{cost.tva}}</q-td>
              <q-td no-hover></q-td>
            </q-tr>
          </template>
          <template v-slot:bottom>
            <div class="row text-body2 text-blue-grey-14 full-width items-center">
              [ TTC : HT + TVA = {{cost.ht + cost.tva}},
              Net à payer : TTC - Remise = {{cost.discount}},
              Coût d'achat : Net à payer + Dépense = {{cost.total}} ]
            </div>
          </template>
        </q-table>
        <q-card-actions align="around">
          <q-btn
            unelevated
            color="teal-14"
            no-caps
            rounded
            class="col-md-3"
            label=" Mettre les produits en stock"
            icon-right="drive_file_move"
            type="submit"
          />
          <q-btn
            v-close-popup
            unelevated
            color="red"
            no-caps
            rounded
            class="col-md-3"
            label="Supprimer cette commande"
            icon="delete_forever"
            @click="$emit('delete')"
          />
        </q-card-actions>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, computed } from 'vue';
import { columns } from './data';
import { CommandLine, CreateInvoiceInput } from '../../graphql/types';
import PackagingInput from '../packaging/PackagingInput.vue';
import DateInput from '../shared/DateInput.vue';
import { getMedicineName } from '../../graphql/utils/utils';

export default defineComponent({
  name: 'CreateInvoice',
  emits: ['delete', 'submit'],
  components: { PackagingInput, DateInput },
  props: {
    commandLines: {
      type: Array as PropType<CommandLine[]>,
      default: () => ([])
    },
    commandId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const invoiceInput = reactive<CreateInvoiceInput>({
      invoice: {
        commandId: props.commandId,
        dueDate: '',
        reference: '',
        expense: 0,
        deliveryDate: '',
      },
      assuredLines: props.commandLines.map(cl => ({
        medicineId: cl.medicine.id,
        price: cl.medicine.currentSalePrice,
        expirationDate: '',
        vat: cl.medicine.currentVat,
        quantity: cl.quantity,
        discount: 0
      }))
    });
    const cost = computed(() => {
      const resume = {
        ht: 0,
        tva: 0,
        discount: 0,
        total: 0,
      }
      invoiceInput.assuredLines.forEach(line => {
        const subCost = line.price * line.quantity;
        resume.ht += subCost;
        resume.tva += (subCost * line.vat)/100;
        resume.discount += subCost * line.discount/100;
      });
      resume.total = resume.ht + resume.tva - resume.discount;
      resume.total += invoiceInput.invoice.expense;
      return resume;
    })
    return {
      cost,
      columns,
      invoiceInput,
      getMedicineName
    }
  }
});
</script>
