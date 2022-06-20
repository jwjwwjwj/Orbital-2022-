import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { DatePicker } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
import { Quasar } from "quasar";
import iconSet from "quasar/icon-set/fontawesome-v6";

createApp(App).use(DatePicker).use(Antd).use(store).use(router).use(Quasar).use(iconSet).mount('#app')
