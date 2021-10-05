<template>
  <q-layout view="hHh lpR fFf">

    <q-header  class="bg-primary text-white">
      <div style="height: 35px; font-size: 15px" class="row q-px-md justify-between items-center">
        Résultats statistiques
        <q-space />
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </div>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <Footer />

  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Footer from './Footer.vue';

export default defineComponent({
  name: 'Dashboard',
  components: { Footer },
  setup () {
    const rightDrawerOpen = ref(false)

    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
})
</script>

<style scoped>

</style>
