<template>
  <div class="flex items-center h-[100px]">
    <div class="mr-[10px]">
      <my-image class="rounded h-[100px] w-[100px]" :url="musicInfo.al?.picUrl" :title="musicInfo.name" :alt="musicInfo.name" />
    </div>
    <div class="flex flex-1 flex-col">
      <div>
        {{ musicInfo.name }}
      </div>
      <div class="flex text-xs">
        <div class="mr-5">
          专辑：{{ musicInfo.al?.name }}
        </div>
        <div >
          歌手：
          <span v-for="artistInfo in musicInfo.ar">
            {{ artistInfo.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  musicInfo: {
    type: Object,
    default: () => {}
  }
})
</script>