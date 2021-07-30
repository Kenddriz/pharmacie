<template>
  <q-card :flat="flat" bordered style="width: 400px">
    <q-card-section  class="text-center">
      <p class="text-h5">{{provider.name}}</p>
      <p>{{provider.address}}</p>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <ContactTypeList :contacts="contacts(provider.contacts)" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useContactTypes } from '../../graphql/contact_type/read/contact.types.service';
import { Provider } from '../../graphql/types';
import ContactTypeList from '../contactType/ContactTypeList.vue';

export default defineComponent({
  name: 'CardProvider',
  components: {ContactTypeList},
  props: {
    provider: Object as PropType<Provider>,
    flat: Boolean
  },
  setup() {
    return {
      ...useContactTypes(),
    }
  }
});
</script>

<style scoped>

</style>
