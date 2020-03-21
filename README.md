
## 简介
```
vue后台简易模版。

配置了axios、element、vuex、less、vue-router。二次封装了element的table组件及form表单组件。

能够快速搭建一个后台管理系统。

推荐使用yarn管理依赖

npm i yarn -g

yarn config set registry htts://registry.npm.taobao.org
```
## 目录结构
```
├─ .env.test
├─ .gitignore
├─ README.md
├─ babel.config.js
├─ package-lock.json
├─ package.json
├─ public
│    ├─ favicon.ico                   --网页图标
│    ├─ index.html                    --vue-cli主文件
│    └─ static
│           ├─ css                    --全局css文件夹
│           └─ favicon22.png          
├─ src
│    ├─ App.vue
│    ├─ api
│    │    ├─ Reg.js                   --自定义正则验证方法
│    │    ├─ api.js                   --全局api管理
│    │    └─ http.js                  --二次封装axios请求
│    ├─ assets
│    │    ├─ .gitkeep
│    │    ├─ img                      --公共img
│    │    └─ js                       --公共js方法
│    ├─ components
│    │    ├─ EleModule                --element方法二次封装
│    │    ├─ Module                   --公共模块
│    │    └─ layout                   --侧边栏和头
│    ├─ main.js                       --入口文件
│    ├─ router                        --路由模块
│    │    └─ systemSettings.js
│    ├─ router.js                     --路由
│    ├─ store.js                      --vuex
│    └─ views                         --页面
│           ├─ HomePage.vue
│           ├─ Login
│           └─ System
├─ vue.config.js                      --config配置文件
└─ yarn.lock
```
## 安装依赖
```
yarn
```

### 运行开发环境
```
yarn serve
```

### 打包
```
yarn build
```

### 运行自定义开发环境
```
yarn serve -test
```
