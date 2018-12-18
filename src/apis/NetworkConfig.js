import Vue from 'vue'
import store from "../store/store.js";
// const baseUrl = (location.host != 'www.rupiahone.com' ? 'https://lendingone.yuanstar.com/adminapi/' : '/api/')
const baseUrl = (location.host != 'www.rupiahone.com' ? 'http://admin-api.dev.yuanstar.com' : '/api/')
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
            alert(res.msg || (res.error && res.error.msg) || "网络异常")
            // Vue.prototype.$alert(res.msg || (res.error && res.error.msg) || "网络异常");
            return null;
        }
        return res;
    },

    captcha: {method: 'get', url: '/api/captcha'},
}

Object.keys(config).forEach(v => config[v].url = baseUrl + config[v].url);
export default config

