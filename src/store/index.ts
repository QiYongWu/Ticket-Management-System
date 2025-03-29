import { Ticket } from "@icon-park/vue-next";
import { defineStore } from "pinia";
export const useTicketIDStore = defineStore('ticketId',{
   state() {
    return {
        ticketId:0
    }
   }
})