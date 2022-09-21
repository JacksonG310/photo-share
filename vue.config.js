const path = require('path');
module.exports = {
    chainWebpack: (config) => {
        config.module
            .rule('svg')
            .exclude.add(path.resolve(__dirname, 'src/assets/icons')) // 排除图标所在目录，不要当做svg图片处理
            .end()
        config.module
            .rule('icons').test(/\.svg$/) //定义一个名为icons的规则
            .include.add(path.resolve(__dirname, 'src/assets/icons')) //设置规则生效目录
            .end()
            .use('svg-sprite') // 指定svg-sprite loader
            .loader('svg-sprite-loader') // 使用lodaer
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

    },
    devServer: {
        before: require('./mockjs/index'),
        proxy: {
            "/api": {
                target: 'http://localhost:8080/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    }
}