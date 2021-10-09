<template>
  <q-card bordered style="width: 400px">
    <q-card-section  class="text-center">
      <div class="text-h5 row justify-around q-mb-md">
        {{provider.name}}
        <q-btn
          dense
          flat
          color="primary"
          icon="edit"
          @click="updateProvider"
        />
      </div>
      <span>{{provider.address}}</span>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <ContactList :contacts="provider.contacts" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Provider } from '../../graphql/types';
import ContactList from '../contact/ContactList.vue';
import { useQuasar } from 'quasar';
import UpdateProvider from './UpdateProvider.vue';

export default defineComponent({
  name: 'CardProvider',
  components: {ContactList},
  props: {
    provider: {
      type: Object as PropType<Provider>,
      required: true
    }
  },
  setup(props) {
    const { dialog } = useQuasar();
    return {
      updateProvider: () => {
        dialog({
          component: UpdateProvider,
          componentProps: { provider: props.provider }
        })
      }
    }
  }
});
</script>

<style scoped>

</style>
