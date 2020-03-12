import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/layout/Home'
import HomePage from '@/views/HomePage'
import Login from '@/views/Login/Login'
import { isLoginApi } from './api/api'

import systemSetting from "@/router/systemSettings"
Vue.use(Router);
// 路由
let router = new Router({
  routes: [
    {
      path: '/',
      components:{
        app:Home
      },
      children:[
        {
          path: 'HomePage',
          name: 'HomePage',
          components:{
            pages:HomePage
          },
        },
        ...systemSetting,
        { path: '/', redirect: 'HomePage' },

      ]
    },
    {
      path: '/Login',
      name: 'Login',
      components:{
        app:Login
      },
    },
  ]
})

//登录拦截例子需要配合vuex，看需求使用，代码仅供参考。
//大致逻辑：
//=>检测vuex里面用户是否登陆了
//      =>vuex里面登陆了，正常进行下一步。
//      =>vuex里面未登录，调用一个接口来验证用户
//             =>请求成功，得知用户登陆，更新vuex里面的用户信息
//                        =>更新vuex里面的用户信息之后，检测到密码太弱，用户需要修改密码，跳转到密码修改页面
//                        =>更新vuex里面的用户信息之后，正常进行下一步。
//             =>请求成功，得知用户未登陆，初始化vuex用户信息且跳转到登录页面
//             =>请求失败，初始化vuex用户信息且跳转到登录页面
router.beforeEach((to, from, next) => {
  let toPath = to.path;
  next()
  return;
  //验证用户是否登录，如未登录，跳到登录，反之。
  if (!store.state.login.isLoginType) {
      //未登录
      isLoginApi().then(res => {
          let { data, data: { id } } = res;
          if (id && id != null) {
              //验证成功
              store.dispatch('login/loginChange', data).then(() => {
                  //用户登录成功，且需要强制修改密码时，防止用户直接更改浏览器路径绕过密码修改步骤
                  let changepwd = sessionStorage.getItem("changepwd");
                  if(changepwd && changepwd=='1'){
                      next({path:"/changepwd",replace:true});
                  }else {
                      //登录状态下，不可以跳转到登录界面，('/mydashboard')，看需求跳转，我这儿跳的是首页
                      toPath === '/login' ? next({ path: '/mydashboard', replace: true }) : next();
                  }
              })
          } else {
              //验证失败
              //重定向登录 跳出循环
              to.path === '/login' ? next() : store.dispatch('login/loginChange', false).then(() => next({ path: '/login', replace: true }));
          }
      }).catch(err => {
          //验证失败
          window.localStorage.removeItem("token");
          to.path === '/login' ? next() : store.dispatch('login/loginChange', false).then(() => next({ path: '/login', replace: true }));
      })
  } else {
          //登录
          toPath === '/login' ? next({ path: '/mydashboard', replace: true }) : next();
  }
});
export default router
