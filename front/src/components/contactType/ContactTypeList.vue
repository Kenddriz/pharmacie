<template>
  <q-list dense>
    <q-item v-for="(cType, index) in contacts" :key="index">
      <q-item-section>
        <q-item-label>{{cType.label}}</q-item-label>
        <q-item-label caption>{{cType.contacts.map(c => c.label).join(' - ')}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Contact, ContactType } from '../../graphql/types';
export default {
  name: 'ContactTypeList',
  props: {
    contacts: Array as PropType<(ContactType & { contacts: Contact[] })[]>
  }
};
</script>

<style scoped>

</style>
