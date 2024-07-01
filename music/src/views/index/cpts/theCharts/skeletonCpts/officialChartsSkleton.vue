<template>
  <el-skeleton style="" animated :loading="loading" :count="4">
    <template #template >
      <div style="margin: 30px 0;">
        <div style="
              display: flex;
              align-items: center;
            ">
        <el-skeleton-item variant="image" class="imgLoadingBgd" style="width: 200px; height: 200px;margin-right: 20px;" />
        <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              flex: 1;
              flex-direction: column;
              /* height: 16px; */
            "
          >
            <template v-for="item in 5">
              <div style="display: flex; flex: 1; margin-right: 16px; width: 100%; height: 30px; padding: 5px 0; box-sizing: border-box;">
                <el-skeleton-item variant="text" class="imgLoadingBgd" style="flex: 1; margin-right: 16px; height: 30px;" />
                <el-skeleton-item variant="text" class="imgLoadingBgd" style="width: 10%; height: 30px;" />
              </div>     
            </template>
          </div>
        </div>
      <div style="margin-left: 220px;">
        <el-skeleton-item variant="text" class="imgLoadingBgd" style="width: 60px; height: 16px;" />
      </div>
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