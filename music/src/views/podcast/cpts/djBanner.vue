<template>
  <div class="flex items-center">
    <template v-for="item in banners">
      <div class="p-[10px] box-border w-1/3 relative" @click="itemClick(item)">
        <my-image class="cursor-pointer rounded-md overflow-hidden" :url="item.pic" />
        <div class="text-xs absolute bottom-[10px] right-[10px] px-[6px] py-[2px] bg-red-500 text-white rounded-br-md rounded-tl-md">{{ item.typeTitle }}</div>
      </div>
      
    </template>
  </div>
</template>

<script setup>

const props = defineProps({
  banners: {
    type: Array,
    default: () => []
  }
})
const itemClick = item => {
  const appSchemeUrl = item.url
  window.location.href = appSchemeUrl;
}
</script>