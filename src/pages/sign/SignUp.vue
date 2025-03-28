<script lang="ts" name = "SignUp" setup>
  import { ref } from 'vue'
  import axios from 'axios';
  const userName = ref('');
  const password = ref('');
  const email = ref('');
  const phoneNumber = ref('');
  function SignUp(){
    console.log('Sign up start');
    const userInfo = JSON.stringify({
        "username": userName.value,
        "email" : email.value,
        "phone_number" : phoneNumber.value,
        "password": password.value,
    })

    axios.post('http://222.215.137.44:8084/register/', userInfo)
    .then(function (response) {
        console.log(response);
        window.alert(response.data.message)
    })
    .catch(function (error) {
        console.log(error);
    });
  }
</script>

<template>
    <div class = "input-user-name-grid">
        <span>用户名:</span>
        <el-input
        v-model="userName"
        style="width: 240px"
        placeholder="请输入用户名"
        clearable
        />
    </div>

    <div class = "input-user-password-grid">
        <span>邮箱:</span>
        <el-input
        v-model="email"
        style="width: 240px"
        type="email"
        placeholder="请输入邮箱"
        clearable
        />
    </div>

    <div class = "input-user-password-grid">
        <span>手机号:</span>
        <el-input
        v-model="phoneNumber"
        style="width: 240px"
        type="text"
        placeholder="请输入手机号"
        clearable
        />
    </div>

    <div class = "input-user-password-grid">
        <span>密码:</span>
        <el-input
        v-model="password"
        style="width: 240px"
        type="password"
        placeholder="请输入密码"
        show-password
        clearable
        />
    </div>

    <el-button type = "primary" @click = "SignUp"> 
        注册
    </el-button>
</template>
  
  <script lang="ts" setup>

  </script>