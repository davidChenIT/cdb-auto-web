import { defineStore } from 'pinia'

const storage = window.sessionStorage
export default defineStore('appStore', {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      sidebar: {
        opened: !+(storage.getItem('sidebarStatus') || ''),
        withoutAnimation: false,
      },
      loadingNum: 0,
      noticeVisible: false,
    }
  },
  actions: {
    ToggleSideBar() {
      if (this.sidebar.opened) {
        storage.setItem('sidebarStatus', '1')
      } else {
        storage.setItem('sidebarStatus', '0')
      }
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
    },
  },
})
