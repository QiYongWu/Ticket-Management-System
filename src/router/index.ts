import { createWebHashHistory,createRouter } from "vue-router";
import AllTickets from '@/pages/AllTickets/index.vue'
import MyTickets from '@/pages/MyTickets/index.vue'

import MyPosting from "@/pages/MyTickets/MyPosting.vue";
import MyProcessing from "@/pages/MyTickets/MyProcessing.vue";
import MyToBeCollaborated from "@/pages/MyTickets/MyToBeCollaborated.vue";
import MyWaitReply from "@/pages/MyTickets/MyWaitReply.vue";
import Set from "@/pages/Set/index.vue"
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";
const history = createWebHashHistory();
const routes = [
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
    }
]

export const router = createRouter({
    history,
    routes
})