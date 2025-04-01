<script setup lang="ts" name="SearchTicket">
import { ref } from 'vue'
import { Search } from '@icon-park/vue-next'

const searchTicket = ref('')
const isFocus = ref(false)

function SearchTicket() {
  if (!searchTicket.value) {
    window.alert('请输入需要搜索的内容！')
  } else {
    console.log('search start')
    // 实际搜索逻辑
  }
}
</script>

<template>
  <div class="search-container" :class="{ focused: isFocus }">
    <div class="input-wrapper">
      <Search
        theme="filled"
        :size="20"
        :fill="isFocus ? '#6366f1' : '#94a3b8'"
        class="search-icon"
      />
      <input
        v-model="searchTicket"
        type="text"
        placeholder="搜索工单..."
        class="search-input"
        @focus="isFocus = true"
        @blur="isFocus = false"
        @keyup.enter="SearchTicket"
      />
      <button
        v-if="searchTicket"
        class="clear-btn"
        @click="searchTicket = ''"
      >
        &times;
      </button>
    </div>
    <button class="search-btn" @click="SearchTicket">
      <Search theme="filled" size="18" fill="#fff" />
    </button>
  </div>
</template>

<style scoped>
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