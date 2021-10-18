<template>
  <div class="flex justify-center wrap q-gutter-md">
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
          :color="selected?.id === med.id ? 'positive': 'secondary'"
          flat
          @click="$emit('update:modelValue', med)"
        />
        <q-btn
          @click="selected = med; removeMedicine = true"
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
    <NoData
      :total-items="article?.medicines?.length||0"
      :loading="false"
      :sizes="[100, 100]"
    />
    <q-dialog v-model="removeMedicine" full-height>
      <SoftRemoveMedicine
        v-if="selected"
        :medicine="selected"
        :article="getArticle()"
      />
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, UnwrapRef, watch } from 'vue';
import UnitConverter from '../packaging/UnitConverter.vue';
import { Article, Medicine } from '../../graphql/types';
import CardStock from './CardStock.vue';
import { useQuasar } from 'quasar';
import { cloneDeep } from '../../graphql/utils/utils';
import UpdateMedicine from './UpdateMedicine.vue';
import SoftRemoveMedicine from './SoftRemoveMedicine.vue';
import NoData from '../shared/NoData.vue';

export default defineComponent ({
  name: 'MedicineList',
  components: {
    SoftRemoveMedicine,
    UnitConverter,
    NoData
  },
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true
    },
    modelValue:  Object as PropType<Medicine>
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selected = ref<any>(null);
    watch(() => props.article, (article) => {
      if(article.medicines && article.medicines?.length) {
        selected.value = article.medicines.find(m => m.id === selected.value?.id) || article.medicines[0];
        if(props?.modelValue !== undefined)emit('update:modelValue', selected.value);
      }
    }, { immediate: true });
    const {dialog} = useQuasar();
    const removeMedicine = ref<boolean>(false);
    return {
      movementStock: (iMed: number) => {
        const { medicines, ...article } = cloneDeep(props.article);
        delete medicines[iMed].batches;
        dialog({
          component: CardStock,
          componentProps: { medicine: { ...medicines[iMed], article } }
        });
      },
      updateMedicine: (medicine: UnwrapRef<Medicine|null>) => {
        dialog({
          component: UpdateMedicine,
          componentProps: { medicine: medicine }
        })
      },
      getArticle: () => ({
          id: props.article.id,
          commercialName: props.article.commercialName
      }),
      removeMedicine,
      selected
    }
  }
});
</script>

<style scoped>

</style>
