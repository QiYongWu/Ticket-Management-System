import { defineStore } from "pinia";
//创建工单的id
export const useTicketIDStore = defineStore('feelec_template_id',{
   state() {
    return {
        feelec_template_id:0
    }
   }
})


//不能使用pinia来管理用户状态，一刷新就会丢失
