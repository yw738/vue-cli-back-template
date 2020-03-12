
import Dict from '@/views/System/Dict'//系统设置 - 字典管理
import FeedBack from '@/views/System/FeedBack'//系统设置 - 反馈管理
import Menu from '@/views/System/Menu'//系统设置 - 菜单管理
import Role from '@/views/System/Role'//系统设置 - 角色管理
import User from '@/views/System/User'//系统设置 - 用户管理
//系统设置
export default [{
    path: 'Dict',
    name: 'Dict',
    components: {
        pages: Dict
    },
},
{
    path: 'FeedBack',
    name: 'FeedBack',
    components: {
        pages: FeedBack
    },
},
{
    path: 'Menu',
    name: 'Menu',
    components: {
        pages: Menu
    },
},
{
    path: 'Role',
    name: 'Role',
    components: {
        pages: Role
    },
},
{
    path: 'User',
    name: 'User',
    components: {
        pages: User
    },
}]