<script setup>
import { computed, onMounted, ref, nextTick } from "vue";
import { useRouter } from 'vue-router'




const props = defineProps({
  data: { default: null },
  onClose: { type: Function, default: () => {} }
});

const contextMenu = ref(null);
onMounted(async () => {
  console.log(props.mixins);
});

const clickFunc = (type) => {
  props.onClose();
};
const actions = [
  {
    label: "查看歌单",
    type: "查看歌单",
  },
  {
    label: "播放",
    type: "播放",
  },
  {
    label: "下一首播放",
    type: "下一首播放",
  },
  '',
  {
    label: "收藏",
    type: "收藏",
  },
  {
    label: "发现...",
    type: "发现...",
  },
  {
    label: "复制链接",
    type: "复制链接",
  },
  '',
  {
    label: "不感兴趣",
    type: "不感兴趣",
  },
]

const router = useRouter()
const itemClick = item => {
  router.push(`/songSheet?id=${item.id}`)
}
</script>
<template>
  <div
    class="dark:bg-[rgb(36,36,36)] dark:text-white/50  bg-white  text-black fixed py-[8px] border dark:border-[rgb(36,36,36)] border-white/90 shadow-lg leading-5 rounded overflow-hidden "
    ref="contextMenu"
  >
    <template v-for="(item, idx) in actions">
      <el-divider v-if="item == ''" />
      <div class=" w-[240px] text-sm hover:bg-black/5 dark:hover:bg-white/10 h-[30px] flex items-center px-[10px] cursor-pointer" @click="itemClick" v-else>
        <div class="mx-[10px]">
          {{ item.label }}
        </div>
      </div>
    </template>
  </div>
</template>
<style scoped lang="less">
:deep(.el-divider--horizontal){
  margin: 0 !important;
}
</style>
