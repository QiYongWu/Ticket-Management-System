import { createApp } from 'vue'
import App from './App.vue'
import {router} from '@/router/index.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import {install} from '@icon-park/vue-next/es/all';
import axios from 'axios';
import { ElMessage } from 'element-plus'

import {ReSetUserCount,SetLoginState} from '@/utils/reset'


//添加全局请求拦截器
axios.interceptors.request.use(
  config => {
    //发起请求前的设置
    //请求前加上token，用于前后端通信验证
    const token = localStorage.getItem('jwt_token') || '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`Authorization : ${config.headers.Authorization}`);
    }
    return config;
  },
 error => {
  ElMessage.info('请求发生了错误')
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(
  response =>{
    const stateCode = response.data.code;
    switch(stateCode){
      case 1003 :  {
       ElMessage.info('注意，您还未登录');
        SetLoginState(false); //重置账户与设置登录状态为未登录 
        router.push('/sign-in');
      }
      case 1001 :{  //不允许请求
      }

      case 1002 :{
        ElMessage.info('不好意思，登录已经超时');
        SetLoginState(false);  //重置账户与设置登录状态为未登录   
        router.push('/sign-in');
      }

      case 0 :{   //成功
        
      }

      default:{
       
      }
    }

    return response;
  }
)


const app = createApp(App)

app.use(router);
app.use(ElementPlus)
install(app);
const pinia = createPinia()
app.use(pinia);

app.mount('#app')

