import request from '@/utils/request'
import {
  UrlString,
  ListResponseNoResults,
  DetailResponse,
  CommonResponse,
} from '@/typings/api'
import {
  UserRoute,
  UserLoginResponse,
  UserConfig,
} from '@/typings/user/userinfo'

import { LoginForm } from '@/typings/login/index'
const url: UrlString = {
  routers: '/auth/getRouters/finance_auth', // 路由列表
  getInfo: '/auth/system/user/getInfo',
  getAllButtonCode: '/auth/getButtonList',
  login: '/sso/vv/finance/login',
  logout: '/sso/vv/finance/logout',
}
// 登录方法
export function login(
  data: LoginForm
): Promise<DetailResponse<UserLoginResponse>> {
  return request({
    url: url.login,
    method: 'post',
    data,
  })
}

// 获取用户详细信息
export function getInfo(): Promise<DetailResponse<UserConfig>> {
  return request({
    url: url.getInfo,
    method: 'get',
  })
}

// 获取用户按钮权限
export function getAllButtonCode(): Promise<ListResponseNoResults<string>> {
  return request({
    url: url.getAllButtonCode,
    method: 'get',
  })
}
/**
 * 获取用户路由信息
 * @returns
 */
export function getRouters(): Promise<ListResponseNoResults<UserRoute>> {
  return request({
    url: url.routers,
    method: 'get',
  })
}

// 退出登录
export function logout(): Promise<CommonResponse> {
  return request({
    url: url.logout,
    method: 'post',
  })
}
