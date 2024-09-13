import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import "vuetify/styles";
import 'vuetify/dist/vuetify.min.css';

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";

const vuetify = createVuetify({
    components,
     directives,
  });


const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(vuetify);
app.mount('#app');