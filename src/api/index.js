import { post, get } from '@/request'
const API = '/api'
export function login(params = {}) {
  return post(`${API}/login`, params)
}

export function getOne(params = {}) {
  return get(`${API}/api/channel/one/0/0`, params)
}
