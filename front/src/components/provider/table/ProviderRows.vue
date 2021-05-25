<template>
  <q-tr :props="item">
    <q-td auto-width>
      <q-btn size="sm" color="positive" round dense @click="item.expand = !item.expand" :icon="item.expand ? 'remove' : 'add'" />
    </q-td>
    <q-td
      v-for="col in item.cols"
      :key="col.name"
      :props="item"
    >
      {{ col.value }}
    </q-td>
    <q-td auto-width>
      <q-btn icon="delete" size="sm" round color="warning" />
    </q-td>
  </q-tr>
  <q-tr v-show="item.expand" :props="item">
    <q-td colspan="100%">
      <div class="text-left">This is expand slot for row above: {{ item.row.name }}.</div>
    </q-td>
  </q-tr>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import {Provider} from '../../../graphql/types';

  export default defineComponent({
    name: 'ProviderRows',
    props: {
      item: Object as PropType<Provider>
    },
  })
</script>

<style scoped>

</style>
