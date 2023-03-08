import { LanguageEnum } from '@/config'
import { UserConfigItem } from '@/typings/user/config'
import { UserInfo } from '@/typings/user/userinfo'

const TokenKey = 'Wetrade-Auth-Token'
const UserKey = 'Wetrade-Auth-User'
const ConfigKey = 'Wetrade-Auth-Config'
const Language = 'Language'

export function getToken(): string | null {
  return localStorage.getItem(TokenKey)
}

export function setToken(token: string) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getUser(): UserInfo {
  return localStorage.getItem(UserKey)
    ? JSON.parse(localStorage.getItem(UserKey) || '')
    : ''
}

export function setUser(user: UserInfo) {
  return localStorage.setItem(UserKey, JSON.stringify(user))
}

export function removeUser() {
  return localStorage.removeItem(UserKey)
}

export function setLanguage(lange: LanguageEnum) {
  return localStorage.setItem(Language, lange)
}

export function getLanguage() {
  return localStorage.getItem(Language) as LanguageEnum
}

// 获取配置信息
export function getConfig(): UserConfigItem {
  return JSON.parse(localStorage.getItem(ConfigKey) || '')
}

export function setConfig(config: UserConfigItem) {
  return localStorage.setItem(ConfigKey, JSON.stringify(config))
}

export function removeConfig() {
  return localStorage.removeItem(ConfigKey)
}
