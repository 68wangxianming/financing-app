export default {
    '/login': {
        name: 'login',
        meta: {title: 'login'},
        component: (resolve) => {
            require(['@views/login/login.vue'], resolve)
        }
    },
    '/test': {
        name: 'test',
        meta: {title: 'test'},
        component: (resolve) => {
            require(['@views/test.vue'], resolve)
        }
    },
    '/fond': {
        name: 'fond',
        meta: {title: 'fond'},
        component: (resolve) => {
            require(['@views/fond.vue'], resolve)
        }
    },
}
