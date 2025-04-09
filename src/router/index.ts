import { createWebHashHistory,createRouter } from "vue-router";
import AllTickets from '@/pages/AllTickets/index.vue'
import MyTickets from '@/pages/MyTickets/index.vue'

import MyPosting from "@/pages/MyTickets/MyPosting.vue";
import MyProcessing from "@/pages/MyTickets/MyProcessing.vue";
import MyToBeCollaborated from "@/pages/MyTickets/MyToBeCollaborated.vue";
import MyWaitReply from "@/pages/MyTickets/MyWaitReply.vue";
import Set from "@/pages/Set/index.vue"

import SignIn from "@/pages/sign/SignIn.vue";
import SignUp from "@/pages/sign/SignUp.vue";

import ChangePassword from '@/pages/ChangePassword/index.vue'
import InputTicket from '@/pages/InputTicket/index.vue' //该页面不使用登录认证，新建一个单独的路由不适用登录认证。
import UploadAttachments from '@/pages/InputTicket/Upload/index.vue'

import { useUserStatesStore } from "@/store";  //获取用户的状态

const history = createWebHashHistory();
const routes = [
    //不需要权限就能访问
    {
        path:'/input-ticket/upload-attachments',
        component:UploadAttachments
    }
    ,
    {
        path:'/',        //上传工单页面不需要登录就能看
        component:InputTicket
    },

    {
        path:'/sign-in',
        name:'signIn',
        component:SignIn
    },
    {
        path:'/sign-up',
        component:SignUp
    },

    //需要登录后才能访问得页面
    {
        path:'/home',
        name :'home',
        component:AllTickets,
        meta: { requiresAuth: true }  // 给需要权限的路由添加标记
    },

    {
        path:'/my-tickets',
        name : 'MyTickets',
        components:MyTickets,
        meta: { requiresAuth: true }  // 给需要权限的路由添加标记
    },

    {
        path:'/my-tickets/my-posting',
        name:'MyPosting',
        component:MyPosting,
        meta: { requiresAuth: true }  // 给需要权限的路由添加标记
    },

    {
        path:'/my-tickets/my-processing',
        name : 'MyProcessing',
        component:MyProcessing,
        meta: { requiresAuth: true }  // 给需要权限的路由添加标记
    },

    {
        path:'/my-tickets/my-to-be-collaborated',
        name:'MyToBeCollaborated',
        component:MyToBeCollaborated,
        meta: { requiresAuth: true }  // 给需要权限的路由添加标记
    },
    {
        path:'/my-tickets/my-wait-reply',
        name:'MyWaitReply',
        component:MyWaitReply,
        meta: { requiresAuth: true }  // 给需要权限的路由添加标记
    },

    {
        path:'/Set',
        name:'Set',
        component:Set,
        meta: { requiresAuth: true }  // 给需要权限的路由添加标记
    },
    {
        path:'/change-password',
        name :'changePassword',
        component:ChangePassword,
        meta: { requiresAuth: true }  // 给需要权限的路由添加标记
    },
    
]


const router = createRouter({
    history,
    routes
});

router.beforeEach(      //router.beforeEach 是一个全局导航守卫，它允许你在路由跳转前执行一些操作
    (to,from,next) =>{
    // const isUserLogIn = useUserStatesStore().isLogin;   //用户登录状态
    const isUserLogin = localStorage.getItem('isLogin') || ''
     // 检查目标路由是否需要权限验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果用户未登录，则重定向到登录页面，并传入当前页面的路径作为 redirect 参数
    if (!isUserLogin) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else if(isUserLogin){
      // 如果已登录，则允许继续跳转
      next();
    }
  } else {
    // 如果路由不需要权限校验，直接放行
    next();
  }
    
})



export {router}

