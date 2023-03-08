<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :collapse-transition="false"
      :default-active="$route.path"
      :show-timeout="200"
      :collapse="isCollapse"
      unique-opened
      mode="vertical"
    >
      <div class="logoDiv">
        <router-link to="/">
          <img :class="logoStyle" :src="logoSrc" />
        </router-link>
      </div>
      <SidebarItem
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>

    <!-- sidebar提供一个插槽 -->
    <!-- <slot name="append" /> -->
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useStore from '@/stores/index'
import { RouteRecordRaw } from 'vue-router'
import openLogo from '@/assets/image/logo/img-logo-open.png'
import closeLogo from '@/assets/image/logo/img-logo-close.png'
import SidebarItem from './SidebarItem.vue'
import { UserRoute } from '@/typings/user/userinfo'
// 获取store
const { permisstionStore, appStore } = useStore()
type RoutesType = UserRoute | RouteRecordRaw

// 获取路由信息
// const routes: any = [
//   {
//     alwaysShow: true,
//     component: 'HomeView',
//     hidden: false,
//     meta: { title: '后台管理', icon: 'system' },
//     name: 'role',
//     path: '/role',
//   },
//   {
//     alwaysShow: false,
//     component: 'AboutView',
//     hidden: false,
//     meta: { title: '后台管理1', icon: 'system1' },
//     name: 'role1',
//     path: '/role1',
//   },
// ]
const routes = computed<RoutesType[]>(() => permisstionStore.routes)

// 侧边栏store
const sidebar = computed(() => {
  console.log('appStore.sidebar', appStore.sidebar)

  return appStore.sidebar
})

// 是否折叠
const isCollapse = computed(() => !sidebar.value.opened)

// logo地址
const logoSrc = computed(() => (sidebar.value.opened ? openLogo : closeLogo))

// logo样式
const logoStyle = computed(() =>
  sidebar.value.opened ? 'open-logo' : 'close-logo'
)
</script>

<style scoped lang="scss">
.logoDiv {
  width: 100%;
  height: 54px;
  margin-bottom: 1px;
  overflow: hidden;

  // text-align: center;

  a {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

.open-logo {
  height: 29px;
  margin: 17px 0 0 16px;
}

.close-logo {
  height: 40px;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
