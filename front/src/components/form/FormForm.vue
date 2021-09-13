<template>
  <q-menu ref="formForm">
    <q-form @submit.prevent="submitForm();$refs['formForm'].hide()" class="q-ma-md">
      <div class="text-subtitle1 text-weight-bold q-mb-sm">
        <template v-if="fm">
          <q-icon size="sm" name="save" />
          Mise à jour
        </template>
        <template v-else>
          Nouvelle forme
          <q-icon size="sm" name="add" />
        </template>
      </div>
      <div class="row items-center no-wrap q-gutter-md">
        <q-input
          stack-label
          :model-value="model"
          v-model="model"
          dense
          label="Désignation"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Entrer un libellé']"
        />
        <q-btn class="col-1" type="submit" color="primary" flat icon="send" />
      </div>
    </q-form>
  </q-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Form } from '../../graphql/types';
import { useCreateForm, useUpdateForm } from '../../graphql/form/form.service';

export default defineComponent({
  name: 'FormForm',
  props: {
    fm: Object as PropType<Form>,
  },
  setup(props) {
    const { updateForm } = useUpdateForm();
    const { createForm } = useCreateForm();
    const model = ref<string>(props?.fm?.label||'');
    function submitForm() {
      if(props.fm)updateForm({id: props?.fm?.id, label: model.value });
      else createForm({ label: model.value });
    }

    return{
      model,
      submitForm
    }
  }
});
</script>

<style scoped>

</style>
