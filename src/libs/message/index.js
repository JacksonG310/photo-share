import { h, render } from "vue"
import messageComponents from "./index.vue"
/**
 * 
 * @param {*} type 类型
 * @param {*} content 文本
 * @param {*} duration 持续时间
 */
export const message = (type, content, duration = 3000) => {
    const close = () => {
        setTimeout(() => {
            render(null, document.body);
        }, 500)
    }
    const vnode = h(messageComponents, { close, type, content, duration });
    render(vnode, document.body);
}