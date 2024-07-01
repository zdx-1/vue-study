<template>
  <div>
    <mvItemHeader :title="title" @headerLeftClick="headerLeftClick">
      <slot name="headerRight"></slot>
    </mvItemHeader>

    <div class="flex flex-wrap">
      <template v-for="(item, index) in items">
        <videoItem 
          class="w-[25%] videoItem"
          :mode="'mv'"
          :img-src="item.cover" 
          :title="item.name" 
          :name="item.artistName" 
          :id="item.id" 
          :item="item" 
          :index="index"
          :is-by="false"
          @videoItemClick="videoItemClick"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import mvItemHeader from './mvItemHeader.vue'
import videoItem from '@/components/video/videoItem.vue'
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: () => '默认标题'
  },
})
const emits = defineEmits(['headerLeftClick', 'videoItemClick'])
const tabsClick = name => {
  active.value = name
}

const videoItemClick = id => {
  emits('videoItemClick', id)
}

const headerLeftClick = item => {
  emits('headerLeftClick', item)
}
</script>

<style scoped lang="less">
@media screen and (max-width: 1420px) {
  .videoItem{
    width: 33.3333333% !important;
  }
}
@media screen and (max-width: 1120px) {
  .videoItem{
    width: 50% !important;
  }
}
</style>