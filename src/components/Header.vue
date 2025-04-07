<script lang="ts" setup name="Header">
import { useRouter } from 'vue-router'
import { MagicStick, Plus, User } from '@element-plus/icons-vue'

const router = useRouter()

function CreatedNewTicket() {
  router.push('/input-ticket')
}
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <!-- 左侧品牌区 -->
      <div class="brand" @click="router.push('/home')">
        <el-icon class="logo-icon"><MagicStick /></el-icon>
        <h1 class="title">工单管理系统</h1>
      </div>

      <!-- 右侧操作区 -->
      <div class="action-group">
        <el-button 
          type="primary" 
          class="new-ticket-btn"
          @click="CreatedNewTicket"
        >
          <el-icon><Plus /></el-icon>
          <span>新建工单</span>
        </el-button>

        <el-dropdown class="user-menu">
          <el-button class="user-btn" circle>
            <el-icon><User /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu class="dropdown-menu">
              <el-dropdown-item @click="router.push('/sign-in')">
                <span class="menu-item">登录账户</span>
              </el-dropdown-item>
              <el-dropdown-item @click="router.push('/sign-up')">
                <span class="menu-item">注册账户</span>
              </el-dropdown-item>
              <el-dropdown-item divided @click="router.push('/change-password')">
                <span class="menu-item">修改密码</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 64px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateX(2px);
  }
}

.logo-icon {
  font-size: 1.8rem;
  color: #6366f1;
}

.title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.action-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.new-ticket-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border: none;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.25);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  .el-icon {
    margin-right: 0.5rem;
  }
}

.user-btn {
  padding: 0.8rem;
  border: none;
  background: rgba(99, 102, 241, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(99, 102, 241, 0.2);
    transform: rotate(15deg);
  }
  
  .el-icon {
    color: #6366f1;
    font-size: 1.2rem;
  }
}

.dropdown-menu {
  border: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 0.5rem;
  
  .menu-item {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(99, 102, 241, 0.05);
      color: #6366f1;
    }
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 1rem;
  }
  
  .title {
    font-size: 1.2rem;
  }
  
  .new-ticket-btn span {
    display: none;
  }
  
  .new-ticket-btn .el-icon {
    margin-right: 0;
  }
}
</style>