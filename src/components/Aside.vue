<script lang="ts" setup name = "Aside">

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
    <el-row class="tac">

      <el-col>

        <el-menu
          :router = "true"
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical"
          default-active="2"
          text-color="#fff"
          @open="handleOpen"
          @close="handleClose"
          
        >

            <el-menu-item index="/all-tickets">
                <el-icon><icon-menu /></el-icon>
                <span>所有工单</span>
            </el-menu-item>

            <el-sub-menu index="/my-tickets">
                <template #title>
                <el-icon><location /></el-icon>
                <span>我的工单</span>
                </template>
                <div class = 'select-items-container'>
                  <el-menu-item index="/my-tickets/my-posting">我的发布</el-menu-item>
                  <el-menu-item index="/my-tickets/my-processing">我的处理</el-menu-item>
                  <el-menu-item index="/my-tickets/my-to-be-collaborated">待回复的</el-menu-item>
                  <el-menu-item index="/my-tickets/my-wait-reply">待协作的</el-menu-item>
                </div>
                
            </el-sub-menu>

            
            <el-menu-item index="/set">
                <el-icon><setting /></el-icon>
                <span>设置</span>
            </el-menu-item>

        </el-menu>


      </el-col>

    </el-row>
  </template>


<style scoped>
  .select-items-container{
    margin-left:30px;
  }

</style>
  
