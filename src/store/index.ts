import { defineStore } from "pinia";
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


export {useTicketIDStore,useDrawerStore}




//不能使用pinia来管理需要长期保存的数据，如用户状态，一刷新就会丢失
