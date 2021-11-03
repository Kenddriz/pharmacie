<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { invoke } from '@tauri-apps/api/tauri';
import { Command } from '@tauri-apps/api/shell';
import { appWindow } from '@tauri-apps/api/window';

export default defineComponent({
  name: 'App',
  beforeCreate() {
    void new Command('./server.exe').execute();
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        void invoke('close_splashscreen');
        void appWindow.maximize();
      }, 5000);
    });
  },
})
</script>
<style lang="scss">
::-webkit-scrollbar {
  height: 4px;
  width: 5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: -webkit-gradient(linear, left top, left bottom, from($primary), to($primary));
  box-shadow: inset 2px 2px 2px rgba(255, 255, 255, 0.25), inset -2px -2px -2px rgba(0, 0, 0, 0.25);
}
body {
  font-family: Poppins, sans-serif !important;
  overflow: hidden;
  font-size: 12px;
  color: #455a64;
  user-select: none;
}
.sticky-header-table {
  .q-table__top, .q-table__bottom, thead tr:first-child th {
    background-color: white;
  }
  thead tr th {
    position: sticky;
    z-index: 1
  }
  thead tr:first-child th {
    top: 0
  }
  &.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px
  }
}
</style>

