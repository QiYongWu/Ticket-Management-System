<script lang="ts" setup name = "Header">

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
    </div>
</template>

<style scoped>
    .header-grid{
        display:flex;
        align-items: center;
        gap:30px;
    }
</style>
