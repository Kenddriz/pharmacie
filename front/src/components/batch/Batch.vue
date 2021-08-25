<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="q-table__title q-mb-md">
      Lots
      <q-btn class="q-ml-lg" round color="positive" size="sm" glossy icon="add">
        <q-menu>
          <BatchForm />
        </q-menu>
      </q-btn>
    </div>
    <q-list>
      <q-expansion-item v-for="(lot, index) in 4" :key="index">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar size="sm" color="primary" text-color="white">
              {{ lot }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            45/12/2021
          </q-item-section>

          <q-item-section side>
            <q-icon name="star" color="red" size="24px" />
          </q-item-section>
        </template>
        <q-card flat bordered>
          <q-card-section horizontal>
            <q-list class="col">
              <q-item>
                <q-item-section>
                  <q-item-label>Date de fabrication</q-item-label>
                  <q-item-label caption>12/12/2022</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Prix unitaire</q-item-label>
                  <q-item-label caption>4560</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>Quantité</q-item-label>
                  <q-item-label caption>35 000</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-separator vertical />
            <q-card-actions vertical class="justify-around q-px-md">
              <q-btn
                to="/main/card-stock"
                align="left"
                color="primary"
                flat
                dense
                no-caps
                outline
                icon="inventory_2"
                label="Fiche de stock"
              />
              <q-btn
                align="left"
                color="positive"
                flat
                dense
                no-caps
                outline
                icon="edit"
                label="Editer"
              />
              <q-btn
                align="left"
                color="orange"
                flat
                dense
                no-caps
                outline
                icon="drive_file_move"
                label="Archiver"
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import BatchForm from './BatchForm.vue';
export default {
  name: 'Batch',
  components: { BatchForm }
};
</script>

<style scoped>

</style>
