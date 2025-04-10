import { defineStore } from "pinia";
//创建工单的id
export const useTicketIDStore = defineStore('feelec_template_id',{
   state() {
    return {
        feelec_template_id:0
    }
   }
})


export const useUserStatesStore = defineStore('userStatesStore',{
    state(){
        return { 
                                //response.data.code
            isLogin : true,      //1003
            userName : ''        //当前登陆人
        }
    }
})