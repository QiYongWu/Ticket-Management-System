<script lang="ts" name="InputTicket" setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { UploadOne } from '@icon-park/vue-next';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import { useTicketIDStore } from '@/store';
import { useDrawerStore } from '@/store';
import { ElMessage, type FormInstance } from 'element-plus';
import UploadAttachments from './Upload/index.vue'

const drawer = ref(useDrawerStore().drawer);

const form = reactive({
  feelec_template_id: 0,
  WorkOrderHeading: '',
  WorkOrderContent: '',
  Priority: 2,
  contact_person: '',
  contact_number: ''
});




const formRef = ref<FormInstance>();

function generate10DigitId() {
  const timestampPart = Date.now().toString().slice(-9);
  const randomDigit = Math.floor(Math.random() * 10);
  return parseInt(timestampPart + randomDigit, 10);
}

onMounted(()=>{
  
  //创建工单页面挂载,数据重新创建，随机分配id给该工单
  form.feelec_template_id =generate10DigitId();

  //使用pinia来存储工单id，页面刷新会丢失/重新分配 数据
  useTicketIDStore().feelec_template_id = form.feelec_template_id;

  //debug
  console.log(`上传工单页面挂载,随机分配得的工单id:${form.feelec_template_id}`)
})

function onSubmit() {
  formRef.value?.validate((valid) => {
    if (valid) {

      axios.post('http://222.215.137.44:8084/ticket/ticket_create/', form, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response)
       ElMessage.info(response.data.message);
      })
      .catch((error) => {
        console.error('提交失败:', error);
      ElMessage.info('提交失败，请稍后重试');
      });
    } else {
      console.log('验证失败');
      return false;
    }
  });
}

function onCancel() {
  formRef.value?.resetFields();
}

const editorOptions = {
  placeholder: '请输入内容',
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': 1 }, { 'header': 2 }],
      ['blockquote'],
      ['image'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['code-block'],
      ['clean'],
    ],
  },
};
</script>

<template>
  <el-form
    ref="formRef"
    :model="form"
    label-width="80px"
    class="el-form-grid"
  >
    <!-- 工单标题 -->
    <el-form-item
      label="工单标题"
      prop="WorkOrderHeading"
      :rules="[{ required: true, message: '请输入工单标题' }]"
    >
      <el-input v-model="form.WorkOrderHeading" placeholder="请输入工单标题" />
    </el-form-item>

    <!-- 工单内容 -->
    <el-form-item
      label="工单内容"
      prop="WorkOrderContent"
      :rules="[{ required: true, message: '请输入工单内容' }]"
    >
      <div class="editor-container">
        <QuillEditor
          v-model:content="form.WorkOrderContent"
          content-type="html"
          :options="editorOptions"
          class="quill-editor"
        />
      </div>
    </el-form-item>

    <!-- 上传附件 -->
    <el-form-item label="上传附件">
      <el-button style ="border: none;" @click = "drawer=true">
        <upload-one theme="outline" size="24" fill="#333" />
        <span>上传附件</span>
      </el-button>
    </el-form-item>

    <!-- 优先级 -->
    <el-form-item
      label="优先级"
      prop="Priority"
      :rules="[{ required: true, message: '请选择优先级' }]"
    >
      <el-radio-group v-model="form.Priority">
        <el-radio :value="0">
          <div class="priority-color-block" style="background: #FF0000"></div>
          紧急
        </el-radio>
        <el-radio :value="1">
          <div class="priority-color-block" style="background: #FFC0CB"></div>
          高
        </el-radio>
        <el-radio :value="2">
          <div class="priority-color-block" style="background: #409EFF"></div>
          一般
        </el-radio>
        <el-radio :value="3">
          <div class="priority-color-block" style="background: #67C23A"></div>
          低
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <!-- 联系人 -->
    <el-form-item
      label="联系人"
      prop="contact_person"
      :rules="[{ required: true, message: '请输入联系人' }]"
    >
      <el-input v-model="form.contact_person" />
    </el-form-item>

    <!-- 联系电话 -->
    <el-form-item
      label="联系电话"
      prop="contact_number"
      :rules="[
        { required: true, message: '请输入联系电话' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }
      ]"
    >
      <el-input v-model="form.contact_number" />
    </el-form-item>

    <el-form-item>
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>

  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <UploadAttachments />
  </el-drawer>
</template>

<style scoped>
.priority-color-block {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  margin-right: 8px;
  vertical-align: middle;
  border: 1px solid rgba(0,0,0,0.1);
}

.el-radio.is-checked .priority-color-block {
  transform: scale(1.2);
  transition: transform 0.3s;
}

.el-form-grid {
  width: 80%;
  margin: 20px auto;
}

.editor-container {
  width: 100%;
  height: 400px;
}

.quill-editor {
  height: 350px;
}

:deep(.ql-container) {
  height: calc(100% - 42px);
}
</style>