import svgIcon from "./svgIcon/index.vue";

export default {
    install(app) {
        // 全局组成组件
        app.component('m-svg-icon', svgIcon);
    }
}