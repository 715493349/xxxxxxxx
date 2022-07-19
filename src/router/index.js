/*
 * @Author: luo_h603
 * @Date: 2022-07-14 16:29:45
 * @LastEditTime: 2022-07-19 10:10:48
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from "@/store/index";

const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login/index.vue')
    },
    {
        path: '/',
        name: 'layout',
        component: Layout,
        redirect: '/welcome',
        children: [{
                path: '/roles',
                name: 'roles',
                component: () =>
                    import ('@/views/roles/index')
            },
            {
                path: '/welcome',
                name: 'welcome',
                component: () =>
                    import ('@/views/welcome/index.vue')
            },
            {
                path: '/users',
                name: 'users',
                component: () =>
                    import ('@/views/users/index')
            },
            {
                path: '/goods',
                name: 'goods',
                component: () =>
                    import ('@/views/goods/index')
            },
            {
                path: '/power',
                name: 'power',
                component: () =>
                    import ('@/views/power/index')
            }
        ]
    }
]

// 路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 前置路由守卫
router.beforeEach((to, from, next) => {
    // console.log('store', store.state.userInfo);
    if (!store.state.userInfo.userInfo.username) {
        if (to.path === '/login') {
            next();
            return;
        }
        next('/login');
    } else {
        next();
    }
})

// 后置路由

export default router