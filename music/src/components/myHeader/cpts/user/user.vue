<template>
  <div class="user">
    <template v-if="!userInfo.avatarUrl">
      <el-button class="login" @click="displayLogin" round>登入</el-button>
    </template>
    <template v-else>
      <el-popover
        :width="300"
        :teleported="false"
        :hide-after="50"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
      >
        <template #reference>
          <div style="display: flex; justify-content: center; align-items: center; cursor: pointer;">
            <el-image  class="img" :src="userInfo.avatarUrl" fit="scale-down" :title="userInfo.nickname" :alt="userInfo.nickname"></el-image>
              <div class="nickname">
                {{ userInfo.nickname }}
            </div>
          </div>
        </template>
        <template #default>
          <user-popover />
        </template>
      </el-popover>
    </template>

    <logins v-if="loginDialogVisible" @hide-dialog-visible="loginHandleClose"></logins>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import logins from './cpts/login.vue'
import userPopover from './cpts/userPopover.vue'


const userStore = useUserStore()
const { userInfo } = toRefs(userStore)


const loginDialogVisible = ref(false)


const router = useRouter()

const displayLogin = async () => {
  loginDialogVisible.value = true
}

const loginHandleClose = ()=> {
  loginDialogVisible.value = false
}
</script>

<style scoped lang="less">
:deep(.el-popover){
  padding: 0 !important;
}
.login{
  background: var(--purple-primary);
  border: none;
  color: #fff;
  padding: 15px 22px;
  cursor: pointer;
  &:hover{
    color: var(--hsla-05);
  }
}
.img{
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
}
</style>