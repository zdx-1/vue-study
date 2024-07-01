<template>
  <div class="userPopover">
    <div class="oneBox">
      <div class="list">
        <div class="item">
          <h2> 0 </h2>
          <div>动态</div>
        </div>
        <div class="item">
          <h2> {{ userDetail.profile?.follows }}</h2>
          <div>关注</div>
        </div>
        <div class="item">
          <h2>{{ userDetail.profile?.followeds }}</h2>
          <div>粉丝</div>
        </div>
      </div>
      <div class="signin">
        <el-button round @click="signinClick">签到</el-button>
      </div>
    </div>

    <div class="twoBox">
      <div class="item">
        <div class="left">
          我的会员
        </div>
        <div class="right">
          {{ dayjs(userVipInfo.associator?.expireTime).format('YYYY.MM.DD') }} 到期
          <el-icon>
            <ArrowRight />
          </el-icon>
        </div>
      </div>
      <div class="item">
        <div class="left">
          商城
        </div>
        <div class="right">
          <el-icon>
            <ArrowRight />
          </el-icon>
        </div>
      </div>
    </div>

    <div class="threeBox">
      <div class="item" @click="editUserInfo">
        <div class="left">
          个人信息设置
        </div>
        <div class="right">
          <el-icon>
            <ArrowRight />
          </el-icon>
        </div>
      </div>
      <div class="item">
        <div class="left">
          绑定社交账号
        </div>
        <div class="right">
          <el-icon>
            <ArrowRight />
          </el-icon>
        </div>
      </div>
    </div>

    <div class="exitLogin" @click="exitLogin">退出登入</div>
  </div>
</template>

<script setup>
import { dayjs } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { ref, toRefs, onMounted, computed, reactive, watch } from 'vue'
import useUserStore from '@/stores/modules/user'
import { getLogout } from '@/services'
import {
  ArrowRight
} from '@element-plus/icons-vue'
const router = useRouter()
const userStore = useUserStore()
const { userInfo, userDetail, userVipInfo } = toRefs(userStore)

const exitLogin = async () => {
  await getLogout()
  localStorage.removeItem('cookie')
  userStore.userInfo = {}
  userStore.cookie = ''
  userStore.myMenuPathRouter = []
}
const editUserInfo = () => {
  router.push(`/editUserInfo`)
}
const signinClick = () => {
  console.log('signinClick');
}
</script>

<style scoped lang="less">
.userPopover{
  .oneBox{
    
    .list{
      display: flex;
      text-align: center;
      .item{
        flex: 1;

      }
    }
    .signin{
      margin: 10px 0;
      text-align: center;
    }
  }
  .twoBox, .threeBox{
    padding-bottom: 10px;
  }
  .oneBox{
    margin: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
   .twoBox, .threeBox{
    margin-top: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    .item{
      cursor: pointer;
      box-sizing: border-box;
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      .right{
        font-size: 12px;
        color: var(--color-255rgba-03);
      }
      &:hover{
        background: var(--hsla-01);
      }
    }
  }
  .exitLogin{
    cursor: pointer;
    margin: 10px 0;
    box-sizing: border-box;
    padding: 10px 15px;
    &:hover{
        background: var(--hsla-01);
      }
  }

}
</style>