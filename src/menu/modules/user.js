export default {
    path: '/user',
    title: '人员管理',
    icon: 'globe',
    children: (pre => [
        { path: `${pre}userAdd`, title: '添加人员', icon: 'book' },
        { path: `${pre}userInfo`, title: '人员信息', icon: 'book' }
    ])('/user/')
}
