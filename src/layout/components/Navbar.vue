<script setup>
// 导航栏
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useMenuStore } from '@/store/menu'

const menuStore = useMenuStore()
function toggleSidebar() {
  menuStore.toggleOpened()
}

import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
const router = useRouter()

async function logout() {
  try {
    await userStore.logout()
    console.log('退出成功')
    router.push({ path: '/login' })
  } catch (err) {
    console.error('退出失败', err)
  }
}
</script>

<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="menuStore.opened" class="hamburger-container"
      @toggleClick="toggleSidebar" />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <SvgIcon className="user-avatar" iconClass="planet" />
        </div>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item> 个人中心 </el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item> 接入指南 </el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
              <el-dropdown-item> 文档说明 </el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;"> 退出登陆 </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
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
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
