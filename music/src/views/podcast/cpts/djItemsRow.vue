<template>
 
  <djItemsRowSkeleton :loading="items.length">
    <div class="mt-[10px] mb-[20px]">
      <slot name="title"></slot>
      <div class="grid grid-cols-6 gap-[15px] mt-[10px]">
        <template v-for="item in items">
          <div class="box-border flex flex-col">
            <div class="cursor-pointer rounded-lg overflow-hidden mb-[6px]  w-[100%]">
              <my-image class="h-[100%] w-[100%] hover:scale-[1.2] rounded duration-700 transition-alls" :url="item.picUrl" />
            </div>
            <div class="text-sm line-clamp-2">
              <span class="text-[12px] px-[4px] py-[2px] bg-black/10 text-black/50 dark:bg-white/10 dark:text-white/30 mr-[6px]">{{ item.secondCategory }}</span>
              <span class="cursor-pointer">{{ item.name }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </djItemsRowSkeleton>
</template>

<script setup>
import djItemsRowSkeleton from '../skeletonCpts/djItemsRowSkeleton.vue';
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
})

</script>