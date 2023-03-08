<template>
  <div v-if="!item.hidden" class="menu-wrapper nest-menu">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      {{ onlyOneChild?.path }}
      <router-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <!-- 图标 -->
          <!-- <svg-icon
            v-if="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :icon-class="
              onlyOneChild.meta.icon || (item.meta && item.meta.icon)
            "
          /> -->

          <!-- 主标题 -->
          <span
            v-if="onlyOneChild?.meta?.title || item?.meta?.title"
            class="title"
          >
            {{ onlyOneChild?.meta?.title }}
          </span>
          <!-- 副标题 -->
          <span
            v-if="onlyOneChild?.meta?.subtitle || item?.meta?.subtitle"
            class="subtitle"
          >
            {{ onlyOneChild?.meta?.subtitle || item?.meta?.subtitle }}
          </span>
        </el-menu-item>
      </router-link>
    </template>

    <!-- 有子菜单 -->
    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-class="sidebar-children"
    >
      <template #title>
        <svg-icon
          v-if="item.meta && item.meta.icon"
          :icon-class="item.meta && item.meta.icon"
        />
        <!-- 主标题 -->
        <span v-if="item?.meta?.title" class="title">
          {{ item.meta.title }}
        </span>
        <!-- 副标题 -->
        <div v-if="item?.meta?.subtitle" class="subtitle">
          <span>{{ item.meta.subtitle }}</span>
          <svg-icon class="arrow-right" icon-class="icon-sidebar-right" />
        </div>
      </template>
      <sidebar-item
        v-for="child in item?.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :routes="[child]"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SidebarItem',
  inheritAttrs: false,
  customOptions: {},
}
</script>

<script setup lang="ts">
import path from 'path-browserify'
import { PropType, toRefs, reactive } from 'vue'
import { isExternal } from '@/utils/validate'
import { RouteRecordRaw } from 'vue-router'
import { OnlyOneChildRouter } from '@/typings/layout/sidebar'

const props = defineProps({
  routes: {
    type: Array as PropType<RouteRecordRaw[]>,
    default: () => [],
  },
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: '',
  },
})

const { item, isNest, basePath } = toRefs(props)

const onlyOneChild = reactive<Partial<OnlyOneChildRouter>>({})
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      Object.assign(onlyOneChild, { ...item })
      return true
    }
  })

  if (showingChildren.length === 1) {
    return true
  }

  if (showingChildren.length === 0) {
    Object.assign(onlyOneChild, {
      ...parent,
      path: '',
      noShowingChildren: true,
    })

    return true
  }

  return false
}

const resolvePath = (routePath: string) => {
  console.log('routePath', routePath)
  if (isExternal(routePath)) {
    return routePath
  }

  return path.resolve(basePath.value, routePath)
}
</script>
<style scoped lang="scss">
.menu-wrapper {
  :deep(.el-sub-menu__icon-arrow) {
    font-size: 14px;
  }
}
</style>
