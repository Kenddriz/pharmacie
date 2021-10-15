<template>
  <q-layout view="hHh lpR fFf">

    <q-header  class="bg-primary text-white">
      <div style="height: 35px; font-size: 15px" class="row q-pr-md justify-between items-center">
        <span v-if="title($route.path) === 'trash'">Eléments supprimés</span>
        <q-tabs
          v-else
          v-model="otherLayoutTab"
          no-caps
          dense
          stretch
          inline-label
          content-class="q-gutter-x-lg"
          indicator-color="warning"
        >
          <q-tab
            v-for="(item, index) in sItems"
            :key="index"
            :icon="item.icon"
            :name="item.to"
            :label="item.label"
          />
        </q-tabs>
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
import { otherLayoutTab, sItems } from './menu';

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
        return path.substring(path.lastIndexOf('/') + 1);
      },
      sItems,
      otherLayoutTab
    }
  }
})
</script>

<style scoped>

</style>
