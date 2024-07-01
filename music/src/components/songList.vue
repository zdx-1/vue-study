<template>
  <div class="songList">
    <div class="loading" v-show="!items.length">
      <my-loading>
        <span>加载中...</span>
      </my-loading>
    </div>
    <RecycleScroller
      v-if="items.length"
      class="scroller"
      :items="items"
      :item-size="itemHieght"
      :buffer="buffer"
      :key-field="itemKye"
      v-slot="{ item,index }"
    >
      <slot v-bind="{item, index}"></slot>
    </RecycleScroller>
  </div>
</template>

<script setup>
import myLoading from '@/components/myLoading.vue'
import { getVideoGroupList, getVideoCategoryList } from '@/services'
import { useRoute, useRouter } from 'vue-router'
import { ref, toRefs, onMounted, computed, reactive, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => ([])
  },
  pageCount: {
    type: Number,
    default: () => (0)
  },
  itemHieght: {
    type: Number,
    default: () => (0)
  },
  buffer: {
    type: Number,
    default: () => (0)
  },
  itemKye: {
    type: String,
    default: () => ('id')
  },
})
const { items } = toRefs(props)

</script>

<style scoped lang="less">
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