import Vue from 'vue'
import store from "../store/store.js";

const baseUrl = (location.host != 'www.rupiahone.com' ? 'http://192.168.1.99:6009' : '/api/')
Vue.prototype.$baseUrl = baseUrl

let config = {
    _beforeHttpFunc: function (para, headers) {
        store.dispatch("FLASH_ADMIN_TOKEN")
        store.state.adminToken && (headers = {Authorization: 'Bearer ' + store.state.adminToken, ...headers});
        if (para instanceof FormData)
            return {para, headers};
        para = Object.assign({}, {appId: 'yue'}, para)
        return {para, headers}
    },

    _afterHttpFunc: function (res) {
        if (res.code != '200') {
            Vue.prototype.$messagebox({
                title: '提示',
                message: res.msg,
            })
            return null;
        }
        return res;
    },

    captcha: {method: 'get', url: '/captcha'},
    sendCaptchaSms: {method: 'post', url: '/sendCaptchaSms'},
    login: {method: 'post', url: '/login'},
    getUserInfo: {method: 'get', url: '/getUserInfo'},
    getAccountInfo: {method: 'get', url: '/getAccountInfo'},
    getYesterdayEarning: {method: 'get', url: '/getYesterdayEarning'},
    getFocusProduct: {method: 'get', url: '/getFocusProduct'},
    getNewUserRate: {method: 'get', url: '/getNewUserRate'},
    getProductList: {method: 'get', url: '/getProductList'},
}

Object.keys(config).forEach(v => config[v].url = baseUrl + config[v].url);
export default config

