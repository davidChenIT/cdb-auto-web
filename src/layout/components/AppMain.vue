<template>
  <section class="app-main" :class="{ 'notice-active': noticeVisible }">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" v-if="reload" :key="route.name" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const cachedViewsPack = ref()
const cachedViews = ref([])
const reload = ref(true)
const noticeVisible = ref(true)
</script>

<style scoped lang="scss">
.app-main {
  // width: 100%;
  height: calc(100% - 46px);
  overflow-y: hidden;

  &.notice-active {
    height: calc(100% - 50px);
  }
}
</style>
