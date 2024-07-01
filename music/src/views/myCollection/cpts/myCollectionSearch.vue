<template>
  <div>
    <div class="mb-[20px] flex items-center justify-between">
      <div>
        <slot name="title"></slot>
      </div>
      <div>
        <el-input
          v-model="searchStr"
          class="input-with-select"
          :placeholder="placeholder"
          size="small"
          @input="searchInput"
          @change="searchChange"
          @focus="searchFocus"
        >
          <template #suffix>
            <el-icon :size="14">
              <Search v-show="!searchStr.length"/>
              <Close @click="closeInput" v-show="searchStr.length"/>
            </el-icon>
          </template>
        </el-input>
      </div>
    </div>
    <div>
      <slot :items="newItems"></slot>
    </div>
  </div>
</template>

<script setup>
import { throttle } from 'underscore'
import { Search, Close } from '@element-plus/icons-vue'
import { ref, toRefs, computed, watch } from 'vue'
const props = defineProps({
  items: {
    type: Array,
    default: ()=>[]
  },
  placeholder: {
    type: String,
    default: () => '默认标题'
  }
})
const { items } = toRefs(props)
const searchStr = ref('')
const newItems = ref([])

const computedNewItems = () => {
  console.log('items.value', items.value);

  // items.value.map(item => {
  //   if (item.name.indexOf(searchStr.value.trim()) >= 0) {
  //     item.isShow = true
  //   } else {
  //     item.isShow = false
  //   }
  //   return item
  //  })
   return items.value.filter(item => item?.name?.indexOf(searchStr.value.trim()) >= 0 || item?.title?.indexOf(searchStr.value.trim()) >= 0)
}
const searchChange = e => {
  newItems.value = e.trim() ? computedNewItems() : items.value
}

let indexOfThrottle = null
const searchInput = val => {
  if(!val.trim()) return
  indexOfThrottle = null
  indexOfThrottle = throttle((n) => {
    newItems.value = e ? computedNewItems() : items.value
  },300)
}
const searchFocus = () => {
  searchStr.value = searchStr.value.trim()
}

const closeInput = () => {
  searchStr.value = ''
}

watch(items, n => {
  if (n.length && n) {
    newItems.value = items.value
  }
})

watch(searchStr, n => {
  if (!n.trim().length && !n.trim()) {
    newItems.value = items.value
  }
})
</script>

<style scoped lang="less"> 
:deep(.el-input__inner){
  // color: #fff;
}

:deep(.el-input__wrapper){
  border-radius: 24px;
  background-color: var(--hsla-01);
  box-shadow: none;
  .el-icon{
    font-size: 20px;
  }
}
</style>