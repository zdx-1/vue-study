<script setup>
import { computed, onMounted, ref, nextTick, toRefs, reactive, watch } from "vue";


const props = defineProps({
  data: { default: null },
  actions: { type: Array,  default: () => [] },
  onClose: { type: Function, default: () => {} },
  index: { type: Number, default: () => 0 },
});
const showData = computed(() => {
  let data = {},
    pd = props.data;
  if (pd) {
    data.name = pd.name;
    data.id = pd.id;
    data.subname = pd.ar[0].name;
    data.picUrl = pd.al.picUrl;
  }
  return data;
});


const { actions } = toRefs(props)


const contextMenu = ref(null);
onMounted(async () => {
// 确保组件已经渲染
  await nextTick();
// 触发组件focus
  contextMenu.value.focus();
});

const clickFunc = async (item) => {
  await item.fn(props)
  props.onClose();
};


</script>
<template>
  <div
    class="context-menu dark:bg-[rgb(36,36,36)] bg-white"
    ref="contextMenu"
    @blur="onClose"
    tabindex="-1"
  >
    <div class="context-menu__info">
      <img class="context-menu__img" :src="showData.picUrl" alt="" />
      <div>
        <div class="context-menu__name">
          {{ showData.name }}
        </div>
        <div class="context-menu__subname">
          {{ showData.subname }}
        </div>
      </div>
    </div>
    <div v-for="(item, idx) in props.actions" :key="idx">
      <div class="border" v-if="!item"></div>
      <div v-else class="context-menu__item" @click="clickFunc(item)">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.context-menu {
  width: 260px;
  position: fixed;
  padding: 12px 4px;
  border-radius: 6px;
  border: 1px solid  rgba(222, 222, 222, 0.5);
  // background-color:  #ffffff;
  font-size: 14px;
  font-weight: 500;
  user-select: none;
  &:focus {
    outline: none;
  }

  .divide {
    height: 1px;
    // background-color:  rgba(222, 222, 222, 0.5);
    margin: 8px auto;
    width: calc(100% - 12px);
  }

  &__item {
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
      background-color: rgba(100, 108, 255, 0.1);
      border-radius: 6px;
    }
  }

  &__info {
    display: flex;
    padding: 0 12px;
  }

  &__img {
    width: 36px;
    height: 36px;
    margin-right: 6px;
  }

  &__name {
    font-size: 16px;
  }

  &__subname {
    font-size: 12px;
  }
}
</style>