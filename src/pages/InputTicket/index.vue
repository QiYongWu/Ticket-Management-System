<script lang="ts" name="InputTicket" setup>
import { QuillEditor } from '@vueup/vue-quill'; 
import '@vueup/vue-quill/dist/vue-quill.snow.css'; // 引入默认主题样式
import { UploadOne } from '@icon-park/vue-next';
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useTicketIDStore } from '@/store';
const ticketStore = useTicketIDStore();

const form = reactive({
  ticketId: 0,
  ticketTitle: '',
  ticketContent: '',
  ticketPriority: 2  // 0-紧急 1-高 2-一般 3-低
});

function generate10DigitId() {
  // 1. 取当前时间戳后 9 位（保证基础唯一性）
  const timestampPart = Date.now().toString().slice(-9);
  
  // 2. 生成 1 位随机数（0-9）
  const randomDigit = Math.floor(Math.random() * 10);
  
  // 3. 组合成 10 位数字
  return parseInt(timestampPart + randomDigit, 10);
}
// 示例输出：6837648923 (动态变化)

// 绑定 form 实例引用
const formRef = ref();

function onSubmit() {
  
  // 调用 validate 方法进行验证
  formRef.value.validate((valid: boolean) => {
    
    if (valid) {
      console.log('验证通过，正在提交');
      form.ticketId = generate10DigitId() // 生成唯一的10位ID
      ticketStore.ticketId = form.ticketId;
      localStorage.setItem('ticketId',form.ticketId.toString())
      axios.post(
      'http://222.215.137.44:8084/api_jsonrpc/',
      {   
        "method":"ticket.create",
        "params":{
            "feelec_template_id":form.ticketId,
            "WorkOrderHeading":form.ticketTitle,
            "WorkOrderContent":form.ticketContent,
            "Priority":form.ticketPriority
        }
    }
      )
      .then((response) =>{
        console.log(response);
      })
      .catch((error) =>{
        console.log(error)
      })
      .finally(()=>{
        console.log('end')
      })

    } else {
      console.log('验证失败，请检查输入项');
      return false;
    }
  });
}

function onCancel() {
  console.log('取消提交');
}

const editorOptions= {
        placeholder: '请输入内容', 
        theme: 'snow', // 使用 Snow 主题
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 粗体、斜体、下划线、删除线
            [{ 'header': 1 }, { 'header': 2 }], // H1 和 H2 标题
            ['blockquote'], // 引用
            ['image'], // 图片插入
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 有序和无序列表
            ['code-block'], // 代码块
            ['clean'], // 清除格式（类似图片中的垃圾桶图标）
          ],
        },
      }

</script>

<template>
  <el-form
   :model="form" ref="formRef" 
  label-width="80px" 
  class = 'el-form-grid'>
    <el-form-item 
      label="工单标题" 
      label-position = "top"
      prop="ticketTitle"
      :rules="[{ required: true, message: '请输入工单标题' }]">
      <el-input v-model="form.ticketTitle" placeholder = "请输入工单标题" />
    </el-form-item>

    <el-form-item
      label="工单内容"
      prop="ticketContent"
      label-position = "top"
      :rules="[{ required: false, message: '请输入工单内容' }]">
      <div class = 'ql-editor-container'>
        <QuillEditor 
          v-model:content="form.ticketContent"
          placeholder="请输入工单内容" 
          :options="editorOptions"
          class="ql-editor" 
      />
      </div>
    </el-form-item>

    <el-form-item
      label="上传附件"
      label-position = "top"
    >
      <RouterLink to = '/input-ticket/upload-attachments'>
        <upload-one theme="outline" size="24" fill="#333" />
        <span>上传附件</span>  
      </RouterLink>
  
    </el-form-item>


    <el-form-item
      label="优先级"
      label-position = "top"
      prop="ticketPriority"
      :rules="[{ required: true, message: '请选择优先级' }]">
      <el-radio-group v-model="form.ticketPriority">
        <el-radio :value="0">紧急</el-radio>
        <el-radio :value="1">高</el-radio>
        <el-radio :value="2">一般</el-radio>
        <el-radio :value="3">低</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

.el-form-grid{
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  font-weight: bold;
  display:flex;
  flex-direction: column;
  width:80%;
  height:80%;
  gap:20px;
  justify-content: center;
  margin:50px;
}

.ql-editor-container{
  display:flex;
  flex-direction: column;
  height:300px;
 width:1500px;
}

.ql-editor {
 height:500px;
 width:500px;
}
</style>
