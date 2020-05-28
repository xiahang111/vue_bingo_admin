import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '', // api 的 base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
//  if (store.getters.token) {
//    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//  }

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(

  response => {

    // /**
    //  * code为非20000是抛错 可结合自己业务进行修改
    //  */
    const res = response.data
    if (res.code == 'success' || res.code == 'error' || res.code == 'fail' || response.status == 200) {

      return response.data
    } else if(res.code === 401) {
      MessageBox.confirm(
        'token已过期，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
      return Promise.reject('error')
    }else if(res.code === 402){
      // 接口没有权限访问时
      Message({
        message: res.data,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {

      alert("走到这来了")
      console.log("错误信息", response)

      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      return res;
    }
  },
  error => {
    console.log('err' + error) // for debug

    return Promise.reject(error)
  }
)


export default service
