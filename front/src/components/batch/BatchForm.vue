 <template>
  <q-menu>
    <q-form @submit.prevent="submitForm()" class="q-pa-md q-gutter-sm">
      <DateInput
        outlined
        dense
        label="Date de péremption"
        :model-value="model.expirationDate"
        v-model="model.expirationDate"
      />
      <PackagingInput
        min="0"
        dense
        :label="`Quantité ${batch ? 'intiale' : 'actuelle'}`"
        outlined
        :units="units"
        :value="model.currentStock"
        @set-model="model.currentStock = $event"
        :is-q="false"
        lazy-rules
        :rules="[ val => val >= 0 || 'La quantité doit être positive']"
      />
      <div class="row justify-between">
        <q-btn
          v-close-popup
          type="submit"
          color="primary"
          class="q-mr-sm"
          outline
          no-caps
          icon="save"
          label="Enregistrer"
        />
        <q-btn
          v-close-popup
          color="primary"
          outline
          no-caps
          icon-right="close"
          label="Fermer"
        />
      </div>
    </q-form>
  </q-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { Batch, BatchFormInput, Unit } from '../../graphql/types';
import DateInput from '../shared/DateInput.vue';
import PackagingInput from '../packaging/PackagingInput.vue';
import { useCreateBatch, useUpdateBatch } from '../../graphql/batch/batch.service';

export default defineComponent({
  name: 'BatchForm',
  props: {
    medicineId: {
      type: Number,
      required: true
    },
    units: {
      type: Array as PropType<Unit[]>,
      default: () => ([])
    },
    batch: Object as PropType<Batch>
  },
  components: {DateInput, PackagingInput},
  emits: ['submit'],
  setup(props) {
    const model = reactive<BatchFormInput>({
      medicineId: props.medicineId,
      expirationDate: props?.batch?.expirationDate||'',
      currentStock: props?.batch?.currentStock||0
    });
    const { updateBatch } = useUpdateBatch();
    const { createBatch } = useCreateBatch();
    function submitForm() {
      if(props.batch)updateBatch({ id: props.batch.id, form: model });
      else {
        createBatch(model);
      }
    }
    return {
      model,
      submitForm
    }
  }
});
</script>

<style scoped>

</style>
