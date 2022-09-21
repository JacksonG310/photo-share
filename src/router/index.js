import { createRouter, createWebHashHistory } from 'vue-router'
import { isMobile } from '@/utils/isMobile'
import mobileRouter from './modules/mobile-router'
import pcRouter from './modules/pc-router'
const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: isMobile.value ? mobileRouter : pcRouter
})

export default router