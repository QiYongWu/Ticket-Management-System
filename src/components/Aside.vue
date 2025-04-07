<script lang="ts" setup name = "Aside">

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// 在 script 标签内添加子菜单数据
const myTicketsItems = [
  { path: '/my-tickets/my-posting', title: '我的发布' },
  { path: '/my-tickets/my-processing', title: '我的处理' },
  { path: '/my-tickets/my-to-be-collaborated', title: '待回复的' },
  { path: '/my-tickets/my-wait-reply', title: '待协作的' }
]
</script>

<template>
  <el-row class="tac">
      <el-menu
        :router="true"
        active-text-color="#fff"
        background-color="rgba(255, 255, 255, 0.05)"
        class="modern-sidebar"
        text-color="rgba(255, 255, 255, 0.7)"
        :default-openeds="['/my-tickets']"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/home" class="menu-item">
          <el-icon class="menu-icon"><icon-menu /></el-icon>
          <span>所有工单</span>
          <div class="active-indicator"></div>
        </el-menu-item>

        <el-sub-menu index="/my-tickets" class="sub-menu">
          <template #title>
            <el-icon class="menu-icon"><location /></el-icon>
            <span>我的工单</span>
            <div class="submenu-decorator"></div>
          </template>
          <el-menu-item 
            v-for="item in myTicketsItems"
            :key="item.path"
            :index="item.path"
            class="sub-menu-item"
          >
            {{ item.title }}
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/set" class="menu-item">
          <el-icon class="menu-icon"><setting /></el-icon>
          <span>系统设置</span>
          <div class="active-indicator"></div>
        </el-menu-item>
      </el-menu>
  
  </el-row>
</template>

<style scoped>
.modern-sidebar {
  height: 85vh;
  backdrop-filter: blur(10px);
  background: linear-gradient(
    135deg,
    rgba(46, 52, 64, 0.95) 0%,
    rgba(36, 41, 51, 0.95) 100%
  ) !important;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-header {
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

.menu-item {
  position: relative;
  margin: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease !important;
  
  &:hover {
    background: rgba(136, 192, 208, 0.15) !important;
    
    .menu-icon {
      transform: scale(1.1);
      color: #88c0d0 !important;
    }
    
    .active-indicator {
      opacity: 0.3;
    }
  }
  
  &.is-active {
    background: rgba(94, 129, 172, 0.2) !important;
    
    .active-indicator {
      opacity: 1;
    }
    
    span {
      color: #fff !important;
      font-weight: 500;
    }
    
    .menu-icon {
      color: #88c0d0 !important;
    }
  }
}

.menu-icon {
  color: rgba(255, 255, 255, 0.7) !important;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  margin-right: 0.8rem;
}

.active-indicator {
  position: absolute;
  right: -1rem;
  height: 100%;
  width: 3px;
  background: #88c0d0;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sub-menu {
  margin: 0.5rem 1rem;
  border-radius: 8px;
  
  :deep(.el-sub-menu__title) {
    transition: all 0.3s ease !important;
    
    &:hover {
      background: rgba(136, 192, 208, 0.1) !important;
      
      .menu-icon {
        transform: scale(1.1);
        color: #88c0d0 !important;
      }
    }
  }
}

.sub-menu-item {
  margin: 0.25rem 0;
  padding-left: 3rem !important;
  position: relative;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.6) !important;
  
  &::before {
    content: '';
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: #fff !important;
    padding-left: 3.5rem !important;
    
    &::before {
      background: #88c0d0;
      width: 8px;
      height: 8px;
    }
  }
  
  &.is-active {
    color: #88c0d0 !important;
    background: rgba(136, 192, 208, 0.1) !important;
    
    &::before {
      background: #88c0d0;
    }
  }
}

.submenu-decorator {
  position: absolute;
  right: 1rem;
  width: 8px;
  height: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.el-sub-menu.is-opened .submenu-decorator {
  border-color: #88c0d0;
  background: #88c0d0;
}

@media (max-width: 768px) {
  .modern-sidebar {
    width: 60px;
    
    span {
      display: none;
    }
    
    .el-sub-menu__icon-arrow {
      display: none;
    }
    
    .sidebar-header h3 {
      font-size: 0;
      &::before {
        content: "🚀";
        font-size: 1.5rem;
      }
    }
  }
  
  .menu-item {
    margin: 0.5rem;
    justify-content: center;
  }
  
  .menu-icon {
    margin-right: 0;
  }
}
</style>
