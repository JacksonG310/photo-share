import { THEME_LIGHT, THEME_DARK } from '@/constants'
import { watch } from "vue";
import store from "../store";
// 初始化主题
export default function() {
    // 当主题发生改变时，，或者进入系统时可以进行html、css的配置
    watch(
        () => store.getters.themeType,
        (val) => {
            let themeClassName = '';
            switch (val) {
                case THEME_LIGHT:
                    themeClassName = 'light';
                    break;
                case THEME_DARK:
                    themeClassName = 'dark';
                    break;
            }
            document.querySelector('html').className = themeClassName
        }, {
            immediate: true
        })
}