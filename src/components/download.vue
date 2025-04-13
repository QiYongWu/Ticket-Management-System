<script setup name="Download" lang="ts">
import axios from 'axios';
import { ElMessage } from 'element-plus';

const filePath = 'static/file/ba880feb-c46b-44ab-8e0c-44aa27dd8f06.txt';

async function HandleDownload() {
    try {
        const response = await axios.post(
            'http://222.215.137.44:8084/api_jsonrpc/',
            {
                method: "download.file",
                params: {
                    file_path: filePath
                }
            },
            {
                responseType: 'blob' // 配置响应类型为blob，明确告诉 axios 响应是二进制数据
            }
        );

        if (response.status === 200) {
            console.log(response)
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filePath.split('/').pop() || 'download.txt';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } else {
            ElMessage.error(`下载失败: ${response.statusText}`);
        }
    } catch (err) {
        console.error(err);
        ElMessage.error('下载请求失败');
    }
}
</script>

<template>
    <el-button type="primary" @click="HandleDownload">
        点击下载工单附件
    </el-button>
</template>