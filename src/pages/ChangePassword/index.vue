<script name="ChangePassword" setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const oldPassword = ref('');
const newPassword = ref('');
const isLoading = ref(false);

function ChangePassword() {
    isLoading.value = true;
    const userInfo = {
      "method":"user.changepassword",
      "params":{
        "old_password":oldPassword.value,
        "new_password":newPassword.value,
      }
    }

    axios.post('http://222.215.137.44:8084/api_jsonrpc/', userInfo)
    .then((res) => {
      window.alert(res.data.message);
      if(res.data.message == '密码修改成功！'){
        isLoading.value = true
      }
    })
  
}
</script>

<template>
  <div class="auth-container">
    <div class="form-wrapper">
      <h1 class="form-title">修改密码</h1>
      
      <div class="password-form">
        <div class="input-group">
          <label class="input-label">旧密码</label>
          <el-input
            v-model="oldPassword"
            type="password"
            placeholder="请输入当前密码"
            show-password
            class="modern-input"
          />
        </div>

        <div class="input-group">
          <label class="input-label">新密码</label>
          <el-input
            v-model="newPassword"
            type="password"
            placeholder="至少8位字符，建议包含特殊字符"
            show-password
            class="modern-input"
          />
          <div class="password-tips">
            <span v-if="newPassword.length > 0 && newPassword.length < 8" class="tip-danger">密码强度不足</span>
            <span v-else-if="newPassword.length >= 8" class="tip-success">有效密码长度</span>
          </div>
        </div>

        <el-button 
          type="primary" 
          class="submit-btn"
          :loading="isLoading"
          @click="ChangePassword"
        >
          {{ isLoading ? '正在修改...' : '确认修改' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.password-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-group {
  margin-bottom: 2rem;
  position: relative;
}

.input-label {
  display: block;
  font-size: 0.95rem;
  color: #4a5568;
  font-weight: 500;
  margin-bottom: 0.8rem;
  padding-left: 0.5rem;
}

.modern-input {
  :deep(.el-input__wrapper) {
    background: rgba(247, 250, 252, 0.9);
    border-radius: 12px;
    padding: 0.9rem 1.2rem;
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.05),
      inset 0 0 0 1px rgba(203, 213, 225, 0.3);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 
        0 4px 8px rgba(0, 0, 0, 0.08),
        inset 0 0 0 1px rgba(102, 126, 234, 0.4);
    }

    &.is-focus {
      box-shadow: 
        0 0 0 3px rgba(102, 126, 234, 0.15),
        inset 0 0 0 1px #667eea;
    }
  }
}

.password-tips {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  padding-left: 0.5rem;

  .tip-danger {
    color: #fc8181;
    display: flex;
    align-items: center;
    
    &::before {
      content: "⚠️";
      margin-right: 0.5rem;
    }
  }

  .tip-success {
    color: #68d391;
    display: flex;
    align-items: center;
    
    &::before {
      content: "✅";
      margin-right: 0.5rem;
    }
  }
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: 
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.35);
  }

  &:active {
    transform: translateY(1px);
  }
}

/* 复用全局样式 */
.auth-container { /* 与登录注册页面相同 */ }
.form-wrapper { /* 与登录注册页面相同 */ }
.form-title { /* 与登录注册页面相同 */ }

@media (max-width: 480px) {
  .password-form {
    padding: 0 1rem;
  }
  
  .input-group {
    margin-bottom: 1.5rem;
  }
}
</style>