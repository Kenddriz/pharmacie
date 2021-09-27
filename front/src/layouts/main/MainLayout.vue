<template>
  <q-layout view="lhh lpR fff">
    <q-header elevated>
      <div class="row justify-between items-center q-pa-xs">
        <q-tabs
          v-model="tab"
          no-caps
          dense
          shrink
          inline-label
          class="col-8"
          content-class="justify-between"
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

              <q-list separator>
                <q-item-label header>PHARMANAGER</q-item-label>
                <q-item
                  v-for="(item, index) in sItems"
                  :key="index"
                  :to="`/main/${item.to}`"
                  exact-active-class="text-primary"
                >
                  <q-item-section avatar>
                    <q-icon :name="item.icon" size="xs" class="q-ml-md" color="teal" />
                  </q-item-section>
                  <q-item-section>{{ item.label }}</q-item-section>
                </q-item>
              </q-list>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="register.jpg">
                </q-avatar>

                <div class="text-subtitle1 q-mt-xs q-mb-xs">John Doe</div>

                <q-btn
                  no-caps
                  color="primary"
                  label="Déconnexion"
                  push
                  size="sm"
                  v-close-popup
                />
              </div>
          </q-menu>
        </q-btn>
      </div>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <Footer />
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Footer from './Footer.vue';
  import { pItems, sItems } from './menu' ;

  export default defineComponent({
    name: 'MainLayout',
    components: { Footer },
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
