<script lang="ts" name="UploadAttachments" setup>
import axios from 'axios';
import { Close } from '@icon-park/vue-next';
import { ref } from 'vue';
import { ElMessage, ElProgress } from 'element-plus';
import { useTicketIDStore } from '@/store';

interface UploadFile {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
}

const files = ref<UploadFile[]>([]);
const isUploading = ref(false);

// 处理文件选择
const handleFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const newFiles = Array.from(input.files || []);
  
  // 过滤重复文件
  const existingNames = files.value.map(f => f.file.name);
  const uniqueFiles = newFiles.filter(f => !existingNames.includes(f.name));

  // 添加新文件到上传队列
  files.value = [
    ...files.value,
    ...uniqueFiles.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const
    }))
  ];

  input.value = ''; // 清空选择器
};

// 上传所有文件
const uploadFiles = async () => {
  if (files.value.length === 0) {
    ElMessage.warning('请先选择文件');
    return;
  }

  isUploading.value = true;
  // const ticketId = useTicketIDStore().ticketId;
  const ticketId = localStorage.getItem('ticketId') || ''

  try {
    await Promise.all(files.value.map(async (item, index) => {
      if (item.status !== 'pending') return;

      const formData = new FormData();
      formData.append('file', item.file);
      formData.append('feelec_template_id', ticketId.toString());

      files.value[index].status = 'uploading';
      
      await axios.post(
        'http://222.215.137.44:8084/ticket/upload_files/',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: progressEvent => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            files.value[index].progress = progress;
          }
        }
      );

      files.value[index].status = 'success';
    }));

    ElMessage.success('所有文件上传完成');
    files.value = [];
  } catch (err) {
    ElMessage.error('部分文件上传失败');
    files.value = files.value.map(f => 
      f.status === 'uploading' ? {...f, status: 'error'} : f
    );
  } finally {
    isUploading.value = false;
  }
};

// 移除文件
const removeFile = (index: number) => {
  files.value.splice(index, 1);
};
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-grid">
        <h1>上传附件</h1>
        <RouterLink to="/input-ticket">
          <close theme="outline" size="24" fill="#333"/>
        </RouterLink>
      </el-header>

      <el-main>
        <!-- 文件选择 -->
        <div class="upload-area">
          <input 
            type="file"
            multiple
            @change="handleFileChange"
            class="file-input"
            :disabled="isUploading"
          >
          <div class="upload-hint">点击选择或拖拽文件到此区域</div>
        </div>

        <!-- 文件列表 -->
        <div class="file-list">
          <div 
            v-for="(item, index) in files"
            :key="index"
            class="file-item"
            :class="item.status"
          >
            <div class="file-info">
              <span class="filename">{{ item.file.name }}</span>
              <span class="file-size">
                ({{ (item.file.size / 1024 / 1024).toFixed(2) }} MB)
              </span>
            </div>

            <div class="progress-container">
              <el-progress 
                :percentage="item.progress"
                :status="item.status === 'error' ? 'exception' : undefined"
                :stroke-width="12"
              />
              <div class="file-actions">
                <el-button 
                  v-if="item.status === 'pending'"
                  @click="removeFile(index)"
                  type="danger"
                  size="small"
                  circle
                >
                  ×
                </el-button>
                <el-button 
                  v-if="item.status === 'error'"
                  @click="uploadFiles"
                  type="warning"
                  size="small"
                >
                  重试
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <el-button 
          type="primary" 
          @click="uploadFiles"
          :loading="isUploading"
          :disabled="files.length === 0"
        >
          {{ isUploading ? '上传中...' : '开始上传' }}
        </el-button>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.header-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.upload-area {
  position: relative;
  margin-bottom: 20px;
  border: 2px dashed #dcdfe6;
  border-radius: 6px;
  padding: 20px;
  text-align: center;
  transition: border-color 0.3s;

  &:hover {
    border-color: #409eff;
  }
}

.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-hint {
  color: #909399;
  font-size: 14px;
}

.file-list {
  margin: 20px 0;
  max-height: 400px;
  overflow-y: auto;
}

.file-item {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  transition: all 0.3s;

  &.error {
    border-color: #f56c6c;
    background: #fef0f0;
  }
}

.file-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.filename {
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-actions {
  display: flex;
  gap: 8px;
  margin-left: 10px;
}

:deep(.el-progress) {
  flex: 1;
}
</style>