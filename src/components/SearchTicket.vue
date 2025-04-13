<script setup lang="ts" name="SearchTicket">
import { onMounted, reactive, ref } from 'vue'
import ShowTickets from './ShowTickets.vue'
import { router } from '@/router/index'

import {handleApiRequest} from '@/utils/request'
import { ElMessage } from 'element-plus'
import { useTicketsInfoStore,useDateStore } from '@/store'



// 响应式数据
const isSearchTickets = ref(false); 

// 初始化加载
onMounted(() => {
  if (router.currentRoute.value.path === '/home') {
    HandleSearch();
  }
})

// 工单搜索
const HandleSearch = async () => {
  try {
    const [startDate, endDate] =useDateStore().dates
    const result = await handleApiRequest('ticket.list', {
      start_time: startDate,
      end_time: endDate
    })
    
    if (result?.length) {
      useTicketsInfoStore().tickets = result
      isSearchTickets.value = true
      ElMessage.success(`找到 ${result.length} 条工单记录`);
      useTicketsInfoStore().tickets.forEach((TicketInfo) =>{
      SearchTicketAttachmentById(TicketInfo.feelec_template_id)
      })

    } else {
      isSearchTickets.value = false
      ElMessage.info('当前时间段没有工单记录')
    }
  } catch {
    isSearchTickets.value = false
  }
}

// 附件搜索
const SearchTicketAttachmentById = async (id:number) => {
  try {
    const result = await handleApiRequest('files.list', {
      feelec_template_id: id
    })
    useTicketsInfoStore().ticketsAttachments.push(result);
  } catch {
    isSearchTickets.value = false
  }
}

</script>

<template>

  <div class="search-wrapper">
    <div class="date-search-container">
      <div class="date-picker-container">
        <el-date-picker
          v-model="useDateStore().dates"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
        />

        <el-button 
          type="primary" 
          @click="HandleSearch"
          :disabled="useDateStore().dates.length !==2">
          搜索工单
        </el-button>
      </div>
      </div>
    </div>

    <div class="search-results">
      <ShowTickets 
        v-if="isSearchTickets"
      />

      <div v-else class="empty-state">
        <p>暂无搜索结果，请尝试其他条件</p>
      </div>
    </div>
  
</template>

<style scoped lang="scss">
.search-wrapper {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.date-search-container {
  display: grid;
  gap: 24px;
  margin-bottom: 32px;
}

.date-picker-container {
  display: flex;
  gap: 16px;
  align-items: center;
  
  .el-date-editor {
    flex: 1;
    max-width: 400px;
  }
}

.id-search-container {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05), 
              inset 0 0 0 1px rgba(203, 213, 225, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 600px;

  &.focused {
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15),
                inset 0 0 0 1px #6366f1;
  }
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 16px;
  flex: 1;
}

.search-input {
  width: 100%;
  height: 48px;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #1e293b;
  outline: none;
  padding-left: 32px;

  &::placeholder {
    color: #94a3b8;
  }
}

.search-icon {
  position: absolute;
  left: 12px;
  transition: all 0.3s ease;
}

.search-btn {
  height: 48px;
  width: 60px;
  border: none;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border-radius: 0 12px 12px 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.search-results {
  margin-top: 24px;
  min-height: 300px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #94a3b8;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .date-picker-container {
    flex-direction: column;
    
    .el-date-editor {
      width: 100%;
    }
  }

  .id-search-container {
    flex-direction: column;
    background: none;
    box-shadow: none;
    border: none;

    .input-wrapper {
      width: 100%;
      background: white;
      border-radius: 8px;
    }

    .search-btn {
      width: 100%;
      border-radius: 8px;
      margin-top: 12px;
    }
  }
}
</style>