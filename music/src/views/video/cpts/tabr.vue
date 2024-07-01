<template>
  <div class="tabBox">
    <div class="left" >
      <template v-for="(item, index) in tabs">
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
  },
  tabs: {
    type: Array,
    default: () => ([])
  },
})

const emits = defineEmits(['itemClick'])
const itemClick = item => {
  emits('itemClick', item)
}
</script>
  
<style scoped lang="less">
.tabBox{
  background-color: var(--page-bgd);
  display: flex;
  padding-top: 20px;
  padding-bottom: 10px;
  z-index: 99;
  .left{
    display: flex;
    flex: 1;
    .item{
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
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
        border: 1px solid var(--el-tabs-item-active-bar-color);
      }
    }
  }
}
</style>