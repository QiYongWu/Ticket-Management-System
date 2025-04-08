import { Ticket } from "@icon-park/vue-next";
import { defineStore } from "pinia";
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
            isLogin : false,    //1003
            isTimeout : false,  //1002
        }
    }
})