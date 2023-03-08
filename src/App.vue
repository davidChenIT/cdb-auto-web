<template>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import en_US from 'element-plus/lib/locale/lang/en'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import zh_Hant from 'element-plus/lib/locale/lang/zh-tw'
const lang = {
  en_US,
  'zh-Hans': zhCn,
  zh_Hant,
}
const locale = zhCn
const cachedViews: string[] = []
</script>
