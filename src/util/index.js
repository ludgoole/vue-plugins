export function requireAll(r) {
  r.keys().forEach(r)
}

export function exportAll(r, option = {}) {
  const modules = {}

  r.keys().forEach(filename => {
    const moduleName = filename.replace(/^[^/]+\/([\w-]+)\.(js|vue)$/, '$1')
    modules[moduleName] = Object.assign({}, option, r(filename).default)
  })

  return modules
}

export function download(json, fileName = 'download') {
  /*
   * 转化为blob数据
   * @{type}
   * 'text/html'  =>file.html
   * 'text/plain'  =>file.txt
   * 'application/json'  =>file.json
   * 'img/png'  =>file.png
   */
  const arr = [JSON.stringify(json, null, 4)]
  const blob = new Blob(arr, { type: 'application/json' })

  // 转化为链接地址
  const url = window.URL.createObjectURL(blob)

  // 创建a链接
  const a = document.createElement('a')
  a.href = url
  a.download = fileName

  // 自触发事件
  a.click()
}
