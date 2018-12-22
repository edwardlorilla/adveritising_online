/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import VueRouter from 'vue-router'
Vue.use(ElementUI, {locale})
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        component: resolve => require(["./components/advert-publisher/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-advert-publisher',
                component: resolve => require(["./components/advert-publisher/view.vue"], resolve),
            },
            {
                path: 'create',
                name: 'create-advert-publisher',
                component: resolve => require(["./components/advert-publisher/create.vue"], resolve),
            },
            {
                path: 'edit/:id',
                name: 'edit-advert-publisher',
                component: resolve => require(["./components/advert-publisher/create.vue"], resolve),
            },
        ]
    },{
        path: '/adverts',
        component: resolve => require(["./components/advert/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-advert',
                component: resolve => require(["./components/advert/view.vue"], resolve),
            },
            {
                path: 'create',
                name: 'create-advert',
                component: resolve => require(["./components/advert/create.vue"], resolve),
            },
            {
                path: 'edit/:id',
                name: 'edit-advert',
                component: resolve => require(["./components/advert/create.vue"], resolve),
            },
        ]
    },{
        path: '/tags',
        component: resolve => require(["./components/tag/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-tag',
                component: resolve => require(["./components/tag/view.vue"], resolve),
            },
            {
                path: 'create',
                name: 'create-tag',
                component: resolve => require(["./components/tag/create.vue"], resolve),
            },
            {
                path: 'edit/:id',
                name: 'edit-tag',
                component: resolve => require(["./components/tag/create.vue"], resolve),
            },
        ]
    },{
        path: '/users',
        component: resolve => require(["./components/user/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-user',
                component: resolve => require(["./components/user/view.vue"], resolve),
            },
            {
                path: 'create',
                name: 'create-user',
                component: resolve => require(["./components/user/create.vue"], resolve),
            },
            {
                path: 'edit/:id',
                name: 'edit-user',
                component: resolve => require(["./components/user/create.vue"], resolve),
            },
            {
                path: 'advert/:id',
                name: 'advert-user',
                component: resolve => require(["./components/user/viewuseradvert.vue"], resolve),
            },
        ]
    },{
        path: '/useradvert',
        component: resolve => require(["./components/useradvert/index.vue"], resolve),
        children: [
            {
                path: '',
                name: 'view-useradvert',
                component: resolve => require(["./components/useradvert/view.vue"], resolve),
            },
            {
                path: 'create',
                name: 'create-useradvert',
                component: resolve => require(["./components/useradvert/create.vue"], resolve),
            },
            {
                path: 'edit/:id',
                name: 'edit-useradvert',
                component: resolve => require(["./components/useradvert/create.vue"], resolve),
            },
        ]
    },
];
const router = new VueRouter({
    mode: 'history',
    routes
})

$(window).on('load', function () {
    new Vue({
        el: '#app',
        data(){
            return {
                validate: {
                    required: [
                        {required: true}
                    ]
                }
            }
        },
        router,
        render: h => h(require('./components/App.vue'))
    });
});