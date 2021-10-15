<template>
  <q-item-section side>
    <q-btn round icon="more_vert" dense flat :text-color="color">
      <q-menu>
        <q-item @click="$emit('restore')" clickable v-close-popup>
          <q-item-section side>
            <q-icon color="primary" :name="icons[0]" />
          </q-item-section>
          <q-item-section>
            {{labels[0]}}
          </q-item-section>
        </q-item>
        <q-item @click="$emit('remove')" clickable v-close-popup>
          <q-item-section side>
            <q-icon color="deep-orange" :name="icons[1]" />
          </q-item-section>
          <q-item-section>
            {{labels[1]}}
          </q-item-section>
        </q-item>
      </q-menu>
    </q-btn>
  </q-item-section>
</template>

<script>
export default {
  name: 'MenuOperations',
  props: {
    labels: {
      type: Array,
      default: () => (['Restaurer', 'Supprimer'])
    },
    icons: {
      type: Array,
      default: () => (['restore_from_trash', 'delete_forever'])
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  emits: ['remove', 'restore']
};
</script>

<style scoped>

</style>
