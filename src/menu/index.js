
import file from './modules/file'
import user from './modules/user'

// 菜单 侧边栏
export const menuAside = [
    file,
    user
]

// 菜单 顶栏
export const menuHeader = [
    {
        path: '/index',
        title: '首页',
        icon: 'home'
    },
    {
        title: '人员管理',
        icon: 'puzzle-piece',
        children: [
            {
                path: "/user/userAdd",
                title:"添加人员",
                icon: 'book'
            },
            {
                path: "/user/userInfo",
                title:"人员信息",
                icon: 'book'
            }
        ]
    },{
        title: '文件管理',
        icon: 'puzzle-piece',
        children: [
            {
                path: "/file/fileInfo",
                title:"文件信息",
                icon: 'book'
            }
        ]
    }
]
