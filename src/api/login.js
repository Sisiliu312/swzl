import request from '@/request'


export function login(data) {
    return request({
      url: '/login',
      method: 'post',
      data
    })
  }

  export function logout() {
    return request({
      url: '/logout',
      method: 'get',
    })
  }

  export function register(data) {
    return request({
      url: '/register',
      method: 'post',
      data
    })
  }