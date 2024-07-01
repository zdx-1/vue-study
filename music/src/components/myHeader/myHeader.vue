<template>
  <el-header class="">
    <div class="header flex-1">
      <nav class="nav">
        OneRuri
      </nav>
      <div class="flex flex-1 justify-between pr-[25px]">
        <div class="left">
          <el-icon class="Back" @click="routerBack"><Back /></el-icon>
          <el-icon class="Right" @click="routerForward"><Right /></el-icon>
          <search-box></search-box>
        </div>
        <div class="right">

          <el-tooltip
            class="box-item"
            :effect="effect"
            content="部分页面主题未完成，开发中..."
            placement="bottom"
          >
          <div class="flex items-center mr-[15px]">
            <el-icon v-show="effect == 'dark'" @click="clickToggleTheme" :size="22">
            <Sunny />
            </el-icon>

            <el-icon v-show="effect == 'light'" @click="clickToggleTheme" :size="22">
              <Moon />
            </el-icon>
          </div>
          </el-tooltip>


          <div @click="SetFullScreen" class="flex items-center mr-[15px] w-[22px] h-[22px]">
            <svg v-show="screenfullType" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"></path></svg>
            <svg v-show="!screenfullType" t="1684166261067" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14233" width="20" height="20"><path d="M410.112 513.664 97.664 513.664c-17.664 0-32 14.336-32 32s14.336 32 32 32l242.752 0-267.456 267.456c-12.032 12.032-12.032 31.36 0 43.392 11.968 11.968 31.36 11.968 43.328 0l269.376-269.376 0 246.592c0 17.664 14.336 32 32 32s32-14.336 32-32l0-320C449.664 521.6 435.84 513.664 410.112 513.664zM553.216 449.664l312.512 0c17.664 0 32-14.336 32-32s-14.336-32-32-32L622.912 385.664l267.456-267.456c12.032-12.032 12.032-31.36 0-43.392-11.968-11.968-31.36-11.968-43.328 0L577.664 344.256 577.664 97.664c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 320C513.664 438.144 529.664 449.664 553.216 449.664z" p-id="14234" fill="#e6e6e6"></path></svg>
          </div>
          <user></user>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script setup>
import {
  Back,
  Sunny,
  Moon,
  Right
} from '@element-plus/icons-vue'
import screenfull from 'screenfull'
import { useColorMode } from '@vueuse/core'
import toggleTheme from '@/hooks/toggleTheme'
import { ref, toRefs, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import user from './cpts/user/user.vue'
import searchBox from './cpts/search/search.vue'
import { useDark, useToggle } from '@vueuse/core'
import usePageStore from '@/stores/modules/page'
const pageStore = usePageStore()
const { effect } = toRefs(pageStore)

const userStore = useUserStore()
const { userInfo } = toRefs(userStore)
const screenfullType = ref(true)
const route = useRoute()
const router = useRouter()

const routerBack = () => {
  router.back()
}
const routerForward = () => {
  router.forward()
}

const mode = useColorMode()
mode.value = 'dark'


const SetFullScreen = () => {
  //screenfull.isEnabled 此方法返回布尔值，判断当前能不能进入全屏
  if (!screenfull.isEnabled) {
    return false
  }
  screenfullType.value = !screenfullType.value
  screenfull.toggle()
}

const clickToggleTheme = (event) => {
  toggleTheme(event)
  effect.value = effect.value === 'dark' ? 'light' : 'dark'
}

</script>

<style scoped lang="less">
.header{
  // padding: 0 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left{
    height: 40px;
    display: flex;
    justify-items: center;
    align-items: center;
    .Right,.Back{
      font-size: 24px;
      width: 48px;
      height: 24px;
      cursor: pointer;
    }
    .Right{
      margin: 0 10px;
    }
  }
  .right{
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
}
.nav{
  background: var(--head-bgd);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 70px;
  -webkit-text-stroke: 1px var(--purple-primary);
  font-weight: 900;
  color: #f8f3f3;
  line-height: 1;
  font-size: 25px;
  font-family: "Roboto", sans-serif;
  // background: hsla(0, 0%, 100%, 0.05);
}
</style>
