class CancelToken {
  constructor () {
    this.cancelMap = new Map()
  }

  get (url) {
    return this.cancelMap.get(url)
  }

  set (url, cancel) {
    return !this.has(url) && this.cancelMap.set(url, cancel)
  }

  has (url) {
    return this.cancelMap.has(url)
  }

  delete (url) {
    return this.has(url) && this.cancelMap.delete(url)
  }

  cancel (url, msg = '取消请求') {
    this.has(url) && this.get(url)({ url, msg })

    this.delete(url)
  }
}

export default new CancelToken()
