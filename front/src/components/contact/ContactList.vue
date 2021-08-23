<template>
  <q-list dense>
    <q-item v-for="(contact, index) in cts" :key="index">
      <q-item-section>
        <q-item-label>{{$tm('contacts')[contact.type]}}</q-item-label>
        <q-item-label caption>{{contact.list.join(' - ')}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Contact } from '../../graphql/types';
export default defineComponent({
  name: 'ContactList',
  props: {
    contacts: {
      type: Array as PropType<Contact[]>,
      default: () => ([])
    }
  },
  setup(props) {
    return {
      cts: props.contacts.filter(c => c.list.length > 0)
    }
  }
});
</script>

<style scoped>

</style>
