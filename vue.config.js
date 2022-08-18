module.exports = {
    devServer: {
        before: require('./mockjs/index'),
        proxy: {
            "/api": {
                // target: 'https://api.imooc-front.lgdsunday.club/',
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