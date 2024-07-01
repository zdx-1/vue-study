<template>
  <el-skeleton style="width: 120px; margin-right: 10px;" animated :loading="loading" direction="vertical" alignment="flex-start">
    <template #template >
      <el-skeleton-item variant="image"  style="width: 120px; height: 120px;" />
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-skeleton>
</template>

<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: () => (true)
  },
})
</script>

<style scoped lang="less">
</style>