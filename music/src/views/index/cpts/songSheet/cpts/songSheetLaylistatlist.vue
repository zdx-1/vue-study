<template>
  <div class="songSheetLaylistatlist mt-[10px] flex justify-between" >
    <el-popover ref="popover" placement="bottom-start" :width="600" trigger="hover" >
      <template #reference>
        <el-button style="margin-right: 16px" >{{ active }}</el-button>
      </template>
      <div @click="itemClick('全部')" :class="{ active: '全部' == active}">全部歌单</div>
      <el-divider />
      <template v-for="(value, key) in categorieItems.name">
        <div class="flex m-[10px]">
          <div class="w-[60px] flex-shrink-0 gap-3">
            {{ value }}
          </div>
          <div class="list grid">
            <template v-for="(item, index) in categorieItems.list[key]">
              <div class="mr-4 cursor-pointer text-xs" @click="itemClick(item.name)" :class="{ active: item.name == active}">
                {{ item.name }}
              </div>
            </template>
          </div>
        </div>
      </template>
    </el-popover>
    <div class="items-center flex text-xs">
      <template v-for="(item, index) in categorieItems.hot">
        <div class="mx-[5px] cursor-pointer" :class="{ active: item.name == active}" @click="itemClick(item.name)">
          {{ item.name }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  categorieItems: {
    type: Object,
    default: () => {}
  },
  active: {
    type: String,
    default: () => ('')
  },
})

const popover = ref()
const { categorieItems, active } = toRefs(props)
const emits = defineEmits(['itemClick'])

const itemClick = item => {
  popover?.value.hide()
  emits('itemClick', item)
}

</script>

<style scoped lang="less">
.list{
  grid-template-columns: repeat(6, 85px);
  grid-row-gap: 8px;
}


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