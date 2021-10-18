<template>
  <q-list
    class="scroll-y"
    separator
  >
    <q-item
      clickable
      v-ripple v-for="(cmd, i) in commands"
      :key="i"
      @click="$emit('select', i)"
      :active="cmd.id === selectedId"
      active-class="bg-brown-1"
    >
      <template v-if="withName">
        <q-item-section avatar>
          <q-avatar size="sm" color="primary" text-color="white">
            {{cmd.provider.name.charAt(0).toUpperCase()}}
          </q-avatar>
        </q-item-section>
        <q-item-section>{{cmd.provider.name}}</q-item-section>
        <q-item-section>{{formatDate(cmd.provider.createdAt, 'DATE_ONLY')}}</q-item-section>
      </template>
      <template v-else>
        <q-item-section>{{formatDate(cmd.provider.createdAt, 'DATE_ONLY')}}</q-item-section>
        <q-item-section v-if="(size = cmd.commandLines.length) !== undefined" side>
          {{size}} ligne{{size > 1 ? 's' : ''}}
        </q-item-section>
      </template>
      <q-item-section top side>
        <q-item-label caption>
          livrée
        </q-item-label>
        <q-icon size="xs" v-if="cmd.invoice" color="positive" name="done" />
        <q-icon size="xs" v-else color="warning" name="remove_done" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Command } from '../../graphql/types';
import { formatDate } from '../../shared/date';

export default defineComponent({
  name: 'CommandList',
  props: {
    commands: Array as PropType<Command[]>,
    selectedId: Number,
    withName: Boolean
  },
  emits: ['select'],
  setup() {
    return {
      formatDate
    }
  }
});
</script>

<style scoped>

</style>
