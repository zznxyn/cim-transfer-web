const path = require('path')

function resolve (dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    devServer: {
        disableHostCheck: true,
        open: false, //编译后默认打开浏览器
        // host: 'localhost', //域名
        port: 8080,  //端口
        // /*proxy: {
        //     "/api": {
        //         target: "http://192.168.0.10:9000",
        //         changeOrigin: true,
        //         ws: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // }*/
    },
    productionSourceMap: false,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [path.resolve(__dirname, 'src/assets/css/cim_global.less')]
        }
    },
    configureWebpack: {
        context: path.resolve(__dirname, './'),
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': resolve('src'),
                '@assets': resolve('src/assets'),
                '@comp': resolve('src/components'),
                '@utils': resolve('src/utils')
            }
        },
    }
}
