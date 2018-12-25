import i18n from "../language"

// console.log(i18n.t('m.label1'));

export default {
    mode: 'history',
    base: process.env.BASE_URL,
    '/login': {
        meta: {title: '登录'},
        component: (resolve) => {
            require(['views/login/index.vue'], resolve)
        }
    },
    '/index': {
        meta: {title: 'index'},
        component: (resolve) => {
            require(['views/index/index.vue'], resolve)
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                meta: {title: '首页'},
                component: (resolve) => {
                    require(['views/home/index/index.vue'], resolve)
                }
            },
            {
                path: '/investment',
                meta: {title: '投资'},
                component: (resolve) => {
                    require(['views/investment/index/index.vue'], resolve)
                }
            },
            {
                path: '/mine',
                meta: {title: '我的'},
                component: (resolve) => {
                    require(['views/mine/index/index.vue'], resolve)
                }
            },
        ]
    },
    '/darenList': {
        meta: {title: '投资达人榜单'},
        component: (resolve) => {
            require(['views/investment/darenList/index.vue'], resolve)
        }
    },
    '/tenderLoan': {
        meta: {title: '投标出借'},
        component: (resolve) => {
            require(['views/investment/tenderLoan/index.vue'], resolve)
        }
    },
    '/moneyFlow': {
        meta: {title: '资金流水'},
        component: (resolve) => {
            require(['views/mine/moneyFlow/index.vue'], resolve)
        }
    },
    '/investmentRecord': {
        meta: {title: '投资记录'},
        component: (resolve) => {
            require(['views/mine/investmentRecord/index.vue'], resolve)
        }
    },
    '/dataMangement': {
        meta: {title: '资料管理'},
        component: (resolve) => {
            require(['views/mine/dataMangement/index.vue'], resolve)
        }
    },
    '/onlineService': {
        meta: {title: '在线客服'},
        component: (resolve) => {
            require(['views/mine/onlineService/index.vue'], resolve)
        }
    },
    '/setUp': {
        meta: {title: '设置'},
        component: (resolve) => {
            require(['views/setUp/index/index.vue'], resolve)
        }
    },
    '/setSafe': {
        meta: {title: '账户安全'},
        component: (resolve) => {
            require(['views/setUp/setSafe/index.vue'], resolve)
        }
    },
    '/setPass': {
        meta: {title: '设置支付密码'},
        component: (resolve) => {
            require(['views/setUp/setPass/index.vue'], resolve)
        }
    },
    '/baseInfo': {
        meta: {title: '基本信息'},
        component: (resolve) => {
            require(['views/mine/baseInfo/index.vue'], resolve)
        }
    },
    '/bankCard': {
        meta: {title: '银行卡'},
        component: (resolve) => {
            require(['views/mine/bankCard/index.vue'], resolve)
        }
    },
    '/recharge': {
        meta: {title: '充值'},
        component: (resolve) => {
            require(['views/mine/recharge/index.vue'], resolve)
        }
    },
    '/rechargePrompt': {
        meta: {title: '充值提示'},
        component: (resolve) => {
            require(['views/mine/rechargePrompt/index.vue'], resolve)
        }
    },
}
