<template>
  <div class="login">
    <div class="login-box center-between">
      <el-form
        ref="loginRef"
        :model="loginForm"
        class="login-form"
        :rules="loginRules"
      >
        <h3 class="title">WETRADE后台管理系统</h3>
        <el-form-item prop="account">
          <el-input
            v-model="loginForm.account"
            placeholder="账号"
            :prefix-icon="UserFilled"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            :prefix-icon="Lock"
            @keyup.enter="handleLogin(loginForm)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="rememberMe" @change="rememberChecked">
            记住密码
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleLogin(loginForm)">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="login-icon">
        <!-- <svg-icon icon-class="login_right_img" class="img"></svg-icon> -->
        <img src="@/assets/image/login-icon.png" class="img" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoginForm } from '@/typings/login/index'
import { reactive, ref, watch, onMounted } from 'vue'
import FormValidator from '@/utils/form'
import type { FormInstance } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import useStore from '@/stores/index'
import { MD5, AES, enc } from 'crypto-js'
import { UserFilled, Lock } from '@element-plus/icons-vue'

const { userStore } = useStore()
// const permissStore = permisstionStore()
// const accessRoutes = permissStore.GenerateRoutes()
// console.log('accessRoutes', accessRoutes)
// 路由
const route = useRoute()
const router = useRouter()
const redirect = ref()
const otherQuery = ref()
const loginForm = reactive<LoginForm>({
  account: '',
  password: '',
})
// 记住密码
const rememberMe = ref(false)
const rememberChecked = (value: string | number | boolean) => {
  if (value) {
    localStorage.setItem('account', loginForm.account)
    localStorage.setItem(
      'password',
      AES.encrypt(loginForm.password, 'WetradeAuth').toString()
    )
    localStorage.setItem('rememberMe', '1')
    return
  }
  localStorage.removeItem('account')
  localStorage.removeItem('password')
  localStorage.removeItem('rememberMe')
}

onMounted(() => {
  if (localStorage.getItem('rememberMe') === '1') {
    rememberMe.value = true
    loginForm.account = localStorage.getItem('account') || ''
    const password = localStorage.getItem('password') || ''
    const bytes = AES.decrypt(password, 'WetradeAuth')
    loginForm.password = bytes.toString(enc.Utf8)
  }
})

// 获取路由参数
const getOtherQuery = (query: any) => {
  return Object.keys(query).reduce((acc: any, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}
// 路由监听
watch(
  () => route.path,
  () => {
    redirect.value = route.query && route.query.redirect
    const query = route.query
    if (query) {
      otherQuery.value = getOtherQuery(query)
    }
  },
  {
    deep: true,
    immediate: true,
  }
)
const loading = ref(false)
const loginRules = reactive({
  account: new FormValidator().required('请输入用户').getAll(),
  password: new FormValidator().required('请输入密码').getAll(),
})
const loginRef = ref<FormInstance>()
const handleLogin = (loginForm: LoginForm) => {
  console.log(loginForm, 'loginForm')
  // eslint-disable-next-line no-debugger
  // debugger

  if (!loginRef.value) return
  loginRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    loading.value = true
    loginForm.password = MD5(loginForm.password).toString().slice(8, 24)
    userStore
      .Login(loginForm)
      .then((res) => {
        router.push({
          path: redirect.value || '/home',
          query: otherQuery.value,
        })
      })
      .catch(() => {
        loading.value = false
      })
  })
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
