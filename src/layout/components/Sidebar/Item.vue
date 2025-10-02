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
