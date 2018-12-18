const path = require('path')
let px2rem = require('postcss-px2rem');

function resolve(dir) {
    return path.join(__dirname, dir)
}

const addZero = function (n) {
    return Number(n) < 10 ? '0' + n : n;
};

const date = new Date();
const year = date.getFullYear();
const month = addZero(date.getMonth() + 1);
const day = addZero(date.getDate());
const hours = addZero(date.getHours());
const minutes = addZero(date.getMinutes());
const getFullDate = `${year}${month}${day}${hours}${minutes}`;


module.exports = {

    baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',

    lintOnSave: false,//否使用eslint

    productionSourceMap: false, // productionSourceMap：{ type:Bollean,default:true } 生产源映射,如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建

    css: {
        extract: {
            filename: `css/[name].${getFullDate}.css`,
            chunkFilename: `css/[name].${getFullDate}.css`,
        },
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
                loaders: [
                    {
                        test: /\.css$/,
                        loader: "style-loader!css-loader!postcss-loader"
                    }
                ],
            },
            postcss: {
                plugins: () => [px2rem({
                    remUnit: 37.5,
                    baseDpr: 2
                })]
            }
        }
    },
    configureWebpack: {
        output: {
            filename: `js/[name].${getFullDate}.js`,
            chunkFilename: `js/[name].${getFullDate}.js`,
        },
    },

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('router', resolve('src/router'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'))
            .set('common', resolve('src/common'))
            .set('plugins', resolve('src/plugins'))
        // config.module
        //     .rule('vue')
        //     .use('vue-loader')
        //     .tap(options =>
        //         merge(options, {
        //             optimizeSSR: false
        //         })
        //     )
    },

    // PWA 插件的选项。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli-plugin-pwa/README.md
    pwa: {},

    // devServer: {
    //     port: 8080, // 端口号
    //     host: 'localhost',
    //     https: false, // https:{type:Boolean}
    //     open: false, //配置自动启动浏览器
    // },

    // 三方插件的选项
    pluginOptions: {
        // ...
    }
}
