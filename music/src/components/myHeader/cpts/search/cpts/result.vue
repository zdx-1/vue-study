<template>
  <div class="result">
    <template v-for="(val,key,index) in searchSuggestData">
      <div class="content" v-if="Object.keys(names).includes(key)">
        <h2 class="title">
          {{ names[key] }}
        </h2>
        <template v-for="(item,index) in val">
          <div class="item" @click="itemClick(item, key)">
            {{ item.name }}
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { getSearchDefault, getSearchHotDetail } from '@/services'
import useUserStore from '@/stores/modules/user'
const props = defineProps({
  searchSuggestData: {
    type: Object,
    default: () => {}
  }
})
const names = {
  playlists: '歌单',
  songs: '歌曲',
  artists: '歌手',
  albums: '专辑',
  // guessList: '猜你想搜',
}
const emits = defineEmits(['itemClick'])
const itemClick = (item, key) => {
  emits('itemClick', item, key)
}
</script>

<style scoped lang="less">
.result{
 
  .content{
    
    margin: 10px 0;
    .title{
      padding: 0 20px;
      margin: 5px 0;
    }
    .item{
      font-size: 12px;
      padding: 10px 20px;
      // color: var(--color-255rgba-03);
      &:hover{
        background: var(--hsla-01);
      }
    }
  }
}
</style>