import layoutHeaderAside from '@/layout/header-aside'

export default {
    path: '/file',
    name: '文件管理',
    redirect: {name: 'file-file-info'},
    component: layoutHeaderAside,
    children: (pre =>[
        {
            path: 'fileInfo',
            name: `${pre}file-info`,
            meta: {requiresAuth: true, title: "文件信息"},
            component: () => import("@/pages/file-info")
        },{
            path: 'fileDetail',
            name: `${pre}file-detail`,
            meta: {requiresAuth: true, "title": "文件详情"},
            component: () => import("@/pages/file-detail")
        }
    ])('file-')
}