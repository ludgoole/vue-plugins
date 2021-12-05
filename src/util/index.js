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

export function compareVersion(v1, v2, isEqual) {
  if (v1 === v2) return !!isEqual

  const a1 = v1.split('.')
  const a2 = v2.split('.')
  while (a1.length || a2.length) {
    // 补0
    const s1 = +a1[0] || 0
    const s2 = +a2[0] || 0

    // 递归
    if (s1 === s2) {
      a1.shift()
      a2.shift()
    } else {
      return s1 > s2
    }
  }
}
