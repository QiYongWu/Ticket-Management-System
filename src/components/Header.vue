<script lang="ts" setup name = "Header">
    import {router} from '@/router/index.ts'

    function CreatedNewTicket(){
        console.log('created!')
    }
</script>
<template>
    <div class = 'header-grid'>
        <h1 class="title" @click="">
        工单管理系统 
        </h1>

        <el-button type = "primary" @click = "CreatedNewTicket">
            新建工单
        </el-button>

        <el-button type = "primary" @click = "router.push('/sign-in')">
            登录
        </el-button>

        <el-button type = "primary" @click = "router.push('/sign-up')">
            注册
        </el-button>


        <el-button type = "primary" @click = "router.push('/change-password')">
            修改密码
        </el-button>

    </div>
</template>

<style scoped>
    .header-grid{
        display:flex;
        align-items: center;
        gap:30px;
    }
</style>
