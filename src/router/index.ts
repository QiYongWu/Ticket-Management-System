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
import InputTicket from '@/pages/InputTicket/index.vue'
import UploadAttachments from '@/pages/InputTicket/Upload/index.vue'

const history = createWebHashHistory();
const routes = [
    {
        path:'/input-ticket/upload-attachments',
        component:UploadAttachments
    }
    ,
    {
        path:'/input-ticket',
        component:InputTicket
    },
    {
        path:'/sign-in',
        component:SignIn
    },
    {
        path:'/sign-up',
        component:SignUp
    },
    {
        path:'/all-tickets',
        component:AllTickets
    },

    {
        path:'/my-tickets',
        components:MyTickets
    },

    {
        path:'/my-tickets/my-posting',
        component:MyPosting
    },

    {
        path:'/my-tickets/my-processing',
        component:MyProcessing
    },

    {
        path:'/my-tickets/my-to-be-collaborated',
        component:MyToBeCollaborated
    },
    {
        path:'/my-tickets/my-wait-reply',
        component:MyWaitReply
    },
    {
        path:'/Set',
        component:Set
    },
    {
        path:'/change-password',
        component:ChangePassword
    }
]

export const router = createRouter({
    history,
    routes
})