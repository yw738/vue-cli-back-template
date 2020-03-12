import { get, post, del, put, post2, putJson, postFile, getFileDown } from './http.js'

// 菜单相关接口
export const menuListApi = g => get('/api/menu/v1/menuList', g);//获取菜单列表（有子菜单形式）
export const menusApi = g => get('/api/menu/v1/menus', g);//获取菜单列表
export const menuAddApi = g => post('/api/menu/v1/menus', g);//新增菜单  ---------------------------------- 没对
export const menuPutApi = (id, p) => post2(`/api/menu/v1/menus/${id}`, p);//修改菜单

// 权限相关接口
export const qxListApi = g => get('/api/privilege/v1/privilegesByMenuId', g);//获取菜单权限列表
export const qxAddApi = p => post('/api/privilege/v1/privileges', p);//新增权限
export const qxDelApi = id => del(`/api/privilege/v1/privileges/${id}`);//删除权限
export const qxPutApi = (id, p) => put(`/api/privilege/v1/privileges/${id}`, p);//修改权限

//后台角色相关的服务
export const roleInitApi = p => post(`/api/role/v1/addRolePrivilege`, p);//更新或新增用户角色
export const roleGetApi = p => get(`/api/role/v1/getPrivileageList`, p);//获取有checkbox的菜单权限树
export const rolesApi = p => get(`/api/role/v1/roles`, p);//获取菜单列表
export const roleAddApi = p => post2(`/api/role/v1/roles`, p);//新增角色
export const rolePutApi = (id, p) => put(`/api/role/v1/roles/${id}`, p);//修改角色
export const roleDelApi = id => del(`/api/role/v1/roles/${id}`);//删除角色

//后台用户相关菜单
export const loginApi = p => post2(`/api/back-user/v1/back-users/login/`, p);//登录
export const loginoutApi = p => post(`/api/back-user/v1/loginout`, p);//登出  ------------------------------ 没对
export const isQxApi = p => get(`/api/back-user/v1/notallow`, p);//是否不允许
export const fxsLostApi = p => get(`/api/back-user/v1/distributorUsers`, p);//获取分销商用户列表
export const userMenusApi = p => get(`/api/back-user/v1/menus`, p);//获取用户菜单和权限
export const setPassApi = p => put(`/api/back-user/v1/password`, p);//修改密码
export const resetPassApi = id => post(`/api/back-user/v1/resetpswd/${id}`);//重置用户的密码
export const userListApi = g => get(`/api/back-user/v1/users`, g);//获取用户列表
export const userAddApi = p => post2(`/api/back-user/v1/users`, p);//新增用户
export const userPutApi = (id, p) => putJson(`/api/back-user/v1/users/${id}`, p);//修改用户
export const userDelApi = (id, p) => del(`/api/back-user/v1/users/${id}`, p);//删除用户

//字典相关接口
export const dictDelApi = id => del(`/api/dict/v1/dict/${id}`);//删除字典
export const dictAddlApi = p => post(`/api/dict/v1/dict/save`, p);//保存字典
export const dictListApi = p => get(`/api/dict/v1/dicts`, p);//字典 列表
//意见反馈相关接口
export const fbListApi = p => get(`/api/fu-feedBack/v1/fu-feedBack`, p);//反馈 列表
export const fbPutApi = p => put(`/api/fu-feedBack/v1/fu-feedBack/deal`, p);//处理反馈意见

export const isLoginApi = p => post(`/api/islogin`, p);//验证用户是否登录的例子

