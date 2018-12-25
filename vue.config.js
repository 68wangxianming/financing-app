const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    baseUrl: '/',
    outputDir: 'dist',
    lintOnSave: true,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('router', resolve('src/router'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
            .set('common', resolve('src/common'))
            .set('plugins', resolve('src/plugins'))
    },
    configureWebpack: () => {
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {},
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: false,                                 //配置自动启动浏览器
        host: '0.0.0.0',
        port: 3000,                                 // 端口号
        https: false,
        hotOnly: false,                             // https:{type:Boolean}
        proxy: null,                                // 设置代理
        before: app => {
        }
    },
    // 第三方插件配置
    pluginOptions: {}
}
