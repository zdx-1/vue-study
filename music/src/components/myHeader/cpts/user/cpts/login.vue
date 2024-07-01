<template>
  <el-dialog
    v-model="dialogVisible"
    :draggable="true"
    width="300px"
    :before-close="loginHandleClose"
  >
    <div class="w-[100%] flex items-center">
      <div class="flex-1 flex items-center justify-center flex-col">
        <div class="text-3xl">扫码登入</div>
        <img :src="qrCreateImg" class="img w-[180px] h-[180px]" />
        <div>
          请使用网易云app扫码登入
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import {
  Back,
  Search,
  Right
} from '@element-plus/icons-vue'
import { ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { getloginQrKey, getloginQrCreate, getloginQrCheck } from '@/services'
import useUserStore from '@/stores/modules/user'
const dialogVisible = ref(true)

const emits = defineEmits(['displayDialogVisible','hideDialogVisible'])
let qrKey = ''
let time
const userStore = useUserStore()
const qrCreateImg = ref('')

const tabsActiveName = ref('qr')

const router = useRouter()

const cookie = ref('')

const IntervalRequestQrCheck = async (qrKey) => {
  const qrCheckRes = await getloginQrCheck(qrKey)
  if (qrCheckRes.cookie) {
    cookie.value = qrCheckRes.cookie
    localStorage.setItem('cookie', qrCheckRes.cookie)
    userStore.cookie = qrCheckRes.cookie
    userStore.initUserAllInfo()
    userStore.loginStatus = true
    console.log(qrCheckRes.cookie, '扫描成功');
    clearInterval(time)
    time = null
    emits('hideDialogVisible')
  }
}

const qr = async () => {
  const res = await getloginQrKey()
  if(res.code != 200) return
  qrKey = res.data.unikey
  const qrCreateRes = await getloginQrCreate(qrKey)
  qrCreateImg.value = qrCreateRes.data.qrimg
  time = setInterval(() => {
    IntervalRequestQrCheck(res.data.unikey)
  },500)
}

const loginHandleClose = () => {
  clearInterval(time)
  time = null
  emits('hideDialogVisible')
}
const tabsHandleClick = res => {
  if (res.paneName == 'qr') {
    qr()
  } else {
    clearInterval(time)
    time = null
  }
  console.log('tabsHandleClick', res.paneName);
}

qr()
</script>

<style scoped lang="less">
:deep(.el-dialog__body){
  padding-top: 0 !important;
}

.el-dialog.is-draggable .el-dialog__header{
  padding: 0 !important;
}
</style>