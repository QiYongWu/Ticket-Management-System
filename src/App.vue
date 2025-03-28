<script lang="ts" setup name = "App">
    import Header from './components/Header.vue';
    import Main from './components/Main.vue';
    import Aside from './components/Aside.vue';
</script>
<template>
  <div class="common-layout">
    <el-container>
      
      <el-header height = "80px" class = 'el-header-container'>
        <Header />
      </el-header>

      <el-container>
        <el-aside width="200px" class = "el-aside-container">
            <Aside />
        </el-aside>

        <el-main class = "el-main-container">
            <Main />
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
  .el-header-container,.el-aside-container,.el-main-container{
    border:solid 1px black
  }
  .el-main-container{
    border-top:none;
    border-left:none;
    padding:0%
  }

  .el-aside-container{
    border-top:none;
    border-right: none;
   
  }

 
</style>
