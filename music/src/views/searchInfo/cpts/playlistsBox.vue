<template>
  <div class="playlistsBox">
    <div class="loading" v-show="!items.length">
      <my-loading>
        <span>加载中...</span>
      </my-loading>
    </div>
    <RecycleScroller
      v-if="items.length"
      class="scroller"
      :items="items"
      :item-size="80"
      :buffer="60"
      key-field="id"
      v-slot="{ item,index }"
    >
      <div class="flex items-center px-[5px] py-[10px]  box-border justify-between" @click="itemClick(item)">
        <div class="flex items-center">
          <div class="w-[60px] h-[60px] mr-[10px] overflow-hidden">
            <el-image loading="lazy" lazy class="img" :src="item?.img1v1Url || item.coverImgUrl" fit="fill" :title="item.name" :alt="item.name"></el-image>
          </div>
          <div class="name">
            {{ item.name }}
          </div>
        </div>
        <div class="flex items-center text-xs dark:text-white/50 text-black/80 pr-[10px] ">
          <div class="trackCount w-[100px]">
            {{ item.trackCount }}首
          </div>
          <div class="w-[300px]">
              by  {{ item.creator?.nickname }}
          </div>
          <div class="w-[100px]">
            {{ item.bookCount }}
          </div>
        </div>
      </div>
    </RecycleScroller>
  </div>
</template>
  
<script setup>
import myLoading from '@/components/myLoading.vue'
import { ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  items: {
    type: Array,
    default: () => ([])
  },
  pageCount: {
    type: Number,
    default: () => (0)
  },
})
const { items } = toRefs(props)
const itemClick = (item) => {
  console.log(`/songSheet?id=${item.id}`);
  router.push(`/songsheet?id=${item.id}`)
  // router.push(`recentlyPlay`)
}
</script>

<style lang="less" scoped>
:deep(.vue-recycle-scroller__item-view){
  cursor: pointer;
  &:hover{
    background: var(--vue-recycle-scroller__item-view-hover) !important;
  }
  &:nth-child(odd){
      background-color: var(--vue-recycle-scroller__item-view-nth-child);
    }
}
</style>