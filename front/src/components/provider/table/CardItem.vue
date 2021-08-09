<template>
  <q-card
    class="q-ma-sm column col-xs-11 col-sm-6 col-md-4 col-lg-3"
  >
    <q-img height="150px" src="register.jpg">
      <div class="absolute-center text-center">
        {{ provider.name }}
      </div>
    </q-img>
    <q-card-section>
    <q-list separator>
      <q-expansion-item
        v-for="(contact, index) in provider.contacts"
        :key="index"
        group="somegroup"
        :label="$tm('contacts')[contact.type]"
        :caption="`${contact.list[0]||'Aucun contact'}`"
      >
        <div
          v-for="i in contact.list.length"
          class="flex no-wrap flex-center q-gutter-sm q-pa-sm"
          :key="i"
        >
          <q-input
            :model-value="contact"
            v-model="contact.list[i - 1]"
            dense
          />
          <q-btn
            unelevated
            outline
            rounded
            icon="delete_forever"
            color="deep-orange"
            @click="$emit('reset')"
          />
        </div>

        <q-btn
          round
          color="teal-14"
          class="q-mb-sm"
          size="sm"
          icon="add"
        />
      </q-expansion-item>
    </q-list>
  </q-card-section>
  </q-card>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import {Provider} from '../../../graphql/types';

  export default defineComponent({
    name: 'CardItem',
    components: {  },
    props: {
      provider: {
        type: Object as PropType<Provider>,
        required: true,
      }
    },
  })
</script>

<style scoped>

</style>
