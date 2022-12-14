import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import './assets/index'
import useTheme from './utils/theme'
import { useRem } from './utils/resize'
import lib from '@/libs'
import directive from "@/directives";


useRem();
useTheme();
createApp(App).use(store).use(router).use(lib).use(directive).mount('#app')