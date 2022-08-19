export default {
    install(app) {

        // 获取当前文件夹下所有的组件,$1:文件参数，$2:是否查找子目录，$3:正则匹配
        const components = require.context('./', true, /index\.vue$/);
        // 遍历组件
        components.keys().forEach(key => {
            // 指定组件名称
            const componentName = 'm-' + key.replace('./', '').split('/')[0];
            // 注册组件
            app.component(componentName, components(key).default);
        })
    }
}