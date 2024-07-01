<template>
  <div class="artists">
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
      <div class="item" @click="itemClick(item)">
        <div class="left">
          <div class="imgBox">
            <el-image loading="lazy" lazy class="img" :src="item?.img1v1Url || item.al?.picUrl" fit="fill" :title="item.name" :alt="item.name"></el-image>
          </div>
          <div class="name">
            {{ item.name }}
          </div>
        </div>
        <div class="right">
          
        </div>
      </div>
    </RecycleScroller>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import myLoading from '@/components/myLoading.vue'
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
  router.push(`/artistInfo?id=${item.id}`)
}
</script>

<style lang="less" scoped>
.item{
  display: flex;
  align-items: center;
  padding: 10px 5px;
  box-sizing: border-box;
  justify-content: space-between;
  .left{
    display: flex;
    align-items: center;
  }
  .imgBox{
    width: 60px;
    height: 60px;
    margin-right: 10px;
    overflow: hidden;
  }
}
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