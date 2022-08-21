import createPersistedState from 'vuex-persistedstate';
import { createStore } from 'vuex';
import getters from "./getters";
import category from './modules/category';
import theme from './modules/theme'
export default createStore({
    getters,
    modules: {
        category,
        theme
    },
    plugins: [
        createPersistedState({
            // 指定本地存储key值
            key: 'photo-front',
            // 需要保存的模块
            paths: ['category', 'theme']
        })
    ]
})