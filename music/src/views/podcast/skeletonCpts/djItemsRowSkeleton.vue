<template>
  <el-skeleton style="" animated :loading="!loading" direction="vertical" alignment="flex-start" class="mt-[10px] mb-[20px]">
    <template #template >
      <el-skeleton-item variant="text" :class="{ imgdarkBgd :effect == 'dark' ? true : false}" style="width: 160px;; height: 24px;" />
      <div class="grid grid-cols-6 gap-[15px] mt-[10px]">
        <template v-for="item in 6">
          <div class="box-border flex flex-col">
            <el-skeleton-item variant="image" class="imgLoadingBgd rounded-lg overflow-hidden mb-[6px] h-[185px] w-[100%]" />
            <div style="flex: 1; font-size: 12px; display: flex; flex-direction: column;">
              <el-skeleton-item variant="text" :class="{ imgdarkBgd :effect == 'dark' ? true : false}" style="width: 100%; height: 26px;" />
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
import usePageStore from '@/stores/modules/page'
import { toRefs } from 'vue'
const pageStore = usePageStore()
const { effect } = toRefs(pageStore)
const props = defineProps({
  loading: {
    type: [Boolean, Number],
    default: () => (false)
  }
})
</script>