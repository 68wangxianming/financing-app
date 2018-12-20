import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        uuid: null,
        adminToken: null,
    },
    mutations: {
        UPDATE_ADMIN_TOKEN(state, value) {
            state.adminToken = value;
            localStorage.setItem("adminToken", value)
        },
    },
    actions: {
        FLASH_ADMIN_TOKEN(store) {
            if (!store.state.adminToken) {
                store.commit('UPDATE_ADMIN_TOKEN', localStorage.getItem('adminToken'));
            }
        }
    }
});
