<template>
  <div id="VirtualList" ref="VirtualList" @scroll="handleScroll">
    <div :style="{ height: items.length * size + 'px' }"></div>
    <div id="container" ref="container" :style="{ top: offsetTop }">
      <div class="item" @click="playSong(listItem, index)" v-for="(listItem, index) in itemList" >
        <div class="info">
          <el-image class="img" lazy :src="listItem.al?.picUrl" fit="scale-down" :title="listItem.name" :alt="listItem.name"></el-image>
          <div style="display: flex; flex-direction: column;">
            <div class="songName">{{ listItem.name }}</div>
            <div class="nickname">
              <template v-for="item in listItem.ar">
                <span>
                  {{ item.name }}
                </span>
              </template>
            </div>
          </div>
        </div>
        <div class="Album">
          {{ listItem.al?.name }}
        </div>
        <div class="songTime">
          {{ dayjs(listItem.dt).format('mm:ss') }}
        </div>
      </div>    
    </div>
  </div>
</template>
<script setup>
import { dayjs } from 'element-plus'
import { computed, ref, toRefs, onMounted } from 'vue'
const props = defineProps({
  size: {
    type: Number
  },
  remain: {
    type: Number
  },
  items: {
    type: Array
  },
})
const start = ref(0)

const { items, remain, size } = toRefs(props)
const end = ref(remain.value)
const VirtualList = ref(null)
const offsetTop = ref(0)
const handleScroll = () => {
  start.value = VirtualList.value?.scrollTop / size.value
  end.value = start.value + remain.value
  offsetTop.value = VirtualList.value?.scrollTop + "px"
}
const itemList = computed(() => {
  return items.value.slice(start.value, end.value);
})
onMounted(() => {
  console.log(size.value * remain.value + "px",VirtualList.value);
  VirtualList.value.style.height = size.value * remain.value + "px";
})

</script>
<style scoped lang="less">
#VirtualList {
  overflow: auto;
  width: auto;
  position: relative;
}
#container {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.item{
      height: 60px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      .img{
        width: 40px;
        height: 40px;
        border-radius: 4px;
        margin-right: 10px;
      }
      .songTime{
        color: var(--color-255rgba-03);
        font-size: 14px;
      }
      .info{
        display: flex; 
        flex: 1;
        width: 100%;
        color: var(--hsla-05);
        .songName{
          // color: rgba(255, 255, 255, .3);
          color: #fff;
          font-size: 14px;
        }
        .nickname{
          color: var(--hsla-05);
          text-decoration-color: var(--hsla-05);
          font-size: 12px;
        }
        .nickname, .songName{
          width: 350px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding-right: 10px;
          box-sizing: border-box;
        }
      }
      .Album{
        flex: 1;
        color: var(--color-255rgba-03);
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding-right: 10px;
        box-sizing: border-box;
      }


      &:hover{
        background: var(--hsla-01);
      }
    }


</style>