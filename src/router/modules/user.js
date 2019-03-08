import layoutHeaderAside from '@/layout/header-aside'

export default {
    path: '/user',
    name: '文件管理',
    redirect: {name: 'user-user-info'},
    component: layoutHeaderAside,
    children: (pre =>[
        {
            path: 'userInfo',
            name: `${pre}user-info`,
            meta: {requiresAuth: true, title: "用户信息"},
            component: () => import("@/pages/user-info")
        },{
            path: 'userDetail',
            name: `${pre}user-detail`,
            meta: {requiresAuth: true, "title": "用户详情"},
            component: () => import("@/pages/user-detail")
        },{
            path: 'userAdd',
            name: `${pre}user-add`,
            meta: {requiresAuth: true, title: "添加用户"},
            component: () => import("@/pages/user-add")
        }
    ])('user-')
}