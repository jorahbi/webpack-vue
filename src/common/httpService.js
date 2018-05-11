import axios from 'axios'

let url = document.location.toString().split('//')
const Host = url[0] + '//' + url[1].substr(0, url[1].indexOf('/'))
let Vue = null
let HttpService = (_vue, interceptors) => {
  Vue = _vue
  interceptors = (typeof interceptors !== 'object') ? {} : interceptors
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  if (typeof interceptors.request !== 'function' ) {
    interceptors.request = function (config) { return config }
  }
  if (typeof interceptors.response !== 'function' ) {
    interceptors.response = function () {}
  }
  // 拦截
  axios.interceptors.request.use(interceptors.request)
  axios.interceptors.response.use(interceptors.response)
}

function formatOptions (options) {
  options = (typeof options !== 'object') ? {} : options
  options.params = options.params || {}
  let axiosOptions = {
    url: '',
    isLogin: true,
    loginUrl: Host + '/admin/passport/login',
    params: new URLSearchParams(),
    headers: {},
    handle: {
      success: (Vue, res) => {
        let msg = res.data.msg || '操作成功'
        Vue.$message({
          type: 'success',
          message: msg
        })
      },
      error: (Vue, res) => {
        Vue.$message.error(res.data.msg)
      },
      exception: (Vue, res) => {
        Vue.$message.error('服务器异常，稍候再试')
      },
      other: (Vue, res) => {
        Vue.$message.error('服务器异常，稍候再试')
      }
    }
  }
  for (let idx in options.params) {
    axiosOptions.params.append(idx, options.params[idx])
  }
  return Object.assign({}, axiosOptions, options)
}

function sendRequest (axiosOptions) {
  axios({
    url: axiosOptions.url,
    data: axiosOptions.data,
    method: axiosOptions.method,
    headers: axiosOptions.headers
  }).then((res) => {
    if (res.data.status === 0) {
      axiosOptions.handle.success(Vue, res)
    } else if (res.data.status > 0) {
      axiosOptions.handle.error(Vue, res)
    } else {
      axiosOptions.handle.other(Vue, res)
    }
  }).catch((err) => {
    axiosOptions.exception(Vue, err)
  })
}

HttpService.prototype.Get = (options) => {
  let axiosOptions = formatOptions(options)
  axiosOptions.method = 'GET'
  sendRequest(axiosOptions)
}

HttpService.prototype.Post = (options) => {
  let axiosOptions = formatOptions(options)
  axiosOptions.method = 'POST'
  sendRequest(axiosOptions)
}

HttpService.prototype.Ajax = (options) => {
  let axiosOptions = formatOptions(options)
  axiosOptions.method = 'POST'
  axiosOptions.headers = {'X-Requested-With': 'XMLHttpRequest'}
  sendRequest(axiosOptions)
}

export default HttpService
