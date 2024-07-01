<template>
  <div class="albumInfo">
    <song-list :items="items" :item-hieght="80" item-kye="id">
      <template #="{ item,index }">
        <div class="item flex items-center px-[5px] py-[10px] pr-[16px] box-border justify-between" @click="itemClick(item)">
          <div class="left flex flex-1 items-center">
            <div class="imgBox">
              <!-- <img class="img" v-lazy="{ src: item.picUrl, delay: 500 }" :title="item.data?.name" :alt="item.data?.name" /> -->
              <my-image class="img" :url="item.picUrl" :title="item.data?.name" :alt="item.data?.name" />
            </div>
            <div class="name">
              {{ item.name }}
            </div>
          </div>
          <div class="right flex flex-1 items-center justify-between text-xs dark:text-white/50 text-black/50">
            <div class="flex-1">
              {{ item.size }} 首
            </div>
            <div class="flex-1">
              发行时间 {{ dayjs(item.publishTime).format('YYYY-MM-DD') }}
            </div>
          </div>
        </div>
      </template>
    </song-list>
  </div>
</template>

<script setup>
import { ref, toRefs, onMounted, computed, reactive, watch } from 'vue'
import { dayjs } from 'element-plus'
import songList from '@/components/songList.vue';
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
const itemClick = item => {
  router.push(`/songAlbum?id=${item.id}`)
}
</script>

<style scoped lang="less">
.albumInfo{
  .item{
    .right{
      .singer{
        
        display: flex;
        .name::after{
          content: ' / ';
        }
        .name:last-child::after{
          content: '';
        }
      }
    }
    .imgBox{
      width: 60px;
      height: 60px;
      margin-right: 10px;
      overflow: hidden;
      .img{
        width: 100%;
        height: 100%;
      }
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
}
</style>