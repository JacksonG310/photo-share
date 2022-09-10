// import lazy from "./modules/lazy";

export default {
    install(app) {
        // 全局注册指令
        const drecRequire = require.context('./modules', false, /\.js$/);
        drecRequire.keys().forEach(key => {
            const name = key.replace('./', '').split('.')[0];
            app.directive(name, drecRequire(key).default);
        });
        // app.directive('lazy', lazy);
    }

}