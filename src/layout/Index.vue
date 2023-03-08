<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar class="sidebar-container">
      <template #append>
        <sidebar-append />
      </template>
    </sidebar>
    <div class="main-container">
      <Navbar />
      <!-- <tags-view /> -->
      <!-- <div class="gap"></div>
      <notice /> -->
      <app-main />
    </div>
    <!-- <NewsPush /> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Sidebar, AppMain, Navbar } from './components'
import useStore from '@/stores/index'
// import { AccountVerifyAlert } from '@/utils/public'
const { appStore } = useStore()

const sidebarStore = computed(() => {
  return appStore.sidebar
})

const classObj = computed(() => {
  return {
    hideSidebar: !sidebarStore.value.opened,
    openSidebar: sidebarStore.value.opened,
    withoutAnimation: sidebarStore.value.withoutAnimation,
  }
})
</script>

<style scoped lang="scss">
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
}

.gap {
  width: 100%;
  height: 12px;
  background-color: transparent;
}
</style>
