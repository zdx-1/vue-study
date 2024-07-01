<template>
  <div class="artistList flex h-[24px] my-[10px] text-xs">
    <div class="left h-6 w-[46px]">
      {{ itemData.name }} :
    </div>
    <div class="right flex-1 box-border flex flex-wrap">
      <template v-for="(item, index) in itemData.items" >
        <div class="item border-white/10 rounded-[20px] mb-[10px] h-[24px] items-center flex box-border cursor-pointer px-[14px] py-[2px]" :class="{ ['dark:bg-[#9b4de0] bg-[rgb(236,65,65)]']: active ==  item.key }" @click="itemClick(item.key)">
          {{ item.name }}
        </div>
        <div v-if="index != itemData.items.length - 1" style="margin: 0 10px 10px 10px; height: 24px; line-height: 24px;">|</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from 'vue';
import { useRouter } from 'vue-router'
const props = defineProps({
  itemData: {
    type: Object,
    default: () => {}
  },
  active: {
    type: String,
    default: () => (-1)
  }
})
const { active } = toRefs(props)
const emits = defineEmits(['itemClick'])
const router = useRouter()
const itemClick = (res) => {
  emits('itemClick', props.itemData.key ,res)
}
</script>

<style scoped lang="less">

</style>