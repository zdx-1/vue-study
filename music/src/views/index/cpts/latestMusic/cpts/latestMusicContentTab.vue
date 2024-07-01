<template>
  <div class="flex justify-between">
    <div class="flex text-xs">
      <template v-for="(item, index) in tabData">
        <div :class="{'text-[red]': tabActive == item.key}" class="text-center cursor-pointer leading-[30px] h-[30px] w-[50px]"  @click="tabClick(item)">
          {{ item.name }}
        </div>
      </template>
    </div>
    <div class="">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  tabData: {
    type: Array,
    default: () => []
  },
  tabActive: {
    type: String,
    default: () => ('')
  },
})
console.log(props.tabData);
const emits = defineEmits(['tabClick'])
const tabClick = item => {
  emits('tabClick', item)
}
</script>

<style scoped lang="less">
</style>
