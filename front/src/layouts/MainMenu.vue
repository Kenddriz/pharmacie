<template>
  <q-list>
    <q-item
      to="/dashboard"
      active-class="text-white bg-teal-8"
      exact
      class="col text-center"
    >
      <q-item-section avatar>
        <q-icon name="dashboard" />
      </q-item-section>
      <q-item-section>Tableau de board</q-item-section>
    </q-item>
    <q-item
      to="/main"
      active-class="text-white bg-teal-8"
      class="col text-center"
    >
      <template v-if="reverse">
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>Espace de travail</q-item-section>
      </template>
      <template v-else>
        <q-item-section>Espace de travail</q-item-section>
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
      </template>
    </q-item>
    <slot v-if="$slots.default"></slot>
  </q-list>
</template>

<script>
export default {
  name: 'MainMenu',
  props: {
    reverse: Boolean
  }
};
</script>

<style scoped>

</style>
