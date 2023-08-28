import request from '@/utils/request'
import type { User } from '@/stores/counter'
import type { CodeTypeRules } from './type/user.d'

//密码登录
export const loginByPsw = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST', { mobile, password })
}

// 获取验证码
export const setMobileCode = (mobile: string, type: CodeTypeRules) => {
  return request('/code', 'GET', { mobile, type })
}

// 短信登录
export const loginByMobile = (mobile: string, code: string) => {
  return request<User>('/login', 'POST', { mobile, code })
}
