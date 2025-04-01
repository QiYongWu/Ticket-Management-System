<script lang="ts" name = "SignIn" setup>

  import { reactive } from 'vue'
  import axios from 'axios';

 
  const signInForm = reactive({
    userName:'',
    password:''
  })
    
  function SignIn(){
    if(signInForm.userName && signInForm.password){
        console.log('login start');
        axios.post('http://222.215.137.44:8084/login/', signInForm)
        .then(function (response) {
            console.log(`user-form:${signInForm}`)
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

    else{
      window.alert('请完善所有信息')
    }
  }

</script>

<template >
  <div class = 'form-grid'>
    <el-form  :model="signInForm" label-width="auto" style="max-width: 600px">
      <el-form-item label="用户名" label-position="top" >
        <el-input type="text" v-model="signInForm.userName" />
      </el-form-item>

      <el-form-item label="密码" label-position="top">
        <el-input type = 'password' v-model ="signInForm.password" /> 
      </el-form-item>

      <el-form-item>
        <el-button>取消</el-button>
        <el-button type="primary" @click="SignIn">登录</el-button>
      </el-form-item>

    </el-form>
  </div>
  
</template>
<style scoped>
  .form-grid{
    
    border:solid black 1.5px;
    height:500px;
    width: 500px;
  }
</style>


