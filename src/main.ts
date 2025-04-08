import { createApp } from 'vue'
import App from './App.vue'
import {router} from '@/router/index.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import {install} from '@icon-park/vue-next/es/all';
import axios from 'axios';




//添加全局请求拦截器
axios.interceptors.request.use(
  config => {
    //请求前加上token，用于前后端通信验证
    const token = localStorage.getItem('jwt_token') || '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`Authorization : ${config.headers.Authorization}`);
    }
    return config;
  },
 error => {
  console.log('请求发生了错误')
  return Promise.reject(error);
});





const app = createApp(App)

app.use(router);
app.use(ElementPlus)
install(app);
const pinia = createPinia()
app.use(pinia);

app.mount('#app')


//母日期设置
export const startDate = '2025-01-01'
