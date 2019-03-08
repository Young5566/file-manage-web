export default {
    path: '/file',
    title: '文件管理',
    icon: 'globe',
    children: (pre => [
        { path: `${pre}fileInfo`, title: '文件信息', icon: 'book' }
    ])('/file/')
}
