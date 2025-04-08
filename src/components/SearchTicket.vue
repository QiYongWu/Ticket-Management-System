<script setup lang="ts" name="SearchTicket">
import axios from 'axios'
import { onMounted, onUnmounted, reactive, ref,watch } from 'vue'
import { Search } from '@icon-park/vue-next'
import ShowTickets from './ShowTickets.vue';
const id = ref('');
const searchTicket = ref('')
const isFocus = ref(false)
const dates = ref('')
let searchResult = reactive([])
let isSearchTickets = ref(false)

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const defaultStartDate = '2025-04-01';
const defaultEndDate =formatDate(new Date());

onMounted(() =>{
  axios.post('http://222.215.137.44:8084/api_jsonrpc/',
  {
    "method":"ticket.list",
    "params":{
       "start_time": defaultStartDate,
       "end_time" : defaultEndDate
    }
})
  .then((res) =>{
    if(searchResult.length !== 0){
        isSearchTickets.value = false;
        searchResult = [];
      }
    const resultObj = JSON.parse(res.data.result);
    console.log(...resultObj);
    if(resultObj.length !== 0){
      searchResult = resultObj;
      isSearchTickets.value = true
      console.log(res.data.result)
    }

    else{
      isSearchTickets.value = false;
      searchResult = [];
    }

  })
})

function HandleSearch() {
  const [start_time, end_time] = dates.value
  // 将日期格式化为 "YYYY-MM-DD"
  const formattedStartTime = formatDate(start_time)
  const formattedEndTime = formatDate(end_time)
  console.log(formattedStartTime, formattedEndTime);
  const data = {
    "method":"ticket.list",
    "params":{
       "start_time":formattedStartTime,
       "end_time" : formattedEndTime
    }
}
console.log(data);
  axios.post('http://222.215.137.44:8084/api_jsonrpc/',data)
  .then((res) =>{

    if(searchResult.length !== 0){
        isSearchTickets.value = false;
        searchResult = [];
      }
    const resultObj = JSON.parse(res.data.result);
    console.log(...resultObj);
    if(resultObj.length !== 0){
      searchResult = resultObj;
      isSearchTickets.value = true
      console.log(res.data.result)
    }

    else{
      isSearchTickets.value = false;
      searchResult = [];
    }

   
    
  })
}


function SearchTicketAttachmentById(){
  if(id.value){
    const data = {
      "method":"files.list",
      "params":{
        feelec_template_id:id.value
      }
    }
    axios.post('http://222.215.137.44:8084/api_jsonrpc/',data)
    .then((res) =>{
      console.log(res)
      if(searchResult.length !== 0){
        isSearchTickets.value = false;
        searchResult = [];
      }
     const result = JSON.parse(res.data.result);
     if(result.length !== 0){
       searchResult = result;
       isSearchTickets.value = true;
     }
      console.log(...result)
    })
    .catch((err) =>{
      window.alert('系统发生错误！')
    })
  }
}
</script>

<template>

  <div class = 'search-container'>

    <div class="demo-date-picker">
      <div class="block">
        <el-date-picker
          v-model="dates"
          type="daterange"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :default-value="[new Date(2025, 4, 1), new Date(2025, 4, 7)]"
          unlink-panels="true"

        />
        <el-button type="primary" @click="HandleSearch">搜索工单</el-button>
      </div>
    </div>

  <div class="search-container" :class="{ focused: isFocus }">
    <div class="input-wrapper">
      <Search
        theme="filled"
        :size="20"
        :fill="isFocus ? '#6366f1' : '#94a3b8'"
        class="search-icon"
      />
      <input
        v-model="id"
        type="text"
        placeholder="请输入需要搜索的工单的附件的id"
        class="search-input"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @keyup.enter="SearchTicketAttachmentById"
      />
      <button
        v-if="searchTicket"
        class="clear-btn"
        @click="SearchTicketAttachmentById"
      >
        &times;
      </button>
    </div>
    <button class="search-btn" @click="SearchTicketAttachmentById">
      <Search theme="filled" size="18" fill="#fff" />
    </button>
  </div>

  </div>

  

  <div class ="search-result-container">
    <ShowTickets :showTickets = "searchResult" v-if="isSearchTickets" />
  </div>

</template>

<style scoped>
.search-container{
  display:flex;
  gap : 20px;
  padding:10px;
}

/* 样式代码保持不变 */
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.search-container {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 
    0 2px 6px rgba(0, 0, 0, 0.05),
    inset 0 0 0 1px rgba(203, 213, 225, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &.focused {
    box-shadow: 
      0 4px 12px rgba(99, 102, 241, 0.15),
      inset 0 0 0 1px #6366f1;
  }
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 1rem;
}

.search-icon {
  margin-right: 0.8rem;
  transition: all 0.3s ease;
}

.search-input {
  width: 280px;
  height: 44px;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  color: #1e293b;
  outline: none;
  
  &::placeholder {
    color: #94a3b8;
  }
}

.clear-btn {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: #6366f1;
    transform: scale(1.1);
  }
}

.search-btn {
  height: 44px;
  width: 44px;
  border: none;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  border-radius: 0 12px 12px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateX(2px);
  }
  
  &:active {
    transform: scale(0.98);
  }
}

@media (max-width: 768px) {
  .search-input {
    width: 200px;
  }
  
  .search-container {
    width: 100%;
    max-width: 400px;
  }
}
</style>
