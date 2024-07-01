<template>
  <div class="tabBox">
    <div class="left" >
      <template v-for="(item, index) in tabNames">
        <div class="item" @click="itemClick(item)" :class="{active: item.id == active}">
          {{ item.title }}
        </div>
      </template>
    </div>
    <div class="right"></div>
  </div>
</template>
  
<script setup>

const props = defineProps({
  active: {
    type: String,
    default: () => ('')
  }
})
const tabNames = [
  {
    title: '歌曲',
    key: 'songs',
    id: '1'
  },
  {
    title: '歌单',
    key: 'playlists',
    id: '1000'
  },
  {
    title: '专辑',
    key: 'albums',
    id: '10'
  },
  {
    title: '歌手',
    key: 'artists',
    id: '100'
  },
]
const emits = defineEmits(['itemClick'])
const itemClick = item => {
  emits('itemClick', item)
}
</script>
  
<style scoped lang="less">
.tabBox{
  display: flex;
  margin-top: 20px;
  .left{
    display: flex;
    .item{
      cursor: pointer;
      position: relative;
      font-size: 14px;
      margin-right: 34px;
      padding-bottom: 10px;
      
    }
    .active{
      font-weight: 800;
      &::after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border: 1px solid red;
      }
    }
  }
}
</style>