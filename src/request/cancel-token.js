class CancelToken {
  constructor() {
    this.cancelMap = new Map()
  }

  getKey(url, params) {
    return url + JSON.stringify(params)
  }

  get({ url, params }) {
    const key = this.getKey(url, params)
    return this.cancelMap.get(key)
  }

  set({ url, params }, cancel) {
    const key = this.getKey(url, params)
    return !this.has(url) && this.cancelMap.set(key, cancel)
  }

  has({ url, params }) {
    const key = this.getKey(url, params)
    return this.cancelMap.has(key)
  }

  delete({ url, params }) {
    const key = this.getKey(url, params)
    return this.has({ url, params }) && this.cancelMap.delete(key)
  }

  cancel({ url, params }, msg = '取消请求') {
    this.has({ url, params }) && this.get({ url, params })({ url, params, msg })

    this.delete({ url, params })
  }
}

export default new CancelToken()
