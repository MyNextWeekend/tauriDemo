<script setup>
import { defineProps } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <SvgIcon v-if="icon" :iconClass="icon" class="sub-el-icon" />
  <span class="title">{{ title }}</span>
</template>

<style lang="scss" scoped>
.sub-el-icon {
  font-size: 18px;
  width: 14px;
  height: 14px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  transition: color 0.2s;
}

.title {
  font-size: 14px;
  vertical-align: middle;
}
</style>