import Vue from "vue";
import Router from "vue-router";
import routes from './map';

Vue.use(Router);

let router, notFound

notFound = {
    path: '*',
    meta: {title: '404'},
    component: (resolve) => {
        require(['../views/404/index.vue'], resolve)
    }
}

router = new Router({
    mode: 'hash',
    routes: Object.keys(routes).reduce((previous, current) => {
        return (previous.push({path: current, ...routes[current]}), previous)
    }, []).concat(notFound),
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
})

router.beforeEach(({matched}, from, next) => {
    matched
        .filter(({meta}) => meta.title)
        .map(({meta}) => document.title = meta.title)
    next()
})

router.afterEach(transition => {
});

Vue.router = router

export default router

