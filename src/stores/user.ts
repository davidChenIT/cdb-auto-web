import { defineStore } from 'pinia'
import { getInfo, getAllButtonCode, login, logout } from '@/api/login'
import {
  getUser,
  getToken,
  setToken,
  removeToken,
  removeUser,
} from '@/utils/auth'
import { LoginForm } from '@/typings/login/index'

export default defineStore('userStore', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      roles: [] as any,
      userinfo: getUser(),
      buttonsCode: [] as Array<string>,
      token: getToken(),
    }
  },
  actions: {
    // 重置token
    ResetToken() {
      return new Promise((resolve) => {
        this.token = ''
        removeToken()
        resolve('resetToken')
      })
    },
    // 获取用户信息
    GetInfo() {
      return new Promise((resolve, reject) => {
        const user = ['admin', 'system']
        this.roles = user
        resolve(user)
        // getInfo()
        //   .then(({ user }) => {
        //     if (user?.roles?.length) {
        //       this.roles = user.roles
        //     } else {
        //       this.roles = []
        //     }
        //     // this.userinfo = user?.user
        //     resolve(user)
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
      })
    },
    // 或者用户按钮权限
    GetUserButtonPermission() {
      return new Promise((resolve, reject) => {
        getAllButtonCode()
          .then(({ data }) => {
            if (data?.length) {
              this.buttonsCode = data
            } else {
              this.buttonsCode = []
            }
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 登录
    Login(data: LoginForm) {
      return new Promise((resolve, reject) => {
        const data = '123456789'
        this.token = data
        setToken(data)
        resolve(data)
        // login(data)
        //   .then(({ data }) => {
        //     this.token = data.token
        //     setToken(data.token)
        //     resolve(data)
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
      })
    },
    // 登出
    FedLogOut() {
      return new Promise((resolve, reject) => {
        logout()
          .then(({ data }) => {
            this.roles = []
            // this.userinfo = ''
            this.buttonsCode = []
            this.token = ''
            removeUser()
            removeToken()
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})
