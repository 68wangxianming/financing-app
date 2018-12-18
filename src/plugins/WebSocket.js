const WebSocketClient = require('yue-ws-client');

export default {
  install: (Vue) => {
    Vue.prototype.$wsHandler = WebSocketClient.instance;
  }
}