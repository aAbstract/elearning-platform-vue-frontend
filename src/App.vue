<script setup lang="ts">

// lib
import { get_cookies, set_cookie } from './Lib/cookie';
import { set_lang } from './Lib/lang';

// UI components
import StatusBar from './Components/Common/StatusBar.vue';

// API
import { setup_http_proxy } from './API/api_utils';

// primevue
import Toast from 'primevue/toast';

// prepare system config
setup_http_proxy();

let cookies: any = get_cookies();
let lang: string = cookies['lang'];
if (typeof lang === 'undefined') {
  lang = 'en';
  set_cookie('lang', 'en');
}
set_lang(lang);

</script>

<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <Toast position="top-right" />
    <StatusBar />
    <router-view style="flex-grow: 1;" />
  </div>
</template>

<style>
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: var(--surface-c);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: "Cairo", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c2c2c;
  width: 100%;
  height: 100%;
}

.error_text {
  text-align: center;
  color: #DD2C00;
  display: none;
  font-weight: bold;
}
</style>
