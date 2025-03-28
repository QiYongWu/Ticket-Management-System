<script name = "ChangePassword" setup lang = 'ts'>
import axios from 'axios';
import { ref } from 'vue';

const oldPassword = ref('');
const newPassword = ref('');

function ChangePassword(){
    if(oldPassword.value && newPassword.value){
        console.log('change password start!');
        const userInfo = {
            "method":"user.changepassword",
            "params":{
            "old_password":oldPassword.value,
            "new_password": newPassword.value, 
            }
        }


        axios.post('http://222.215.137.44:8084/api_jsonrpc/', userInfo)
            .then(function (response) {
                console.log(`user-info:${userInfo}`)
                console.log(response);
                if(response.data.success){
                window.alert(`修改密码成功!  ${response.data.message}`)

                }
                else{
                    window.alert(`修改密码失败！ ${response.data.message}`)
                }
                })

                .catch(function (error) {
                    console.log(error);
                });
    }

    else{
        window.alert('请补全信息！')
    }
}

</script>

<template>
    <div class = 'input-grid'>
        <div class = "input-user-password-grid">
          <span>旧密码:</span>
          <el-input
          v-model="oldPassword"
          style="width: 240px"
          type="password"
          placeholder="请输入旧的密码"
          show-password
          />
        </div>

        <div class = "input-user-password-grid">
          <span>新密码:</span>
          <el-input
          v-model="newPassword"
          style="width: 240px"
          type="password"
          placeholder="请输入新的密码"
          show-password
          />
        </div>

      <el-button type = "primary" @click="ChangePassword">
          确认修改
      </el-button>
    </div>

</template>

<style scoped>
    .input-grid{
        display: flex;
        align-items: center;
        justify-content: center;
        gap:20px;
        flex-direction: column;
        width:400px;
        height:400px;
        border:solid 2px black;
    }
</style>