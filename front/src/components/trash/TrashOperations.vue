<template>
  <q-item-section side>
    <q-btn round icon="more_vert" dense flat color="primary">
      <q-menu>
        <q-item @click="$emit('restore')" clickable v-close-popup>
          <q-item-section side>
            <q-icon color="primary" name="restore_from_trash" />
          </q-item-section>
          <q-item-section>
            Restaurer
          </q-item-section>
        </q-item>
        <q-item @click="$emit('remove')" clickable v-close-popup>
          <q-item-section side>
            <q-icon color="deep-orange" name="delete_forever" />
          </q-item-section>
          <q-item-section>
            Supprimer
          </q-item-section>
        </q-item>
      </q-menu>
    </q-btn>
  </q-item-section>
</template>

<script>
export default {
  name: 'TrashOperations',
  emits: ['remove', 'restore']
};
</script>

<style scoped>

</style>
