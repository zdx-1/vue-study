<template>
  <el-dialog 
    v-model="dialogVisible" 
    title="创建歌单" 
    width="30%" 
    draggable 
    :before-close="cancelClick">
    <slot></slot>
    <template #footer>
      <div class="dialog-footer">
        <div class="flex justify-center flex-col">
          <el-input v-model="sheetTitle" placeholder="请输入新歌单标题" />
          <el-checkbox v-model="sheetCheckbox" label="设置为隐私歌单" size="large" />
          <div class="mt-[22px] flex items-center justify-center">
            <el-button :disabled="!sheetTitle.length" @click="createSheet">创建</el-button>
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { getSheetPlaylistCreate } from '@/services'
import { ref, toRefs } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: () => false
  }
})
const emits = defineEmits(['update:modelValue'])
const sheetCheckbox = ref(false)
const dialogVisible = ref(true)
const sheetTitle = ref('')
const cancelClick = () => {
  emits('update:modelValue', false)
}

const createSheet = async () => {
  const res = await getSheetPlaylistCreate(sheetTitle.value.trim(), sheetCheckbox.value)
  console.log(res);
  emits('update:modelValue', false)
}

</script>

<style scoped lang="less">
:deep(.el-button){
  background: var(--purple-primary);
  border: 1px solid var(--rgda-255-005);
  cursor: pointer;
  border-radius: 12px;
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 28px;
  line-height: 28px;
  color: #fff !important;
}
</style>