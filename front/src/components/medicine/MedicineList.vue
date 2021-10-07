<template>
  <div class="flex justify-between wrap q-gutter-md">
    <q-card
      flat
      bordered
      v-for="(med, index) in article.medicines"
      :key="index"
      :class="modelValue?.id === med.id ? 'bg-brown-1' : ''"
    >
      <q-list dense>
        <q-item class="q-mt-sm">
          <q-item-section>
            {{med.form.label}} {{med.dosage.label}}
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Prix de vente</q-item-label>
            <UnitConverter
              class="text-dark text-caption text-brown"
              align="left"
              :units="med.packaging.units"
              :value="med.currentSalePrice"
              :is-q="false"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>TVA</q-item-label>
            <q-item-label caption>{{med.currentVat}}%</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator />
      <q-card-actions align="around">
        <q-btn
          v-if="modelValue !== undefined"
          icon="read_more"
          :color="modelValue?.id === med.id ? 'positive': 'secondary'"
          flat
          @click="$emit('update:modelValue', med)"
        />
        <q-btn
          @click="softRemoveMedicine(article.id, med.id)"
          icon="delete_sweep"
          color="deep-orange"
          flat
        />
        <q-btn
          icon="edit"
          color="primary"
          flat
          @click="updateMedicine(med)"
        />
        <q-btn
          color="brown"
          flat
          @click="movementStock(index)"
        >
          <q-icon size="xs" name="inventory_2" />
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, UnwrapRef, watch } from 'vue';
import UnitConverter from '../packaging/UnitConverter.vue';
import { Article, Medicine } from '../../graphql/types';
import { useSoftRemoveMedicine } from '../../graphql/medicine/medicine.service';
import CardStock from './CardStock.vue';
import { useQuasar } from 'quasar';
import { cloneDeep } from '../../graphql/utils/utils';
import UpdateMedicine from './UpdateMedicine.vue';

export default defineComponent ({
  name: 'MedicineList',
  components: {
    UnitConverter
  },
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true
    },
    modelValue: Object as PropType<Medicine>
  },
  emits: ['update:modelValue'],
  setup(props, { emit}) {
    watch(() => props.article, (article) => {
      if(props?.modelValue !== undefined) {
        let selected = null;
        if(article.medicines && article.medicines?.length) {
          selected = article.medicines.find(m => m.id === props?.modelValue?.id) || article.medicines[0];
        }
        emit('update:modelValue', selected);
      }
    }, { immediate: true });
    const {dialog} = useQuasar();
    return {
      ...useSoftRemoveMedicine(),
      movementStock: (iMed: number) => {
        const { medicines, ...article } = cloneDeep(props.article);
        dialog({
          component: CardStock,
          componentProps: { medicine: { ...medicines[iMed], article } }
        });
      },
      updateMedicine: (medicine: UnwrapRef<Medicine|null>) => {
        dialog({
          component: UpdateMedicine,
          componentProps: { medicine }
        })
      }
    }
  }
});
</script>

<style scoped>

</style>
