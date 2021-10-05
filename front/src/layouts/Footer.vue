<template>
  <q-footer class="bg-grey-3 text-blue-grey-14">
    <q-list bordered dense class="row justify-center text-body1">
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
        <q-item-section>Espace de travail</q-item-section>
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-footer>
</template>

<script lang="ts">
import  {defineComponent, ref} from 'vue';
  export default defineComponent({
    name: 'Footer',
    setup() {
      return {
        tab: ref<string>('tab1')
      }
    }
  });
</script>

<style scoped>
</style>
