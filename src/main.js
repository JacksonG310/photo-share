import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "tailwindcss/tailwind.css"
import { useRem } from './utils/resize'
import lib from '@/libs'


useRem();
createApp(App).use(store).use(router).use(lib).mount('#app')