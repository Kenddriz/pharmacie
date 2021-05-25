<template>
  <q-card flat class="transparent">
    <q-card-section>
      <div class="text-body1 text-grey-14">Nouvelle unité de vente de médicament</div>
      <div class="text-body2 text-left text-grey-14">
        <q-icon name="account_tree" size="sm" />
        Unité mère : {{ model.parentId ? 'N°' + model.parentId : 'Aucune' }}
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
        icon="add"
        submit-label="Ajouter"
        @submit="createUnit"
        @reset="reset"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
  import {defineComponent, PropType, reactive} from  'vue';
  import {createUnitService} from '../../graphql/unit/create/create.unit.service';
  import {CreateUnitInput} from '../../graphql/types';
  import UnitForm from './UnitForm.vue';
  import {cloneDeep} from 'lodash';
  import {defaultUnit} from '../../graphql/unit/unit';

  export default defineComponent({
        name: 'CreateUnit',
    props: {
      modelValue: {
        type: Object as PropType<CreateUnitInput>,
        required: true
      }
    },
    components: { UnitForm },
    setup(props) {
      const model = reactive<CreateUnitInput>(props.modelValue);
      function reset() {
        Object.assign(model, cloneDeep(defaultUnit));
      }
      return {
        model,
        ...createUnitService(),
        reset
      };
    },
    })
</script>

<style scoped>

</style>
