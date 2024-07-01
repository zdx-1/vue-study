<template>
  <el-space class="space" direction="vertical" alignment="flex-start">
    <el-skeleton :loading="!loading" animated :count="renderSum" >
      <template #template>
        <div style="padding: 15px; box-sizing: border-box;" class="item" >
          <el-skeleton-item variant="image" class="imgLoadingBgd" style="width: 100%; height: 205px;" />
          <div style="padding: 14px">
            <div
              style="
                display: flex;
                align-items: center;
                justify-items: space-between;
                width: 100%;
                height: 16px;
              "
              class="imgLoadingBgd"
            >
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <slot></slot>
      </template>
    </el-skeleton>
  </el-space>
</template>

<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: () => false
  },
  renderSum: {
    type: Number,
    default: 5
  }
})


</script>


<style scoped lang="less">
.space{
  width: 100%;
  // display: grid;
  // grid-template-columns:repeat(5,1fr);
  // grid-gap: 10px;
  // @media screen and (max-width: 1380px) {
  //   grid-template-columns:repeat(4,1fr);
  // }
  // @media screen and (max-width: 1080px) {
  //   grid-template-columns:repeat(3,1fr);
  // }
  // @media screen and (max-width: 880px) {
  //   grid-template-columns:repeat(2,1fr);
  // }
  // @media screen and (max-width: 720px) {
  //   grid-template-columns:repeat(1,1fr);
  // }
  :deep(.el-space__item )
  {
    // display: flex;
    width: 100%;
    // flex-wrap: wrap;
    // justify-content: space-between;
  }
    .item{
      // width: 20%;
      // width: 100%;
    }
}


:deep(.el-skeleton) {
  width: 100%;
  display: grid;
  grid-template-columns:repeat(5,1fr);
  grid-gap: 10px;
  @media screen and (max-width: 1380px) {
    grid-template-columns:repeat(4,1fr);
  }
  @media screen and (max-width: 1080px) {
    grid-template-columns:repeat(3,1fr);
  }
  @media screen and (max-width: 880px) {
    grid-template-columns:repeat(2,1fr);
  }
  @media screen and (max-width: 720px) {
    grid-template-columns:repeat(1,1fr);
  }
}
 
</style>

