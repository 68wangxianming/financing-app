import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/store.js"
import i18n from "./language"
import 'lib-flexible'
import './registerServiceWorker'
import NetworkHandler from "./plugins/NetworkHandler"
import NetworkConfig from "./apis/NetworkConfig"
import Function from './plugins/index'
import './assets/css/rest.css'
import './assets/icon/iconfont.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import GlobalFunction from './plugins/GlobalFunctions'
import Listener from './plugins/Listener'
import JsBridge from "./plugins/JsBridge"
// import vConsole from '../vconsole.js'

Vue.use(Listener)
Vue.use(GlobalFunction)
Vue.use(JsBridge);
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
Vue.prototype.$Func = Function
Vue.use(NetworkHandler, NetworkConfig);
Vue.use(MintUI)

import 'vant/lib/button/style';
import 'vant/lib/number-keyboard/style';
import 'vant/lib/popup/style';
import 'vant/lib/field/style';
import 'vant/lib/tab/style';
import 'vant/lib/tabs/style';
import 'vant/lib/collapse/style';
import 'vant/lib/collapse-item/style';
import 'vant/lib/nav-bar/style';
import 'vant/lib/password-input/style';
import {Button, NumberKeyboard, Popup, Field, Tab, Tabs, Collapse, CollapseItem, NavBar, PasswordInput} from 'vant';

Vue.use(Button).use(NumberKeyboard).use(Popup).use(Field).use(Tab).use(Tabs).use(Collapse).use(CollapseItem).use(NavBar).use(PasswordInput);

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
