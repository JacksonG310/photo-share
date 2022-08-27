import { h, render } from "vue";
import confirmComponent from './index.vue'
/**
 * 
 * @param {String} title 标题 
 * @param {String} content 内容 
 * @param {String} cancelText 取消按钮文本 
 * @param {String} confirmText 确定按钮文本
 */
export const confirm = (title, content, cancelText, confirmText) => {
    return new Promise((resolve, reject) => {
        if (title && !content) {
            content = title;
            title = '';
        }

        // 关闭回调
        const closeHandler = () => {
            // 销毁组件
            render(null, document.body);
        };
        // 取消回调
        const cancelHandler = () => {
            reject();
        };
        // 确定回调
        const confirmHandler = () => {
            resolve();
        };
        // 生成vnode
        const vnode = h(confirmComponent, {
            title,
            content,
            cancelText,
            confirmText,
            closeHandler,
            cancelHandler,
            confirmHandler
        });
        // 渲染
        render(vnode, document.body);
    })
}