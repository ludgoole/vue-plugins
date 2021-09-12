import { post } from '@/request'
const API = '/memory'

export function login(params = {}) {
  return post(`${API}/login`, params)
}

export function getMenu(params = {}) {
  return post(`${API}/getMenu`, params)
}
