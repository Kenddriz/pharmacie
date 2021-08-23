<template>
  <div class="q-pa-md">
    <div class="q-table__title q-mb-md">
      Formes et dosages
      <q-btn v-if="article" class="q-ml-lg" round color="positive" size="sm" glossy icon="add">
        <q-menu>
          <q-list dense padding style="min-width: 250px">
            <FormList
              :forms="forms"
              :selected="selectedForm"
              @selected="Object.assign(selectedForm, $event)"
            />
            <DosageList
              :dosages="dosages"
              :selected="selectedDosage"
              @selected="Object.assign(selectedDosage, $event)"
            />
            <PackagingList
              :packaging="packagingList"
              :selected="selectedPk"
              @selected="Object.assign(selectedPk, $event)"
            />
          </q-list>
          <q-btn
            type="submit"
            class="q-ma-sm q-pr-sm q-pl-sm"
            color="primary"
            no-caps
            rounded
            outline
            dense
            label="Enregistrer"
            @click="addMedicine(article.id, selectedForm.id, selectedDosage.id, selectedPk.id)"
          />
        </q-menu>
      </q-btn>
    </div>
    <div class="flex flex-center wrap q-gutter-md">
      <q-card
        v-ripple
        class="cursor-pointer"
        bordered
        v-for="med in article?.medicines||[]"
        :key="med.id"
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar size="sm" color="primary" text-color="white">
              M
            </q-avatar>
          </q-item-section>
          <q-item-section>
            {{med.form.label}} {{med.dosage.label}}
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-avatar size="sm" color="primary" text-color="white">
              C
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Unités de vente</q-item-label>
            <q-item-label caption>{{med.packaging.units.map(c => c.label).join(' -')}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Article } from '../../graphql/types';
import { useForms } from '../../graphql/form/form.service';
import FormList from '../form/FormList.vue';
import DosageList from '../dosage/DosageList.vue';
import PackagingList from '../packaging/PackagingList.vue';
import { useDosages } from '../../graphql/dosage/dosage.service';
import { useListPackaging } from '../../graphql/packaging/packaging.service';
import { useSaveMedicine } from '../../graphql/medicine/medicine.service';

export default defineComponent({
  name: 'Medicine',
  components: { FormList, DosageList, PackagingList },
  props: {
    article: Object as PropType<Article>
  },
  emits: ['edit', 'update:selected'],
  setup() {
    const { packagingList, selectedPk } = useListPackaging();
    return {
      ...useForms(),
      ...useDosages(),
      packagingList,
      selectedPk,
      ...useSaveMedicine()
    }
  }
});
</script>

<style lang="sass">
.sticky-header-table
  /* height or max-height is important */
  max-height: 100%
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
