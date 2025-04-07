<script lang="ts" name="SignUp" setup>
import { reactive,ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)

const signUpForm = reactive({
  username: '',
  password: '',
  email: '',
  phone_number: ''
})

// 密码强度验证
const passwordStrength = ref(0)
const checkPasswordStrength = () => {
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{8,}$/

  if (strongRegex.test(signUpForm.password)) {
    passwordStrength.value = 3
  } else if (mediumRegex.test(signUpForm.password)) {
    passwordStrength.value = 2
  } else {
    passwordStrength.value = signUpForm.password.length > 0 ? 1 : 0
  }
}

const validatePhone = (rule: any, value: string, callback: any) => {
  if (!/^1[3-9]\d{9}$/.test(value)) {
    callback(new Error('请输入有效的手机号码'))
  } else {
    callback()
  }
}

const formRules = reactive({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
  ],
  phoneNumber: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码长度至少8位', trigger: 'blur' }
  ]
})

async function SignUp() {
  try {
    isLoading.value = true
    const response = await axios.post('http://222.215.137.44:8084/register/', signUpForm)
    
    window.alert(response.data.message);
    if(response.data.success) {
      router.push('/sign-in')
    }
  } catch (error) {
    console.error('注册失败:', error)
    window.alert('注册失败，请稍后重试')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="form-wrapper">
      <h1 class="form-title">加入我们</h1>
      
      <el-form 
        :model="signUpForm" 
        :rules="formRules"
        label-width="auto" 
        class="modern-form"
        @submit.prevent="SignUp"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="signUpForm.username"
            placeholder="设置您的唯一标识"
            class="custom-input"
            clearable
          />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="signUpForm.email"
            type="email"
            placeholder="name@example.com"
            class="custom-input"
            clearable
          />
        </el-form-item>

        <el-form-item label="手机号" prop="phoneNumber">
          <el-input
            v-model="signUpForm.phone_number"
            placeholder="13812345678"
            class="custom-input"
            clearable
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="signUpForm.password"
            type="password"
            placeholder="至少8位字符"
            show-password
            class="custom-input"
            @input="checkPasswordStrength"
          />
          <div class="password-strength">
            <div 
              :class="['strength-bar', { 
                active: passwordStrength >= 1,
                medium: passwordStrength >= 2,
                strong: passwordStrength >= 3
              }]"
            />
            <div class="strength-text">
              {{ ['弱', '中', '强'][passwordStrength - 1] || '密码强度' }}
            </div>
          </div>
        </el-form-item>

        <el-form-item class="action-btns">
          <el-button 
            class="cancel-btn"
            @click="router.push('/sign-in')"
          >
            返回登录
          </el-button>
          <el-button 
            type="primary" 
            native-type="submit"
            class="submit-btn"
            :loading="isLoading"
          >
            {{ isLoading ? '注册中...' : '立即注册' }}
          </el-button>
        </el-form-item>
      </el-form>

      <div class="agreement">
        点击注册即表示同意
        <a href="/terms" class="link">服务条款</a>
        和
        <a href="/privacy" class="link">隐私政策</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 基础容器样式优化 */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 65vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.auth-container::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: linear-gradient(180deg, rgba(104, 211, 145, 0.15) 0%, transparent 100%);
  border-radius: 50%;
  top: -20%;
  right: -10%;
  pointer-events: none;
}

.form-wrapper {
  background: rgba(255, 255, 255, 0.98);
  padding: 2.5rem 3rem;
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 480px;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transform: translateY(0);
  animation: formFloat 6s ease-in-out infinite;
}

.form-title {
  text-align: center;
  font-size: 2.2rem;
  color: #2d3748;
  margin-bottom: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  position: relative;
  display: inline-block;
  width: 100%;
}

.form-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  margin: 1rem auto 0;
  border-radius: 2px;
}

/* 输入框高级样式 */
.custom-input {
  :deep(.el-input__wrapper) {
    background: rgba(247, 250, 252, 0.9);
    border-radius: 12px;
    padding: 0.9rem 1.2rem;
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.05),
      inset 0 0 0 1px rgba(203, 213, 225, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      box-shadow: 
        0 4px 8px rgba(0, 0, 0, 0.08),
        inset 0 0 0 1px rgba(102, 126, 234, 0.4);
    }
    
    &.is-focus {
      box-shadow: 
        0 0 0 3px rgba(102, 126, 234, 0.15),
        inset 0 0 0 1px #667eea;
      animation: inputGlow 1.5s ease-in-out infinite alternate;
    }
  }
}

/* 密码强度条升级 */
.password-strength {
  margin-top: 0.8rem;
  
  .strength-bar {
    height: 6px;
    border-radius: 3px;
    background: #e2e8f0;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: calc(33.33% * var(--strength, 0));
      background: #fc8181;
      transition: all 0.4s ease;
      border-radius: 3px;
    }

    &.medium::after {
      width: 66.66%;
      background: #f6ad55;
    }

    &.strong::after {
      width: 100%;
      background: #68d391;
    }
  }

  .strength-text {
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    
    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 0.5rem;
      background: currentColor;
    }
  }

  [class*="active"] .strength-text { color: #fc8181; }
  [class*="medium"] .strength-text { color: #f6ad55; }
  [class*="strong"] .strength-text { color: #68d391; }
}

/* 按钮特效升级 */
.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 1rem 2.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  transition: 
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 25%,
      rgba(255,255,255,0.1) 50%,
      transparent 75%
    );
    animation: shine 3s infinite;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px rgba(102, 126, 234, 0.35),
      0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(1px);
  }
}

.cancel-btn {
  border: 1px solid rgba(203, 213, 225, 0.6);
  background: rgba(247, 250, 252, 0.8);
  color: #4a5568;
  border-radius: 12px;
  padding: 1rem 2rem;
  transition: 
    all 0.3s ease,
    backdrop-filter 0.3s ease;

  &:hover {
    background: rgba(237, 242, 247, 0.9);
    border-color: #c3dafe;
    color: #434190;
    backdrop-filter: blur(4px);
  }
}

/* 协议条款美化 */
.agreement {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(203, 213, 225, 0.3);
  
  .link {
    position: relative;
    padding-bottom: 2px;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 1px;
      background: currentColor;
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
}



/* 移动端优化 */
@media (max-width: 480px) {
  .form-wrapper {
    padding: 1.8rem;
    border-radius: 16px;
  }
  
  .form-title {
    font-size: 1.8rem;
    
    &::after {
      width: 40px;
    }
  }
  
  .custom-input :deep(.el-input__wrapper) {
    padding: 0.8rem 1rem;
  }
}
</style>