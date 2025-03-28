<script lang="ts" name = "SignIn" setup>

  import { ref } from 'vue'
  import axios from 'axios';
  const userName = ref('');
  const password = ref('');

    
  function SignIn(){
    console.log('login start');
    const userInfo = {
        "username": userName.value,
        "password": password.value,
    } //Axios 在默认情况下会对传入的对象自动进行序列化（同时设置 Content-Type: application/json）


    axios.post('http://222.215.137.44:8084/login/', userInfo)
    .then(function (response) {
        console.log(`user-info:${userInfo}`)
        console.log(response);
        if(response.data.success){
            window.alert(`恭喜${response.data.username} ! 登录成功!`)
            localStorage.setItem('jwt_token', response.data.token);
            
        }

        else{
            window.alert(`登录失败！ ${response.data.message}`)
        }
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
        <span>密码:</span>
        <el-input
        v-model="password"
        style="width: 240px"
        type="password"
        placeholder="请输入密码"
        show-password
        />
    </div>

    <el-button type = "primary" @click="SignIn">
        登录
    </el-button>
</template>

