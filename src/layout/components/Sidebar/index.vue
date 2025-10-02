<script setup>
// 侧边栏
import SidebarItem from './SidebarItem.vue'
import { useUserStore } from '@/store/user'
import { useMenuStore } from '@/store/menu'
import logo from '@/assets/vue.svg'
import { computed } from 'vue'

const userStore = useUserStore()
const menuStore = useMenuStore()


import { useRoute } from 'vue-router'

// useRoute: 获取当前路由信息
const route = useRoute()

// 当前高亮菜单
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>


<template>
  <div>
    <div class="sidebar-logo-container">
      <el-avatar class="sidebar-logo" :src="logo" shape="square" :size="35" />
      <h1 class="sidebar-title" v-if="menuStore.opened"> 练习一下 </h1>
    </div>

    <!-- 滚动条 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="!menuStore.opened" :background-color="menuStore.cssData.menuBg"
        :text-color="menuStore.cssData.menuText" :unique-opened="false"
        :active-text-color="menuStore.cssData.menuActiveText" :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in userStore.routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>

  </div>
</template>


<style lang="scss" scoped>
.sidebar-logo-container {
  display: flex;
  align-items: center; // 垂直居中
  justify-content: center; // 水平居中
  height: 50px; // 容器高度，你可以根据需要调整
  width: 100%;

  :deep(.el-avatar) {
    background: none;
  }

  .sidebar-logo {
    margin-right: 20px; // 让头像和文字之间有间距
  }

  .sidebar-title {
    margin: 0; // 去掉 h1 默认 margin
    font-size: 16px;
  }
}
</style>