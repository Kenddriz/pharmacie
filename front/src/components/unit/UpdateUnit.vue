<template>
  <q-card flat class="transparent">
    <q-card-section>
      <div class="text-body1 text-grey-14">Mise à jour d'unité</div>
      <div class="text-body2 text-left text-grey-14">
        <q-icon name="category" size="sm" />
        Unité à modifier : {{ model.id ? 'N°' + model.id : 'Aucune' }}
      </div>
      <div class="text-blue-grey-14 text-body2 q-mt-sm text-left">
        L'unité est dite sous-unité quand elle est liée à une unité mère.
        Sinon, il s'agit d'une unité principale.
      </div>
    </q-card-section>
     <q-separator inset />
    <q-card-section>
      <unit-form
        v-model="model"
        icon="update"
        submit-label="Enregistrer la modification"
        @submit="updateUnit"
        @reset="reset"
        :loading="loading"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
  import {defineComponent, PropType, reactive} from 'vue'
  import { updateUnitService} from '../../graphql/unit/update/update.unit.service';
  import {UpdateUnitInput} from '../../graphql/types';
  import UnitForm from './UnitForm.vue';
  import {cloneDeep} from 'lodash';
  import {defaultUnit} from '../../graphql/unit/unit';

  export default defineComponent({
    name: 'UpdateUnit',
    props: {
      modelValue: {
        type: Object as PropType<UpdateUnitInput>,
        required: true
      }
    },
    components: { UnitForm },
    setup(props) {
      const model = reactive<UpdateUnitInput>(props.modelValue);
      function reset() {
        Object.assign(model, {
          id: 0,
          ...cloneDeep(defaultUnit)
        })
      }

      return {
        model,
        ...updateUnitService(),
        reset
      };
    },
  })
</script>

<style scoped>

</style>
