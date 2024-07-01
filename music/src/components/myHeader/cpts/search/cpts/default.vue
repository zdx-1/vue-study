<template>
  <div class="searchBox">
    <div class="mt-[10px]" v-show="searchNamesData.length">
      <div class="px-[20px] flex items-center justify-between">
        <h2>搜索历史</h2>
        <div style="font-size: 12px;">
          查看全部
        </div>
      </div>

      <div class="list">
    
        <!-- <template v-for="(item, index) in searchNamesData">
          <div class="item">
            
          </div>
        </template> -->
      </div>
    </div>

    <div class="mt-[10px]">
      <h2 class="pl-[20px]">热搜榜</h2>
      <template v-for="(item, index) in searchHotDetailData">
        <div class="hover:bg-[#eee] dark:hover:bg-[var(--hsla-01)] cursor-pointer flex items-center my-[6px] box-border p-[12px] ly-[12px]" @click="hotItemClick(item)">
          <div class="pl-[6px] pr-[10px] w-[40px] text-[14px] " :class="{ 'text-[red] font-bold': index < 3}">
            {{ index + 1 }}
          </div>
          <div class="flex flex-col">
            <div>
              <span class="text-xs" :class="{ 'font-bold': index < 3}">{{ item.searchWord }}</span>
              <span class="pl-[10px] text-xs dark:text-white/50 text-black/50">{{ item.score }}</span>
            </div>

            <div class="text-xs dark:text-white/50 text-black/50">
              {{ item.content }}
            </div> 
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>

import { ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { getSearchDefault, getSearchHotDetail } from '@/services'
import useUserStore from '@/stores/modules/user'
const props = defineProps({
  searchNamesData: {
    type: Object,
    default: () => {}
  }
})

const userStore = useUserStore()
const {  } = toRefs(userStore)

const router = useRouter()

const searchHotDetailData = ref([])
const getSearchHotDetailData = async () => {
  const res = await getSearchHotDetail()
  searchHotDetailData.value = res.data
}
getSearchHotDetailData()
const emits = defineEmits(['hotItemClick'])
const hotItemClick = item => {
  emits('hotItemClick', item)
}
</script>

<style scoped lang="less">

</style>