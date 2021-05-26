<template>
  <q-card
    class="q-ma-sm column col-xs-11 col-sm-6 col-md-4 col-lg-3"
  >
    <q-img height="150px" src="register.jpg">
      <div class="absolute-center text-center">
        {{ item.row.name }}
      </div>
    </q-img>
    <q-card-section>
    <q-list separator>
      <q-expansion-item
        v-for="(cType, index) in contacts"
        :key="index"
        group="somegroup"
        :label="cType.label"
        :caption="`${ cType.contacts[0]?.label || 'Aucun contact'}`"
      >
        <UpdateContact
          v-for="(c, i) in cType.contacts"
          :key="i"
          :contact="c"
          :p-id="item.row.id"
          :c-type-id="cType.id"
        />
        <AddContact
          :p-id="item.row.id"
          :c-type-id="cType.id"
        />
      </q-expansion-item>
    </q-list>
  </q-card-section>
  </q-card>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import {Provider} from '../../../graphql/types';
  import UpdateContact from '../../contact/UpdateContact.vue';
  import AddContact from '../../contact/AddContact.vue';

    export default defineComponent({
      name: 'CardItem',
      components: { UpdateContact, AddContact },
      props: {
        item: {
          type: Object as PropType<Provider>,
          required: true,
        },
        contacts: {
          type: Array,
          required: true,
        },
      },
    })
</script>

<style scoped>

</style>
