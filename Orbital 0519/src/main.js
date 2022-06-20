import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { DatePicker } from 'ant-design-vue';
import Vuelidate from 'vuelidate'
import 'ant-design-vue/dist/antd.css'
import { Quasar } from "quasar";
import iconSet from "quasar/icon-set/fontawesome-v6";

<<<<<<< Updated upstream
createApp(App).use(DatePicker).use(Antd).use(store).use(router).use(Quasar).use(iconSet).mount('#app')
=======
createApp(App).use(Vuelidate).use(DatePicker).use(Antd).use(store).use(router).mount('#app')
>>>>>>> Stashed changes
