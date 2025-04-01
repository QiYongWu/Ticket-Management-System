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


<template>
  <div class="auth-container">
    <div class="form-wrapper">
      <h1 class="form-title">欢迎登录</h1>
      <el-form :model="signInForm" label-width="auto" class="modern-form">
        <el-form-item label="用户名" label-position="top">
          <el-input 
            type="text" 
            v-model="signInForm.userName"
            placeholder="请输入用户名"
            class="custom-input"
          />
        </el-form-item>

        <el-form-item label="密码" label-position="top">
          <el-input
            type="password"
            v-model="signInForm.password"
            placeholder="请输入密码"
            class="custom-input"
            show-password
          />
        </el-form-item>

        <el-form-item class="action-btns">
          <el-button class="cancel-btn">取消</el-button>
          <el-button 
            type="primary" 
            @click="SignIn"
            class="submit-btn"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="additional-actions">
        <a href="#" class="forgot-password">忘记密码？</a>
        <span class="divider">|</span>
        <RouterLink to="/sign-up" class="sign-up">注册账号</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 75.5vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.form-wrapper {
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  transform: translateY(0);
  animation: formEntrance 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.form-title {
  text-align: center;
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 2rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.modern-form {
  .el-form-item {
    margin-bottom: 1.8rem;
    
    :deep(.el-form-item__label) {
      font-weight: 500;
      color: #4a5568;
      font-size: 0.95rem;
      padding-bottom: 0.5rem;
    }
  }
}

.custom-input {
  :deep(.el-input__wrapper) {
    background: #f7fafc;
    border-radius: 8px;
    padding: 0.8rem 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
    
    &.is-focus {
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    }
  }
}

.action-btns {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  
  .el-form-item__content {
    justify-content: flex-end;
  }
}

.submit-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 8px;
  padding: 0.8rem 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.cancel-btn {
  border: 1px solid #cbd5e0;
  color: #718096;
  border-radius: 8px;
  padding: 0.8rem 2rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f7fafc;
    color: #434190;
  }
}

.additional-actions {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #718096;
  
  a {
    color: #667eea;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: #764ba2;
      text-decoration: underline;
    }
  }
  
  .divider {
    margin: 0 0.8rem;
    opacity: 0.4;
  }
}

@keyframes formEntrance {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .form-wrapper {
    padding: 1.5rem;
    width: 90%;
  }
}
</style>


