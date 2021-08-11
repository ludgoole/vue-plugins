import { post, get } from '@/request'

const BASE_API = process.env.VUE_APP_BASE_API
export function login(params = {}) {
  return post(`${BASE_API}/login`, params)
}

export function getOne(params = {}) {
  return get(`${BASE_API}/api/channel/one/0/0`, params)
}
