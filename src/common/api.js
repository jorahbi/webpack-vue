import axios from 'axios'
import Qs from 'qs'

// let url = document.location.toString().split('//')
// const Host = url[0] + '//' + url[1].substr(0, url[1].indexOf('/'))
const Host = 'http://bxspread.company.com'
let Vue = null

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
    baseURL: '',
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
        console.log(res)
        Vue.$message.error('服务器异常，稍候再试')
      },
      other: (Vue, res) => {
        Vue.$message.error('服务器异常，稍候再试111')
        if (options.isLogin) {
          window.location.href = options.loginUrl
        }
      }
    }
  }
  for (let idx in options.data) {
    axiosOptions.data[idx] = options.data[idx]
  }
  for (let idx in options.handle) {
    axiosOptions.handle[idx] = options.handle[idx]
  }
  delete options.handle

  options.data = Qs.stringify(axiosOptions.data)
  return Object.assign({}, axiosOptions, options)
}

function sendRequest (axiosOptions) {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  Vue.loading = true
  setTimeout(function () {
    axios({
      url: axiosOptions.url,
      data: axiosOptions.data,
      method: axiosOptions.method,
      baseURL: axiosOptions.baseURL,
      responseType: 'json',
      headers: axiosOptions.headers
    }).then(function (res) {
      if (res.data.status === 0) {
        axiosOptions.handle.success(Vue, res)
        Vue.loading = false
      } else if (res.data.status > 0) {
        axiosOptions.handle.error(Vue, res)
        Vue.loading = false
      } else {
        axiosOptions.handle.other(Vue, res)
        Vue.loading = false
      }
    }).catch((err) => {
      axiosOptions.handle.exception(Vue, err)
      Vue.loading = false
    })
  }, 500)
}

let Api = {

  Get: (_vue, options) => {
    Vue = _vue
    let axiosOptions = formatOptions(options)
    axiosOptions.method = 'GET'
    sendRequest(axiosOptions)
  },
  Post: (_vue, options) => {
    Vue = _vue
    let axiosOptions = formatOptions(options)
    axiosOptions.method = 'POST'
    axiosOptions.headers = {'X-Requested-With': 'XMLHttpRequest'}
    sendRequest(axiosOptions)
  },
  Interceptors: (_vue, interceptors) => {
    interceptors = (typeof interceptors !== 'object') ? {} : interceptors
    if (typeof interceptors.request !== 'function') {
      interceptors.request = function (config) { return config }
    }
    if (typeof interceptors.response !== 'function') {
      interceptors.response = function () {}
    }
    // 拦截
    axios.interceptors.request.use(interceptors.request)
    axios.interceptors.response.use(interceptors.response)
  }
}

export default Api
