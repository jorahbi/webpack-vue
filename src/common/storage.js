
const get = function (key) {
  try {
    key = format(key)
    let value = sessionStorage.getItem(key)
    if (value.indexOf('object:') === 0) {
      value = value.slice(7)
      return JSON.parse(value)
    }
    return value
  } catch (e) {
    console.log(e.message)
  }
}

const set = function (key, value) {
  key = format(key)
  value = format(value)
  if (key && value) {
    sessionStorage.setItem(key, value)
  }
}

const clear = function (key) {
  key = format(key)
  sessionStorage.removeItem(key)
}

const format = function (argument) {
  try {
    if (typeof argument === 'undefined' || typeof argument === 'function') {
      return false
    } else if (typeof argument === 'object') {
      return 'object:' + JSON.stringify(argument)
    }
    return argument.trim()
  } catch (e) {
    console.log(e.message)
  }
}

export default {get, set, clear}
