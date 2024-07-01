<template>
  <div class="h-[24px] flex justify-between">
    <el-popover ref="popover" placement="bottom-start" :width="600" trigger="click">
      <template #reference>
        <el-button style="margin-right: 16px" >{{ activeItem.name }}</el-button>
      </template>
      <!-- <div @click="groupItemClick('全部')" :class="{ active: 'all' == active}">全部歌单</div> -->
      <!-- <el-divider /> -->
      <div class="flex flex-wrap">
        <template v-for="(item, index) in groupList">
          <div class="m-[10px] cursor-pointer text-xs" @click="groupItemClick(item)" :class="{ active: item.name == activeItem.name}">
            {{ item.name }}
          </div>
        </template>
      </div>
    </el-popover>

    <div class="flex items-center">
      <template v-for="(item, index) in categoryList">
        <div @click="categoryItemClick(item)" class="text-xs cursor-pointer mx-[8px] flex items-center " :class="{ active: item.name == activeItem.name}">
          {{ item.name }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  groupList: {
    type: Array,
    default: () => []
  },
  categoryList: {
    type: Array,
    default: () => []
  },
  activeItem: {
    type: Object,
    default: () => ({})
  },
})
const { activeItem } = toRefs(props)
const emits = defineEmits(['tabClick'])
const categoryItemClick = item => {
  let { name, id } = item
  if(activeItem.value.id == id) return
  emits('tabClick', item)
}
const groupItemClick = item => {
  emits('tabClick', item)
}
</script>

<style scoped lang="less">
.active{
  color: red;
}

:deep(.el-button){
  background: var(--purple-primary);
  border: 1px solid var(--rgda-255-005);
  cursor: pointer;
  border-radius: 12px;
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 24px;
  line-height: 24px;
  color: #fff;
}
</style>