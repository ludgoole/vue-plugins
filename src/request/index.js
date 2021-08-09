import axios from 'axios'
import qs from 'qs'
import defaultOption from './default-option'
import cancelToken from './cancel-token'
import store from '../store'

const instance = axios.create(defaultOption)
const CancelToken = axios.CancelToken

// 请求拦截器
instance.interceptors.request.use(
  req => {
    // 取消请求
    cancelToken.cancel(req)

    // 缓存新的 cancel
    req.cancelToken = new CancelToken(function(cancel) {
      cancelToken.set(req, cancel)
    })

    // 配置token
    req.headers.Authorization = store.state.login.token

    return req
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  res => {
    // 移除 cancel
    cancelToken.delete(res.config)

    let data = {}

    switch (res.status) {
      case 200:
        // if (res.data.errCode === '000000') {
        if (res.data.res === 0) {
          data = res.data instanceof Blob ? res.data : res.data.data
        } else {
          data = res.data
          !data.errCode && (data.errCode = 'xxxxxx')
          !data.errMsg && (data.errMsg = '系统错误')
        }
        break
      case 301:
        data.errMsg = '永久性重定向'
        break
      case 302:
        data.errMsg = '临时性重定向'
        break
      case 304:
        data.errMsg = '服务器资源未改变'
        break
      case 400:
        data.errMsg = '请求头错误'
        break
      case 403:
        data.errMsg = '禁止访问'
        break
      case 404:
        data.errMsg = '访问的页面不存在'
        break
      case 405:
        data.errMsg = '请求类型或参数错误'
        break
      case 502:
        data.errMsg = '无效网关'
        break
      case 503:
        data.errMsg = '服务器暂时性错误'
        break
    }

    return Promise.resolve(data)
  },
  err => {
    cancelToken.delete(err.message)

    if (axios.isCancel(err)) {
      // 中断promise链接
      return Promise.resolve(err.message.msg)
    } else {
      // 把错误继续向下传递
      return Promise.reject(err)
    }
  }
)

// 实例方法
export function get(url, params = {}) {
  return instance({
    method: 'get',
    url,
    params
  })
}
export function post(url, data = {}) {
  return instance({
    method: 'post',
    url,
    data,
    transformRequest: [
      function(data) {
        return qs.stringify(data)
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
}
export function postStr(url, data = {}) {
  return instance({
    method: 'post',
    url,
    data,
    transformRequest: [
      function(data) {
        return JSON.stringify(data)
      }
    ],
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function upload(url, data = {}) {
  return instance({
    method: 'post',
    url,
    data,
    transformRequest: [
      function(data) {
        return data
      }
    ],
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function download(url, data = {}) {
  return instance({
    method: 'post',
    url,
    data,
    responseType: 'blob'
  })
}

export default {
  get,
  post,
  postStr,
  upload,
  download
}
