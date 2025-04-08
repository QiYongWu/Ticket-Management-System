// src/utils/request.js
import {router} from '@/router'
import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    switch (res.code) {
      case 0: // 成功
        return res
      case '1003':  {window.alert(res.message)} // 未登录
      case '1002':  {
        window.alert(res.message);
        handleAuthError();
        return Promise.reject(res)} // 登录超时
        
      case 1001: // 不支持的请求方法
      {
        handleMethodError(res.message)
        return Promise.reject(res)
      }
      case 1004: // 密码修改失败
      {
        handlePasswordError(res.message)
        return Promise.reject(res)
      }
      default:
        return res
    }
  },
  error => {
   
    return Promise.reject(error)
  }
)

// 认证错误处理
const handleAuthError = () => {
  // router.replace(`/login?redirect=${encodeURIComponent(router.currentRoute.fullPath)}`)

  localStorage.removeItem('token')
}

// 其他错误处理（根据需求扩展）
const handleMethodError = (msg:string) => {
  window.alert(msg)
}

const handlePasswordError = (msg:string) => {
  window.alert(msg)
}


service.interceptors.request.use(
  config => {
      const token = localStorage.getItem('jwt_token') || '';
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(`Authorization : ${config.headers.Authorization}`);
      }
      return config;
  }, 
  error => {
    return Promise.reject(error);
  });


export default service