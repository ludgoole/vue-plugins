import { post } from '@/request'
const API = '/memory'

export function getMenu() {
  return post(`${API}/getMenu`)
}
