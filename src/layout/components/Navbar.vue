<template>
  <div class="navbar">
    <div class="left-btn">
      <el-icon
        :class="!isCollapse ? '' : 'active'"
        class="expand"
        @click="toggleSideBar"
      >
        <Expand />
      </el-icon>
    </div>
    <!-- <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->

    <div class="right-menu">
      <el-dropdown ref="dropdown1" trigger="click" class="avatar-container">
        <!-- <span class="el-dropdown-link">Dropdown List1</span> -->
        <div class="avatar-wrapper">
          <img src="@/assets/image/profile.jpg" class="user-avatar" />
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <!-- <router-link to=""> -->
            <el-dropdown-item>个人中心</el-dropdown-item>
            <!-- </router-link> -->
            <el-dropdown-item divided @click="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import useStore from '@/stores'
const { userStore, appStore } = useStore()

// 是否折叠
const isCollapse = computed(() => !appStore.sidebar.opened)

// 切换侧边栏
const toggleSideBar = () => {
  appStore.ToggleSideBar()
}

const logout = () => {
  ElMessageBox.confirm('确定退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    customClass: 'notitle',
    type: 'warning',
  }).then(() => {
    userStore.FedLogOut()
    window.location.reload()
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 46px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgb(0 0 0 / 2.5%);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgb(0 0 0 / 2.5%);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        margin-top: 5px;

        .user-avatar {
          width: 40px;
          height: 40px;
          cursor: pointer;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }

  .left-btn {
    display: inline-block;
    font-size: 20px;

    .expand {
      width: 50px;
      height: 50px;

      &.active {
        transform: rotate(180deg);
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
