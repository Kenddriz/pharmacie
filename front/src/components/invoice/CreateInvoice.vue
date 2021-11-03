<template>
  <q-dialog ref="dialogRef">
    <MovableCard resizable>
      <template v-slot:title>
        N°Commande : CM{{command.id}} - Fournisseur : {{command.provider.name}}
        - Date et Heure : {{formatDate(command.createdAt, 'DATE_TIME')}}
        - Rapport de ligne assurée : {{assuredLines.length}} / {{command.commandLines?.length}}
      </template>
      <q-form
        autocomplete="off"
        spellcheck="false"
        class="q-ma-sm"
        @submit.prevent="createInvoice(invoiceInput)"
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
              </q-th>
            </template>

            <template v-slot:top>
              <div class="q-ml-md text-blue-grey-14">
                Adapter les valeurs conformement à ce que le fournisseur a livré
              </div>
            </template>

            <template v-slot:body="props">
              <q-tr no-hover :props="props">
                <q-td key="medicineId" :props="props">
                  {{getMedicineName(assuredLines[props.pageIndex].medicine)}}
                </q-td>
                <q-td key="quantity">
                  <PackagingInput
                    min="0"
                    :value="props.row.quantity"
                    :units="assuredLines[props.pageIndex].medicine.packaging.units"
                    @set-model="props.row.quantity = $event"
                    :is-q="false"
                    lazy-rules
                    :rules="[ val => val > 0 || 'Quntité invalide']"
                  />
                </q-td>
                <q-td key="price">
                  <PackagingInput
                    min="0"
                    :value="props.row.price"
                    :units="assuredLines[props.pageIndex].medicine.packaging.units"
                    @set-model="props.row.price = $event"
                    :is-q="false"
                    lazy-rules
                    :rules="[ val => val >= 0 || 'Prix invalide']"
                  />
                </q-td>
                <q-td key="ht">
                  {{props.row.quantity * props.row.price }}
                </q-td>
                <q-td key="vat" :props="props">
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
                <q-td key="discount" :props="props">
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
                <q-td key="expirationDate" :props="props">
                  <DateInput
                    dense
                    placeholder="date"
                    borderless
                    v-model="props.row.expirationDate"
                  />
                </q-td>
              </q-tr>
            </template>

            <template v-slot:bottom-row>
              <q-tr no-hover>
                <q-td colspan="3" class="text-center text-weight-bold">TOTAUX</q-td>
                <q-td v-for="(cost, index) in costs.slice(0, 3)" :key="index">{{cost}}</q-td>
                <q-td></q-td>
              </q-tr>
            </template>
            <template v-slot:bottom>
              <div class="row text-body2 text-blue-grey-14 full-width items-center">
                [ TTC : HT + TVA = {{costs[0] + costs[1]}},
                Net à payer : TTC - Remise = {{costs[3]}},
                Coût d'achat : Net à payer + Dépense = {{costs[3] + invoiceInput.invoice.expense}} ]
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
              @click="$emit('ok')"
            />
          </q-card-actions>
        </q-card-section>
      </q-form>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, computed } from 'vue';
import { columns } from './data';
import { CommandLine, CreateInvoiceInput, Command } from '../../graphql/types';
import PackagingInput from '../packaging/PackagingInput.vue';
import DateInput from '../shared/DateInput.vue';
import MovableCard from '../shared/MovableCard.vue';
import { getMedicineName } from '../../graphql/utils/utils';
import { linesCosts } from '../dashboard/income/logical';
import { useDialogPluginComponent } from 'quasar';
import { useCreateInvoice } from '../../graphql/invoice/invoice.service';
import { formatDate } from '../../shared/date';

export default defineComponent({
  name: 'CreateInvoice',
  emits: ['ok'],
  components: { PackagingInput, DateInput, MovableCard },
  props: {
    assuredLines: {
      type: Array as PropType<CommandLine[]>,
      default: () => ([])
    },
    command: {
      type: Object as PropType<Command>,
      required: true
    }
  },
  setup(props) {
    const invoiceInput = reactive<CreateInvoiceInput>({
      invoice: {
        commandId: props.command.id,
        dueDate: '',
        reference: '',
        expense: 0,
        deliveryDate: '',
      },
      assuredLines: props.assuredLines.map(cl => ({
        medicineId: cl.medicine.id,
        price: cl.medicine.currentSalePrice,
        expirationDate: '',
        vat: cl.medicine.currentVat,
        quantity: cl.quantity,
        discount: 0
      }))
    });
    const { dialogRef } = useDialogPluginComponent() ;
    return {
      costs: computed(() => linesCosts(invoiceInput.assuredLines, false)),
      columns,
      invoiceInput,
      getMedicineName,
      dialogRef,
      ...useCreateInvoice(),
      formatDate
    }
  }
});
</script>
<style lang="scss" scoped>
  td { font-size: 12px!important; }
</style>
