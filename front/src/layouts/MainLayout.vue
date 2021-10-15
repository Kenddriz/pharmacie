<template>
  <q-layout view="lhh lpR fff">
    <q-header>
      <div class="row justify-between items-center q-pr-md">
        <q-tabs
          v-model="tab"
          no-caps
          dense
          shrink
          inline-label
          class="col-8"
          content-class="justify-between"
          indicator-color="warning"
        >
          <q-route-tab
            v-for="(item, index) in pItems"
            :key="index"
            :to="`/main/${item.to}`"
            exact
            :icon="item.icon"
            :name="index"
            :label="item.label"
          />
        </q-tabs>
        <q-space />
        <q-btn round icon="more_vert" unelevated size="sm">
          <q-menu class="row no-wrap q-pa-md">
            <Account />
          </q-menu>
        </q-btn>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Footer from './Footer.vue';
  import { pItems, sItems } from './menu' ;
  import Account from '../components/account/Account.vue';

  export default defineComponent({
    name: 'MainLayout',
    components: { Footer, Account },
    setup() {
      return {
        tab: ref<number>(0),
        pItems,
        sItems,
        thumbStyle: {
          right: '4px',
          borderRadius: '7px',
          backgroundColor: '#027be3',
          width: '4px',
          opacity: 0.75
        },

        barStyle: {
          right: '2px',
          borderRadius: '9px',
          backgroundColor: '#027be3',
          width: '8px',
          opacity: 0.2
        },
      }
    },
    /*mounted: function () {
      window.document.body.onscroll = () => {
        this.data.bg_header = window.scrollY > 100 ? 'bg-primary' : 'bg-transparent';
      }
    },*/
  });
</script>
<style lang="scss">
  a:active {
    color: $positive!important;
  }
  html {
    scroll-behavior: smooth;
  }
</style>
