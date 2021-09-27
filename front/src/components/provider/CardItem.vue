<template>
  <q-card class="q-ma-sm column col-sm-6 col-md-3 col-lg-2 text-blue-grey-14">
    <q-img height="150px" src="register.jpg">
      <div class="absolute-center text-center cursor-pointer">
        <q-icon name="camera" size="md" />
      </div>
    </q-img>
    <q-card-section>
      <q-btn
        @click="$emit('edit', provider)"
        fab-mini
        color="primary"
        icon="edit"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%);"
      />
      <q-list dense separator>
        <q-expansion-item
          group="somegroup"
          label="Inforrmations générales"
          :caption="provider.name"
        >
          <q-item>
            <q-item-section side avatar>
              <q-avatar size="md" color="primary" text-color="white" square icon="place" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Adresse</q-item-label>
              <q-item-label caption>{{provider.address}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          v-for="(contact, index) in provider.contacts"
          :key="index"
          group="somegroup"
          :label="$tm('contacts')[contact.type]"
          :caption="`${contact.list[0]||'Aucun contact'}`"
        >
          <q-item-label
            class="q-ml-md q-mb-md"
            v-for="(l, i) in contact.list.slice(1)"
            :key="i"
            caption
          >
            {{l}}
          </q-item-label>
        </q-expansion-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import {Provider} from '../../graphql/types';

  export default defineComponent({
    name: 'CardItem',
    emits: ['edit'],
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
