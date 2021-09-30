<template>
  <q-splitter
    v-model="splitterModel"
    style="height: 100%; max-height: 100%"
    before-class="q-px-sm"
    after-class="q-px-sm"
  >

    <template v-slot:before>
      <q-input
        :model-value="ppInput.keyword"
        v-model="ppInput.keyword"
        label="Trouver un patient ou un client"
        dense
        @keyup.enter="findPatients"
        spellcheck="false"
      >
        <template v-slot:after>
          <q-btn
            @click="findPatients"
            icon="search"
            color="grey"
            outline
            unelevated
            :loading="ppLoading"
          />
        </template>
      </q-input>
      <q-list v-if="patients.items.length">
        <q-item-label header>Résultats de recherche</q-item-label>
        <q-item
          v-for="(p, index) in patients.items"
          :key="index"
          :active="p.id === selected[0].id"
          active-class="bg-brown-1 text-dark"
        >
          <q-item-section side>
            {{index + 1}}
          </q-item-section>
          <q-item-section class="text-center">
            {{p.name}} [ {{p.phone}}]
          </q-item-section>
          <q-item-section side>
            <q-btn dense round flat color="primary" icon="more_vert">
              <q-menu>
                <q-item clickable v-close-popup>
                  <q-item-section side>
                    <q-icon color="deep-orange" name="delete" />
                  </q-item-section>
                  <q-item-section>
                    Supprimer
                  </q-item-section>
                </q-item>
                <q-item @click="updatePatient(p)" clickable v-close-popup>
                  <q-item-section side>
                    <q-icon color="primary" name="edit" />
                  </q-item-section>
                  <q-item-section>
                    Editer
                  </q-item-section>
                </q-item>
              </q-menu>
            </q-btn>
          </q-item-section>
          <q-item-section side>
            <q-btn
              @click="setSelected(index)"
              dense
              round
              flat
              color="grey-14"
              icon="read_more"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <div
        v-if="!ppLoading && !patients.items.length"
        class="text-h6 row justify-center items-center"
        style="height: 80%"
      >
        Aucun patient ou client trouvé
      </div>
      <div
        style="position: absolute; bottom: 0; left: 0; right: 0"
        class="q-py-sm flex flex-center"
        v-if="patients.meta.totalPages > 1"
      >
        <q-pagination
          outline
          :model-value="ppInput.page"
          v-model="ppInput.page"
          color="primary"
          :max="patients.meta.totalPages"
          :max-pages="10"
          :boundary-numbers="false"
        />
      </div>
    </template>

    <template v-slot:after>
      <div class="text-subtitle1 text-center q-pt-sm">Liste d'ordonnances</div>
      <q-list v-if="sale.items.length">
        <q-item
          clickable
          v-for="(item, index) in sale.items"
          :key="item.id"
          @click="saleDetails(item)"
        >
          <q-item-section side>{{ index + 1}}</q-item-section>
          <q-item-section class="text-center">{{item.prescription.reference}}</q-item-section>
          <q-item-section side>{{ formatDate(item.createdAt, 'DATE_TIME') }}</q-item-section>
        </q-item>
      </q-list>
      <div
        v-if="!psLoading && !sale.items.length"
        class="text-body1 row justify-center items-center"
        style="height: 80%"
      >
        Aucune ordonnance trouvée
      </div>
      <div
        style="position: absolute; bottom: 0; left: 0; right: 0"
        class="q-py-sm flex flex-center"
        v-if="sale.meta.totalPages > 1"
      >
        <q-pagination
          outline
          :model-value="psInput.page"
          v-model="psInput.page"
          color="primary"
          :max="sale.meta.totalPages"
          :max-pages="10"
          :boundary-numbers="false"
        />
      </div>
    </template>
  </q-splitter>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { usePaginatePatients, usePaginatePatientSales } from '../../graphql/patient/patient.service';
import { Patient, Sale } from '../../graphql/types';
import { formatDate } from '../../shared/date';
import { useQuasar } from 'quasar';
import UpdatePatient from './UpdatePatient.vue';
import PatientSaleDetails from './PatientSaleDetails.vue';

export default defineComponent({
  name: 'PatientCpt',
  components:{  },
  setup () {
    const { dialog } = useQuasar();
    return {
      splitterModel: ref(50),
      ...usePaginatePatients(),
      ...usePaginatePatientSales(),
      formatDate,
      updatePatient: (patient: Patient) => {
        dialog({
          component: UpdatePatient,
          componentProps: { patient }
        })
      },
      saleDetails: (sale: Sale) => {
        dialog({
          component: PatientSaleDetails,
          componentProps: { sale }
        })
      }
    }
  },
  watch: {
    selected(newP: Patient[]) {
      if(newP.length) {
        this.psInput.patientId = newP[0].id;
        this.loadSales();
      }
    }
  }
});
</script>

<style scoped>

</style>
