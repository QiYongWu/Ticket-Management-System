<script lang = 'ts' setup name = "ShowTickets">
import { onMounted } from 'vue';

//用于展示工单
const showTickets = defineProps(['showTickets']);

onMounted(()=>{
    console.log('显示数据组件挂载')
    console.log(showTickets.showTickets);
})


</script>

<template>
    <div class = "all-tickeets-container" v-for="ticket in showTickets.showTickets" key = 'ticket.feelec_template_id'>
      <el-descriptions title="工单信息">
            <el-descriptions-item>
                {{ ticket.WorkOrderHeading }}
            </el-descriptions-item>

            <el-button>
                未分配
            </el-button>
            <el-descriptions-item label="处理人">
                {{ ticket.contact_person }}
            </el-descriptions-item>
            <el-descriptions-item label="优先级">
                {{ ticket.Priority }}
            </el-descriptions-item>
            <el-descriptions-item label="已耗时">
                {{ ticket.contact_person }}
            </el-descriptions-item>
       </el-descriptions>
    </div>
  </template>