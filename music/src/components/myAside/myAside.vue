<template>
  <el-aside width="220px" class="aside" ref="">
    <div class="myAside">

      <div class="menu">
        <div class="top" :class="{height : userInfo.userId == ''}">
          <el-menu
            router
            :default-active="defaultActive"
            :collapse="isCollapse"
          >
            <template v-for="item in pathRouter">
              <el-menu-item :index="item.path">
                <template #title>{{ item.title }}</template>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
        <div class="center"  v-if="userInfo.userId">
          <div class="bdb"></div>
        </div>
        <el-scrollbar :height="`calc(100vh - 70px - ${pageHeight} - 200px)`" v-if="userInfo.userId" always>
          <bottomMenu></bottomMenu>
        </el-scrollbar>
      </div>
    </div>
  </el-aside>
</template>
<script setup>
import { ref, watch, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import bottomMenu from './cpts/bottomMenu.vue';

import usePageStore from '@/stores/modules/page'
const pageStore = usePageStore()
const { pageHeight } = toRefs(pageStore)

const userStore = useUserStore()
const { userInfo } = toRefs(userStore)
const pathRouter = [
  {
    path: '/index',
    title: '发现音乐',
  },
  {
    path: '/podcast',
    title: '播客',
  },
  {
    path: '/video',
    title: '视频',
  },
]

const route = useRoute()
const defaultActive = ref(route.fullPath)
const isCollapse = ref(false)

const handleOpen = (key, keyPath = []) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath = []) => {
  console.log(key, keyPath)
}

watch(route, (n, v) => {
  if (n) {
    defaultActive.value = n.matched[0].path
  }
  
}, {
  deep: true,
  immediate: true
})



</script>

<style lang="less" scoped>
.menu{
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px - v-bind(pageHeight));
  background: var(--hsla-005);
  border-right: 1px solid var(--border-right-wyy);
  overflow: hidden;
  box-sizing: border-box;

  .center{
    box-sizing: border-box;
    padding: 5px;
    height: 20px;
    .bdb{
      border-bottom: 2px solid var(--menu-center-bdr-b);
      
      margin: 5px 8%;
    }
  }
  .bottom{
    height: 100%;
    flex: 1;
  }
}


.myAside{
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  // background: var(--bgd-24);

}
:deep(.el-menu){
    border-right: none;
    // width: 100%;
    height: 100%;
    
    background: hsla(0,0%,100%,0.0);
    .el-menu-item{
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      color: var(--menuitem-color);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:hover{
        color: var(--menuitem-hover-color) ;
        background: var(--menuitem-hover-bgd);
      }
    }
    .el-menu-item.is-active{
      color: var(--menuitem-active-color) ;
      background: hsla(0,0%,100%,0.05);
      border-left: 3px solid var(--menuitem-active-left);
      &:hover{
        background: var(--menuitem-active-hover-bgd);
      }
    }
  }

:deep(.el-sub-menu__title){
  font-size: 14px;
  font-weight: 500;
  color: var(--menuitem-color);
  &:hover{
        color: var(--menuitem-hover-color) ;
        background: var(--menuitem-hover-bgd);
      }
}

.height{
  height: 100%;
}

.span{
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  overflow: hidden;
  display: inline-block;
}
</style>