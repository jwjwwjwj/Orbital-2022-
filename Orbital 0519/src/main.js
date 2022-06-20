import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { DatePicker } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

createApp(App).use(DatePicker).use(Antd).use(store).use(router).mount('#app')
