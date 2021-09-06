<template>
  <q-card>
    <q-toolbar class="bg-teal-5 glossy">
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
    >
      <q-card-section class="text-h5 text-center">
        Mise en stock des médicaments commandés
      </q-card-section>
      <q-card
        flat
        bordered
        class="row justify-around q-pa-sm q-mb-md"
      >
        <q-input
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
          label="Date d'échéance"
          stack-label
          outlined
          v-model="invoiceInput.invoice.dueDate"
        />
        <DateInput
          label="Date de livraison"
          stack-label
          outlined
          v-model="invoiceInput.invoice.deliveryDate"
        />
        <q-input
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
          :rows="commandLines"
          :columns="columns"
          row-key="id"
          hide-no-data
          separator="cell"
          hide-pagination
          :pagination="{page: 1, rowsPerPage: commandLines.length}"
        >
          <template v-slot:header-cell="props">
            <q-th :props="props">
              {{ props.col.label }}
              <q-icon v-if="props.col.name !== 'medicine'" name="border_color" size="xs" />
            </q-th>
          </template>

          <template v-slot:top>
            <div class="q-table__title q-ml-md">Liste de produits livrés</div>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="medicine" :props="props">
                {{ props.row.medicine.article.commercialName }}
                {{ props.row.medicine.dosage.label }}
                , {{ props.row.medicine.form.label }}
              </q-td>
              <q-td no-hover>
                <PackagingInput
                  min="0"
                  hide-bottom-space
                  :value="invoiceInput.assuredLines[props.pageIndex].quantity"
                  :units="props.row.medicine.packaging.units"
                  @set-model="invoiceInput.assuredLines[props.pageIndex].quantity = $event"
                  :is-q="false"
                  lazy-rules
                  :rules="[ val => val > 0 || 'Quntité invalide']"
                />
              </q-td>
              <q-td no-hover>
                <PackagingInput
                  min="0"
                  hide-bottom-space
                  :value="invoiceInput.assuredLines[props.pageIndex].price"
                  :units="props.row.medicine.packaging.units"
                  @set-model="invoiceInput.assuredLines[props.pageIndex].price = $event"
                  :is-q="false"
                  lazy-rules
                  :rules="[ val => val >= 0 || 'Prix invalide']"
                />
              </q-td>
              <q-td key="expirationDate" no-hover :props="props">
                <DateInput
                  placeholder="date d'expiration"
                  borderless
                  v-model="invoiceInput.assuredLines[props.pageIndex].expirationDate"
                  lazy-rules
                  :rules="[]"
                />
              </q-td>
              <q-td key="vat" no-hover :props="props">
                <q-input
                  hide-bottom-space
                  borderless
                  min="0"
                  type="number"
                  v-model.number="invoiceInput.assuredLines[props.pageIndex].vat"
                  :model-value="invoiceInput.assuredLines[props.pageIndex].vat"
                  dense
                  suffix="%"
                  lazy-rules
                  :rules="[ val => val >= 0 || 'TVA doit être positive']"
                />
              </q-td>
            </q-tr>
          </template>

          <template v-slot:bottom-row>
            <q-tr>
              <q-td
                class="text-center full-width text-weight-bold text-grey-14 text-subtitle1"
                colspan="3"
              >
                <q-icon name="border_color" size="xs" />
                Adapter les valeurs conformement à tout ce que le fournisseur a livré.
              </q-td>
              <q-td colspan="2">
                HT = {{cost.ht}},
                TVA = {{cost.tva}},
                Coût d'achat = HT + TVA + Frais = {{cost.total}}
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <q-card-actions align="around">
          <q-btn
            unelevated
            color="teal-14"
            no-caps
            rounded
            class="q-mt-lg col-md-3"
            label=" Mettre les produits au stock"
            icon-right="drive_file_move"
            type="submit"
          />
          <q-btn
            v-close-popup
            unelevated
            color="red"
            no-caps
            rounded
            class="q-mt-lg col-md-3"
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
import { validateDate } from '../../graphql/utils/utils';
import DateInput from '../shared/DateInput.vue';

export default defineComponent({
  name: 'CreateInvoice',
  emits: ['delete'],
  components: { PackagingInput, DateInput },
  props: {
    commandLines: {
      type: Array as PropType<CommandLine[]>,
      default: () => ([])
    }
  },
  setup(props) {
    const invoiceInput = reactive<CreateInvoiceInput>({
      invoice: {
        commandId: 0,
        dueDate: '',
        reference: '',
        expense: 0,
        discount: 0,
        deliveryDate: '',
      },
      assuredLines: props.commandLines.map(cl => ({
        medicineId: cl.medicine.id,
        price: cl.medicine.currentSalePrice,
        expirationDate: '',
        vat: cl.medicine.currentVat,
        quantity: cl.quantity
      }))
    });
    const cost = computed(() => {
      let ht = 0;
      let tva = 0;
      invoiceInput.assuredLines.forEach(line => {
        const subCost = line.price * line.quantity;
        ht += subCost;
        tva += subCost * line.vat;
      });
      return { ht, tva, total: ht + tva + invoiceInput.invoice.expense }
    })
    return {
      cost,
      columns,
      invoiceInput,
      validateDate
    }
  }
});
</script>

<style scoped>

</style>
