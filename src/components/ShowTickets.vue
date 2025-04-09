<script lang="ts" setup name="ShowTickets">
import { computed, onMounted, ref } from 'vue'
import { formatDateTime, formatDuration } from '@/utils/date' // 建议抽离时间处理工具

interface Ticket {
  feelec_template_id: string
  WorkOrderHeading: string
  contact_person: string
  pubdate: string
  Priority: number
  WorkOrderContent: string
  contact_number: string
  processor?: string
  status?: number
}

const props = defineProps<{
  showTickets: Ticket[]
}>()

// 为每个工单维护独立的抽屉状态
const drawerStates = ref<{ [key: string]: boolean }>({})

// 处理人显示逻辑
const processors = computed(() => (ticket: Ticket) => {
  return ticket.processor || '暂无'
})

// 工单分配状态
const assignmentStatus = computed(() => (ticket: Ticket) => {
  return ticket.status === undefined ? '未分配' : ['待分配', '处理中', '已完成'][ticket.status] || '未知状态'
})

// 动态计算步骤进度
const stepActive = (ticket: Ticket) => {
  return ticket.status !== undefined ? ticket.status + 1 : 0
}

// 切换抽屉状态
const toggleDrawer = (ticket: Ticket) => {
  drawerStates.value[ticket.feelec_template_id] = !drawerStates.value[ticket.feelec_template_id]
}

// 安全解析日期
const safeParseDate = (dateString: string) => {
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? new Date() : date
}
</script>

<template>
  <div class="tickets-container">
    <el-divider />
    <div 
      v-for="ticket in showTickets" 
      :key="ticket.feelec_template_id"
      class="ticket-item"
    >
      <el-descriptions border>
        <el-descriptions-item label="分配状态">
          <el-button 
            type="primary" 
            @click="toggleDrawer(ticket)"
          >
            {{ assignmentStatus(ticket) }}
          </el-button>
        </el-descriptions-item>

        <el-descriptions-item label="标题">
          <strong>{{ ticket.WorkOrderHeading }}</strong>
        </el-descriptions-item>

        <el-descriptions-item label="发布时间">
         {{ ticket.contact_person }}  {{ formatDateTime(safeParseDate(ticket.pubdate)) }}
        </el-descriptions-item>

        <el-descriptions-item label="处理人">
          {{ processors(ticket) }}
        </el-descriptions-item>

        <el-descriptions-item label="优先级">
          <el-tag :type="[
            'danger',    // 紧急
            'warning',   // 高
            'primary',  // 一般
            'info'       // 低
          ][ticket.Priority]">
            {{
              ['紧急', '高', '一般', '低'][ticket.Priority] || '未知'
            }}
          </el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="已耗时">
          {{ formatDuration(Date.now() - safeParseDate(ticket.pubdate).getTime()) }}
        </el-descriptions-item>
      </el-descriptions>

      <!--抽屉-->
      <el-drawer 
        v-model="drawerStates[ticket.feelec_template_id]" 
        :title="ticket.WorkOrderHeading"
        size="40%"
      >
        <div class="drawer-content">
          <el-descriptions border column={2}>
            <el-descriptions-item label="优先级">
              <el-tag :type="[
                'danger', 'warning', 'primary', 'info'
              ][ticket.Priority]">
                {{ ['紧急', '高', '一般', '低'][ticket.Priority] || '未知' }}
              </el-tag>
            </el-descriptions-item>

            <el-descriptions-item label="当前状态">
              {{ assignmentStatus(ticket) }}
            </el-descriptions-item>

            <el-descriptions-item label="联系人" span={2}>
              {{ ticket.contact_person }} ({{ ticket.contact_number }})
            </el-descriptions-item>

            <el-descriptions-item label="处理进度" span={2}>
              <el-steps 
                :active="stepActive(ticket)" 
                simple
                class="progress-steps"
              >
                <el-step title="待分配" />
                <el-step title="处理中" />
                <el-step title="已完成" />
              </el-steps>
            </el-descriptions-item>

            <el-descriptions-item label="工单内容" span={2}>
              <div class="content-box">
                 ticket.WorkOrderContent
              </div>
            </el-descriptions-item>
            
          </el-descriptions>

          <div class="action-buttons">
            <el-button type="primary">分配处理人</el-button>
            <el-button>上传附件</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<style scoped>
.tickets-container {
  margin: 20px;
}

.ticket-item {
  margin: 15px 0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.progress-steps {
  margin: 20px 0;
}

.content-box {
  padding: 15px;
  background: #f8f8f8;
  border-radius: 4px;
  line-height: 1.6;
}

.action-buttons {
  margin-top: 20px;
  text-align: right;
}

.drawer-content {
  padding: 20px;
}
</style>