<template>
  <q-card :flat="flat" bordered style="width: 400px">
    <q-card-section  class="text-center">
      <p class="text-h5">{{provider.name}}</p>
      <p>{{provider.address}}</p>
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

export default defineComponent({
  name: 'CardProvider',
  components: {ContactList},
  props: {
    provider: Object as PropType<Provider>,
    flat: Boolean
  }
});
</script>

<style scoped>

</style>
