import axios from 'axios'
import QS from 'qs';
import { Message } from 'element-ui';

if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/api'
}
else if (process.env.NODE_ENV == 'test') {
  axios.defaults.baseURL = 'http://test111/'
}
else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://test222/demo'
}
else if (process.env.NODE_ENV == 'build') {
  axios.defaults.baseURL = 'http://test333/demo'
}


// 设置post默认请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout = 20000

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve({ data: response });
    }else if (response.status === 304) {
      return Promise.reject(response);
    }else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        case 403:
          // let { errMsg } = error.response.data;
          // let urlArr = window.location.href.split('?');
          // let href = urlArr[0].split('/').reverse()[0];
          // let query = window.sessionStorage.getItem('exit') || "false";
          // if (href !== "login" && query === "false") {
          //   clearTimeout(timer);
          //   timer = setTimeout(() => {
          //     localStorage.removeItem('token');
          //     store.dispatch('login/loginChange', false).then(() => {
          //       router.replace({
          //         path: '/login'
          //       });
          //       window.location.reload();
          //     })
          //   }, 10)
          // } else {
          //   window.sessionStorage.setItem('exit', false);
          // }
          // // 清除token
          break;

        // 跳转登录页面
        // 401: 没有权限
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          Message({
            message: '你没有权限进行此操作',
            duration: 1000,
            forbidClick: true
          });

          break;
        // 404请求不存在
        case 404:
          break;
        // 其他错误，直接抛出错误提示
        default:
      }
      return Promise.reject(error.response);
    }
  }
);


export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
//文件下载 get
export function getFileDown(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      responseType: "blob"
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/*json请求头 post请求*/
export function post2(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
/*非json请求头 post请求*/
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      data: QS.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;'
      }
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      });
  });
}
// QS.stringify(params)
/*传输文件*/
export function postFile(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        resolve(res.data);
      })/*  */
      .catch(err => {
        reject(err.data)
      });
  });
}

/*序列化 json*/
export function post4(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      data: QS.stringify(params),
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      });
  });
}
// del
export function del(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// put
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'put',
      data: QS.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;'
      }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// putJosn
export function putJson(url, params) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'put',
      data: params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
