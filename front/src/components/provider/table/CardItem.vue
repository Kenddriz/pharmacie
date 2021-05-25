<template>
  <q-card
    class="q-ma-sm column col-xs-11 col-sm-6 col-md-3 col-lg-2"
  >
    <q-expansion-item
      v-for="(cType, index) in item.row.contactTypes"
      :key="index"
      expand-separator
      :label="cType.label"
      :caption="`N°: ${cType.id}`"
      expand-icon="info"
    >
      <q-card flat class="q-pa-md transparent">
        <q-card-section>
          <q-list dense>
            <q-item
              v-for="(c, i) in cType.contacts"
              :key="i"
            >
              <q-item-section>
                <q-item-label class="text-positive">{{ c.label }} 45555</q-item-label>
                <q-separator />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-card>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import {Provider} from '../../../graphql/types';

    export default defineComponent({
      name: 'CardItem',
      props: {
        item: {
          type: Object as PropType<Provider>,
          required: true,
        }
      },
    })
</script>

<style scoped>

</style>
