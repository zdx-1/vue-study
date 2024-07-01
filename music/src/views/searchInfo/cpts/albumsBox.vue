<template>
  <div class="albums">
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
      <div class="flex items-center px-[5px] py-[10px] justify-between box-border" @click="itemClick(item)">
        <div class="flex items-center flex-1">
          <div class="w-[60px] h-[60px] mr-[10px] overflow-hidden">
            <el-image loading="lazy" lazy class="img" :src="item?.blurPicUrl || item.al?.picUrl" fit="fill" :title="item.name" :alt="item.name"></el-image>
          </div>
          <div class="name">
            {{ item.name }}
          </div>
        </div>
        <div class="flex-1 dark:text-white/50 text-black/80 text-xs">
          {{ item.artist?.name }}
          <span>
            ({{ item.artist?.alias[0] }})
          </span>
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
console.log(items);

const itemClick = item => {
  console.log(item);
  // router.push(`/songalbum?id=${item.id}`)
  router.push(`/songalbum?id=163678212`)
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