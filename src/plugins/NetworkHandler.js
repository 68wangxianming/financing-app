const networkMaps = new Map();
const axios = require('axios');
const qs = require('qs');

class NetworkHandler {

  constructor(config) {
    this._beforeHttpFunc = config._beforeHttpFunc;
    this._afterHttpFunc = config._afterHttpFunc;

    delete config._beforeHttpFunc
    delete config._afterHttpFunc

    config && Object.keys(config).forEach(k => networkMaps.set(k, config[k]));
  }

  async sendRequest(key, para, headers = {},needLoading=false,loadingField=undefined,VueObject) {

    needLoading && (VueObject[loadingField]=true);

    if (!key || !networkMaps.has(key)) {
      console.error('no such network key :' + key);
      return undefined;
    }

    let reqConfig = networkMaps.get(key);

    let beforeConf = this._beforeHttpFunc(para, headers);
    para = beforeConf.para;
    headers = beforeConf.headers;

    let method = reqConfig.method.toLowerCase();
    let url = reqConfig.url;

    let config = {method, url, headers};
    ['get','delete'].includes(method) && (config.params = para);
    ['post', 'put', 'patch'].includes(method) && (config.data = para);

    let content_type = headers['Content-Type'] && headers['Content-Type'].split(';')[0] || null;
    content_type === 'application/x-www-form-urlencoded' && (config.transformRequest = [function (data) {
      return qs.stringify(data);
    }]);

    let res = new Promise((resolve, reject) => {
      axios(config).then(res => {
        res = res && res.data || res;
        // console.log('===HttpUtil Resolve===', res);
        resolve(res);
      }).catch(err => {
        err = err.response && err.response.data || err;
        console.log('===HttpUtil Reject===', err);
        reject(err);
      });
    });

    try {
      res = await res;
    } catch (e) {
      console.error('====Network Error', JSON.stringify(e));
      res = {
        code: 'error',
        error: e
      }
    }

    needLoading && (VueObject[loadingField]=false);

    return this._afterHttpFunc(res);

  }
}

export default {
  install: (Vue, options) => {
    Vue.prototype.$api = new NetworkHandler(options);
  }
}
