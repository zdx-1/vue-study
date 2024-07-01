<template>
  <el-skeleton style="width: 100%; margin-right: 10px;" animated :loading="loading" direction="vertical" alignment="flex-start">
    <template #template >
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <el-skeleton-item class="imgLoadingBgd" variant="image" style="width: 300px; height: 300px;" />
        <el-skeleton-item class="imgLoadingBgd" variant="text" style="margin-top: 12px; text-align: center; width: 200px; height: 30px;" />
        <el-skeleton-item class="imgLoadingBgd" variant="text" style="margin-top: 12px; text-align: center; width: 220px; height: 20px;" />
        <el-skeleton-item class="imgLoadingBgd" variant="text" style="border-radius: 20px; margin-top: 12px; text-align: center; width: 120px; height: 32px;" />
    
      </div>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-skeleton>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: () => (true)
  },
})
</script>

<style scoped lang="less">
:deep(.el-skeleton__image) {
  svg{
    color: #5b5c5f;
  }
}
</style>