import axios from 'axios'
import Qs from 'qs'

// let url = document.location.toString().split('//')
// const Host = url[0] + '//' + url[1].substr(0, url[1].indexOf('/'))
const Host = 'http://bxspread.company.com'
let Axios = null
let Vue = null
let HttpService = (_vue, interceptors) => {
  Vue = _vue
  Axios = axios
  interceptors = (typeof interceptors !== 'object') ? {} : interceptors
  Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  if (typeof interceptors.request !== 'function') {
    interceptors.request = function (config) { return config }
  }
  if (typeof interceptors.response !== 'function') {
    interceptors.response = function () {}
  }
  // 拦截
  Axios.interceptors.request.use(interceptors.request)
  Axios.interceptors.response.use(interceptors.response)
}

function formatOptions (options) {
  options = (typeof options !== 'object') ? {} : options
  options.data = options.data || {}
  let axiosOptions = {
    url: '',
    domain: Host,
    isLogin: true,
    loginUrl: Host + '/admin/passport/login',
    data: {},
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
  for (let idx in options.data) {
    axiosOptions.data[idx] = options.data[idx]
  }

  axiosOptions.data = Qs.stringify(axiosOptions.data)
  return Object.assign({}, axiosOptions, options)
}

function sendRequest (axiosOptions) {
  console.log(axiosOptions.data, axiosOptions.method)
  Axios({
    url: axiosOptions.url,
    data: axiosOptions.data,
    method: axiosOptions.method,
    baseURL: axiosOptions.domain + '/spread',
    responseType: 'json'
    // headers: axiosOptions.headers
  }).then((res) => {
    if (res.data.status === 0) {
      axiosOptions.handle.success(Vue, res)
    } else if (res.data.status > 0) {
      axiosOptions.handle.error(Vue, res)
    } else {
      axiosOptions.handle.other(Vue, res)
    }
  }).catch((err) => {
    axiosOptions.handle.exception(Vue, err)
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
