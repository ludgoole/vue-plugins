const env = process.env.VUE_APP_FLAG
  ? [process.env.NODE_ENV, process.env.VUE_APP_FLAG].join(':')
  : process.env.NODE_ENV

const ENV_INFO = {
  development: '',
  'development:mock':
    'https://www.fastmock.site/mock/f59dafeec5617867a33cfe76324c906f/',
  production: 'http://192.168.0.102/',
  'production:test': 'http://localhost:3000/'
}

export default {
  baseURL: ENV_INFO[env], // node环境配置
  timeout: 5000, // 请求的超时时间
  withCredentials: true // 允许携带cookie
}
