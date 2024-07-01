<template>
  <el-menu
    router
    :default-active="defaultActive"
  >
    <template v-for="item in myMenuPathRouter">
      <template v-if="item.children?.length">
        <el-sub-menu :index="item.path">
          <template #title>
            <span>{{ item.title }}</span>
            
            <el-tooltip
              v-if="item.path == '/myCearterSongSheet'"
              content="创建歌单"
              placement="bottom"
              :effect="effect"
              >
            <div class="ml-[5px]">
              <span @click.stop="createSheet(item)">
                <svg t="1684769945520" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3127" width="20" height="20"><path d="M512 832a32 32 0 0 0 32-32v-256h256a32 32 0 0 0 0-64h-256V224a32 32 0 0 0-64 0v256H224a32 32 0 0 0 0 64h256v256a32 32 0 0 0 32 32" fill="#3E3A39" p-id="3128"></path></svg>
              </span>
            </div>
            </el-tooltip>

          </template>
          <el-menu-item :index ="item1.path"  v-for="item1 in item.children">
              <span class="span">{{ item1.title }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>

      <template v-else>
        <el-menu-item :index="item.path">
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>  

  <createSheetCard v-model="createSheetCardDialogVisible" v-if="createSheetCardDialogVisible"></createSheetCard>
</template>

<script setup>
import createSheetCard from './createSheetCard.vue'
import { ref, watch, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import useUserStore from '@/stores/modules/user'
const userStore = useUserStore()
const { userInfo, myMenuPathRouter } = toRefs(userStore)
import usePageStore from '@/stores/modules/page'
const pageStore = usePageStore()
const { effect } = toRefs(pageStore)

const createSheetCardDialogVisible = ref(false)
const route = useRoute()

const defaultActive = ref(``)

const createSheet = () => {
  createSheetCardDialogVisible.value = true
}
watch(route, (n, v) => {
  defaultActive.value = n.fullPath
}, {
  deep: true,
  immediate: true
})
</script>

<style lang="less" scoped>
:deep(.el-menu){
  height: auto  !important;
}

:deep(.el-sub-menu__title){
  font-size: 14px;
  font-weight: 500;
  color: #a0a0a0;
  &:hover{
    color: var(--menuitem-hover-color) ;
    background: var(--menuitem-hover-bgd);
  }
}

.span{
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  overflow: hidden;
  display: inline-block;
}
</style>