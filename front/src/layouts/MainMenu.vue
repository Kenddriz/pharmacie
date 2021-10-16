<template>
  <q-list>
    <q-item
      to="/other/dashboard"
      :active-class="activeClass"
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
      :active-class="activeClass"
      class="col text-center"
    >
      <q-item-section avatar>
        <q-icon name="workspaces" />
      </q-item-section>
      <q-item-section>Espace de travail</q-item-section>
    </q-item>
    <slot v-if="$slots.default"></slot>
    <q-item
      to="/other/trash"
      :active-class="activeClass"
      class="col text-center"
    >
      <q-item-section avatar>
        <q-icon name="delete_sweep" />
      </q-item-section>
      <q-item-section>Corbeille</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'MainMenu',
  props: {
    activeClass: {
      type: String,
      default: 'text-white bg-teal-8'
    }
  }
};
</script>

<style scoped>

</style>
