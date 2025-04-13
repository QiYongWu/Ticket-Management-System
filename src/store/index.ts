import type { TicketAttachmentInfo, TicketInfo } from "@/types";
import { defineStore } from "pinia";
import { formatDate } from '@/utils/date'
//创建工单的id
 const useTicketIDStore = defineStore('feelec_template_id',{
   state() {
    return {
        feelec_template_id:0
    }
   }
})

//存储抽屉组件的开/关状态
const useDrawerStore = defineStore('drawer',{
    state(){
        return{
            drawer:false
        }
    }

})

//存储工单信息
const useTicketsInfoStore= defineStore('ticketInfo',{
    state(){
        return {
            tickets:<TicketInfo []>[],
            ticketsAttachments:<TicketAttachmentInfo []>[]
        }
    }
})

//存储搜索的起始日期与结束日期
const useDateStore = defineStore('date',{
    state(){
        return {
           dates: [
                formatDate(new Date(2025,3,30)),
                formatDate(new Date())
            ]
        }
    }
})


export {useTicketIDStore,useDrawerStore,useTicketsInfoStore,useDateStore}




//不能使用pinia来管理需要长期保存的数据，如用户状态，一刷新就会丢失
