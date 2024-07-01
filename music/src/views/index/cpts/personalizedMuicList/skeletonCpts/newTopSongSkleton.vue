<template>
  <el-skeleton style="" animated :loading="loading" direction="vertical" alignment="flex-start">
    <template #template >
      <div style="display: flex; flex-wrap: wrap;">
        <template v-for="item in 9">
          <div style="
            display: flex;
            width: 33.3333%;
            height: 80px;
            padding: 10px;
            padding-right: 15px;
            box-sizing: border-box;"
          >
            <el-skeleton-item variant="image" class="imgLoadingBgd" style="width: 60px; height: 60px; margin-right: 10px; border-radius: 6px;" />
            <div style="flex: 1; font-size: 12px; display: flex; flex-direction: column;">
              <el-skeleton-item variant="text"  style="width: 60%; height: 19px;" />
              <el-skeleton-item variant="text"  style="margin-top: 3px; width: 40%; height: 16px;" />
              <el-skeleton-item variant="text"  style="margin-top: 3px; width: 80px; height: 16px;" />
        
            </div>
          </div>
        </template>
        
      </div>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-skeleton>
</template>

<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: () => (true)
  },
})
</script>

<style scoped lang="less">

</style>