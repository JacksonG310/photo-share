import { createRouter, createWebHistory } from 'vue-router'
import { isMobile } from '@/utils/isMobile'
import mobileRouter from './modules/mobile-router'
import pcRouter from './modules/pc-router'
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: isMobile.value ? mobileRouter : pcRouter
})

export default router