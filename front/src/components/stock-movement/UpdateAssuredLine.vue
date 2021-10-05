<template>
  <q-dialog
    ref="dialogRef"
    square
    full-width
    full-height
  >
    <q-card square class="text-blue-grey-14">
      <q-bar class="bg-teal-14 q-pa-md">
        <div class="text-bold text-white">Modification de la ligne assurée</div>
        <q-space />
        <q-btn text-color="red" icon="close" flat round dense v-close-popup>
          <q-tooltip class="bg-teal-14">Fermer</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section :horizontal="$q.screen.gt.sm" style="height: calc(100% - 35px)">
        <q-form @submit="updateAssuredLine" class="q-pa-md col-7">
          <div class="q-mb-sm text-h5 text-center">
            Formulaire
          </div>
          <div class="row no-wrap justify-around">
            <PackagingInput
              style="max-width: 350px"
              label="Quantité assurée"
              :dense="false"
              outlined
              :value="stm.quantity"
              :units="stm.batch.medicine.packaging.units"
              :is-q="true"
              @set-model="updateInput.assuredLine.quantity = $event"
            />
            <q-input
              min="0"
              :model-value="updateInput.assuredLine.discount"
              v-model.number="updateInput.assuredLine.discount"
              label="Rémise"
              outlined
              suffix="%"
              type="number"
              lazy-rules
              :rules="[ val => val >= 0 || 'Entrer un nombre positif']"
            />
          </div>
          <div class="row no-wrap justify-around q-mt-sm">
            <PackagingInput
              style="max-width: 350px"
              :dense="false"
              outlined
              :value="stm.price"
              :units="stm.batch.medicine.packaging.units"
              :is-q="false"
              @set-model="updateInput.assuredLine.price = $event"
            />
            <q-input
              min="0"
              :model-value="updateInput.assuredLine.vat"
              v-model.number="updateInput.assuredLine.vat"
              label="Taux TVA"
              outlined
              suffix="%"
              type="number"
              lazy-rules
              :rules="[ val => val >= 0 || 'Entrer un nombre positif']"
            />
          </div>
          <div class="row justify-around q-mt-sm">
            <DateInput
              class="col-10"
              label="Date d'expiration"
              outlined
              v-model="updateInput.batch.expirationDate"
            >
              <q-btn
                :disable="!states.isCurEx"
                no-caps
                unelevated
                icon="search"
                label="Vérifier"
                @click="findExistingBatch(updateInput.batch.expirationDate)"
                :loading="febLoading"
                color="info"
              />
            </DateInput>
            <q-item class="col-10">
              <q-checkbox
                color="warning"
                keep-color
                :model-value="updateInput.updateCurVat"
                v-model="updateInput.updateCurVat"
                label="Appliquer la modification du TVA à sa valeur actuelle."
              />
            </q-item>
            <q-btn
              no-caps
              class="col-10 q-pa-md"
              label="Enregistrer les modifications"
              icon="save"
              outline
              rounded
              color="primary"
              type="submit"
            />
            <div v-if="states.isCurEx" class="q-mt-lg text-brown text-weight-bold col-11">
              <q-icon name="info" size="sm" color="positive" />
              Cliquer sur vérifier pour voir s'il y a déjà un lot de médicaments pour la nouvelle date d'expiration
            </div>
          </div>
        </q-form>
        <q-separator :vertical="$q.screen.gt.sm" />
        <q-card-section class="col">
          <q-banner class="bg-grey-3 text-dark">
            <span class="text-capitalize">{{getMedicineName(stm.batch.medicine)}}</span> -
            N°Lot : {{stm.batch.id}} -
            Date de péremption : {{formatDate(updateInput.batch.expirationDate, 'DATE_ONLY')}}
            <br>
            <q-chip
              dense
              square
              size="lg"
              class="bg-white"
              :text-color="states.nextStock >= 0 ? 'primary' : 'red'"
              outline
              icon="info"
            >
              Variation de la quantité : {{states.qDelta}}
            </q-chip>
          </q-banner>
          <q-markup-table
            square
            bordered
            flat
            separator="vertical"
            class="q-mb-md"
          >
            <thead>
            <tr>
              <td style="border-bottom: 1px solid gainsboro" colspan="5">
                Etat de stock
              </td>
            </tr>
            <tr>
              <th class="text-center">Avant l'entrée</th>
              <th class="text-center">Quantité entrée</th>
              <th class="text-center">Après l'entrée</th>
              <th class="text-center">Actuel</th>
              <th class="text-center">Prochain</th>
            </tr>
            </thead>
            <tbody>
            <tr class="q-tr--no-hover">
              <td>{{stm.stock - stm.quantity}}</td>
              <td>{{stm.quantity}}</td>
              <td>{{stm.stock}}</td>
              <td>{{stm.batch.currentStock}}</td>
              <td>{{states.nextStock >= 0 ? states.nextStock : 0}}</td>
            </tr>
            </tbody>
          </q-markup-table>
          <q-banner class="bg-grey-3 text-brown-14">
            La quantité qui a été ajoutée au lot actuel sera annulée
            <span v-if="existingBatch">
            et deplacée vers
            lot N°: {{existingBatch.id}},
            dont la date de péremption est le {{formatDate(existingBatch.expirationDate, 'DATE_ONLY')}}
          </span>.
            <template v-slot:action>
              <q-btn
                class="q-pr-md q-pl-md"
                dense
                rounded
                icon="refresh"
                no-caps
                :disable="!states.isCurEx"
                outline
                text-color="positive"
                color="white"
                label="Actualiser"
                @click="findExistingBatch(updateInput.batch.expirationDate)"
              />
            </template>
          </q-banner>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { StockMovement } from '../../graphql/types';
import DateInput from '../shared/DateInput.vue';
import PackagingInput from '../packaging/PackagingInput.vue';
import { formatDate } from '../../shared/date';
import { useFindExistingBatch } from '../../graphql/batch/batch.service';
import { getMedicineName } from '../../graphql/utils/utils';
import { useUpdateAssuredLine } from '../../graphql/stock-movement/stock-mvt.service';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  name: 'UpdateAssuredLine',
  components: {DateInput, PackagingInput},
  props: {
    stm: {
      type: Object as PropType<StockMovement>,
      required: true
    }
  },
  setup(props){
    const { dialogRef } = useDialogPluginComponent();
    return {
      formatDate,
      dialogRef,
      ...useFindExistingBatch(props.stm.batch.medicine.id),
      getMedicineName,
      ...useUpdateAssuredLine(props.stm)
    }
  }
});
</script>

<style scoped>

</style>
