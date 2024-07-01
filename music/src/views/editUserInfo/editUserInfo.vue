
<template>
  <div class="editUserInfo">
    <h2>编辑个人信息</h2>
    <div class="form">
      <el-form :model="form" label-width="120px">
        <el-form-item label="昵称">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="介绍">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.resource">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="Activity zone">
          <el-select v-model="form.region" placeholder="please ">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
          <el-select v-model="form.region" placeholder="please ">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
          <el-select v-model="form.region" placeholder="please ">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {  } from '@/services'
import { useRoute, useRouter } from 'vue-router'
import { ref, toRefs, onMounted, computed, reactive, watch } from 'vue'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style scoped lang="less">
.editUserInfo{
  padding: 10px 0;
  .form{
    margin-top: 20px;
    width: 560px;
  }
}
</style>