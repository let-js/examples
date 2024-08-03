import { ResponseCode } from '@/config/requestEnum'

const CommonUtil = {
  isSuccess(data = {}) {
    const code = typeof data === 'string' ? data : data.code
    return code != null ? code === ResponseCode.SUCCESS_CODE : true
  },

  activeCurrentNav(current, nav) {
    nav.forEach(item => {
      item.active = 0
    })
    current.active = 1
  },

  setCookie(name, value, exdays = 1) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toGMTString()
    document.cookie = name + '=' + value + '; ' + expires
  },

  getCookie(name) {
    var key = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(key) === 0) return c.substring(key.length, c.length)
    }
    return null
  },

  userLogin(name, password) {
    CommonUtil.setCookie(Constants.LOGIN_COOKIE_KEY, name)
    return true
  },

  getUserNameFromCookie() {
    return CommonUtil.getCookie(Constants.LOGIN_COOKIE_KEY)
  },

  userLogout(name) {
    if (name === CommonUtil.getUserNameFromCookie()) {
      CommonUtil.setCookie(Constants.LOGIN_COOKIE_KEY, '')
    }
    return true
  },

  gotoUrl(url) {
    window.location.href = url
  }

}

export default CommonUtil