<template>
  <div class="mt-[10px] mb-[20px]">
    <djItemsColumnSkeleton :loading="items.length">
      <slot name="title"></slot>
      <div class="grid grid-cols-2 gap-[15px] mt-[10px]">
        <template v-for="item in items">
          <div class="flex hover:bg-black/10 dark:hover:bg-white/10">
            <div class="w-[95px] h-[95px] mr-[10px] overflow-hidden rounded-lg">
              <my-image class="w-[95px] h-[95px] hover:scale-[1.2] rounded duration-700 transition-alls" :url="item.picUrl" />
            </div>
            <div class="flex flex-col flex-1 justify-evenly truncate">
              <div class="truncate">{{ item.lastProgramName }}</div>
              <div>
                <span class="text-[12px] px-[4px] py-[2px] bg-black/10 text-black/50 dark:bg-white/10 dark:text-white/30 truncate">
                  {{ item.secondCategory }}
                </span>
              </div>
              <div>
                <span class="text-xs px-[4px] py-[2px] text-black/60 dark:text-white/50 truncate max-w-[150px]">
                  {{ item.name }}
                </span>
                <span class="text-xs px-[4px] py-[2px] text-black/60 dark:text-white/50 truncate">
                  {{ dayjs(item.createTime).format('mm:ss') }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </djItemsColumnSkeleton>
  </div>
</template>

<script setup>
import djItemsColumnSkeleton from '../skeletonCpts/djItemsColumnSkeleton.vue';
import { dayjs } from 'element-plus'
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
})

</script>