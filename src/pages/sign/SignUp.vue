<script lang="ts" name = "SignUp" setup>
  import { ref,reactive } from 'vue'
  import axios from 'axios';
  const signUnForm = reactive({
    userName:'',
    password:'',
    email:'',
    phoneNumber:''
  })

  function SignUp(){
    if(signUnForm.userName && signUnForm.password && signUnForm.email && signUnForm.phoneNumber){
        console.log('Sign up start');
        

        axios.post('http://222.215.137.44:8084/register/', signUnForm)
        .then(function (response) {
            console.log(response);
            window.alert(response.data.message)
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

<template>
  <div>
     <div class = 'form-grid'>
    <el-form  :model="signUnForm" label-width="auto" style="max-width: 600px">
      <el-form-item label="邮箱" label-position="top" >
        <el-input type="email" v-model="signUnForm.email" />
      </el-form-item>

      <el-form-item label="用户名" label-position="top" >
        <el-input type="text" v-model="signUnForm.userName" />
      </el-form-item>

      <el-form-item label="手机号" label-position="top" >
        <el-input type="text" v-model="signUnForm.phoneNumber" />
      </el-form-item>

      <el-form-item label="密码" label-position="top">
        <el-input type = 'password' v-model ="signUnForm.password" /> 
      </el-form-item>

      <el-form-item>
        <el-button>
          取消
        </el-button>
        <el-button type = "primary" @click = "SignUp"> 
          注册
        </el-button>
        <RouterLink to  = '/sign-in'>
            注册完成？点此返回登录
        </RouterLink>
      </el-form-item>

    </el-form>
  </div>
  </div>
</template>
  
