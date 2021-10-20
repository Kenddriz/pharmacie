<template>
  <q-header>
    <q-bar data-tauri-drag-region class="bg-primary text-white">
      <slot></slot>
      <q-space />
      <div class="q-gutter-x-sm">
        <slot name="end"></slot>
        <q-btn class="no-border-radius" @click="minimize" flat dense>
          <q-icon style="top: -5px" name="minimize" />
        </q-btn>
        <q-btn class="no-border-radius" @click="maximize" flat dense :icon="toggleScreen" />
        <q-btn class="no-border-radius" @click="close" flat dense icon="close" />
      </div>
    </q-bar>
  </q-header>
</template>

<script lang="ts">
import { appWindow } from '@tauri-apps/api/window';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'WindowTools',
  props: {
    showAccount: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const toggleScreen = ref<string>('fullscreen');
    function maximize() {
      appWindow.isMaximized().then(max => {
        if(max){
          void appWindow.unmaximize();
          toggleScreen.value = 'fullscreen';
        }
        else {
          void appWindow.maximize();
          toggleScreen.value = 'fullscreen_exit';
        }
      }).catch(() => void appWindow.maximize())
      void appWindow.maximize();
    }
    return {
      toggleScreen,
      minimize() {
        void appWindow.minimize();
      },
      maximize,
      close() {
        void appWindow.close();
      }
    }
  },
});
</script>

<style lang="scss" scoped>
 .q-btn {
   &:hover { background: $red-9;}
 }
</style>
