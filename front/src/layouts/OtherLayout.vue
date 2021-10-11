<template>
  <q-layout view="hHh lpR fFf">

    <q-header  class="bg-primary text-white">
      <div style="height: 35px; font-size: 15px" class="row q-px-md justify-between items-center">
          {{$tm('otherLayout.' + title($route.path))}}
        <q-space />
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </div>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <Account />
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
import Account from '../components/account/Account.vue';

export default defineComponent({
  name: 'OtherLayout',
  components: { Footer, Account },
  setup () {
    const rightDrawerOpen = ref(false);
    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      title: (path: string)=> {
        path = path.substring(path.lastIndexOf('/') + 1);
        return path === 'trash' ? 'trash' : 'dashboard';
      }
    }
  }
})
</script>

<style scoped>

</style>
