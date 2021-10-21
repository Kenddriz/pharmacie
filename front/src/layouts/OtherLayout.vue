<template>
  <q-layout view="hHh lpR fFf">
    <WindowTools>
      <span v-if="title($route.path) === 'trash'">Eléments supprimés</span>
      <q-tabs
        v-else
        v-model="otherLayoutTab"
        no-caps
        dense
        stretch
        inline-label
        content-class="q-gutter-x-lg"
        active-color="warning"
      >
        <q-tab
          v-for="(item, index) in sItems"
          :key="index"
          :icon="item.icon"
          :name="item.to"
          :label="item.label"
        />
      </q-tabs>
      <template v-slot:end>
        <q-btn dense flat icon="menu" @click="toggleRightDrawer" />
      </template>
    </WindowTools>

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
import WindowTools from '../components/shared/WindowTools.vue';

export default defineComponent({
  name: 'OtherLayout',
  components: { Footer, Account, WindowTools },
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
