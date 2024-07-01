<template>
  <div class="flex flex-1 items-center">
    <div class="flex flex-1 items-center">
      <h2 @click="headerLeftClick" class="flex items-center cursor-pointer">
        {{ title }}
        <el-icon><ArrowRight /></el-icon>
      </h2>
    </div>
    <div class="flex justify-end flex-1 items-center">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowRight,
} from '@element-plus/icons-vue'
import { ref, toRefs } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: () => '默认标题'
  },
  areaList: {
    type: Array,
    default: () => []
  }
})

const emist = defineEmits(['headerLeftClick'])
const headerLeftClick = item => {
  emist('headerLeftClick', item)
}
</script>

<style scoped lang="less">

</style>