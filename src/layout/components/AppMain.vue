<script setup>
// 主体内容区
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/store/menu'
const route = useRoute()
const menuStore = useMenuStore()

watch(route, (to, from) => {
  console.log('路由变化了', from, to)
  const { path, fullPath, meta, query, params } = to

  menuStore.addTagView({
    title: meta.title,
    path,
    fullPath,
    query,
    params
  })
  console.log('tagViewList', menuStore.tagViewList)
})
</script>


<template>
  <div class="app-main">
    <section>
      <!-- 添加缓存 -->
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </section>
  </div>

</template>



<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
