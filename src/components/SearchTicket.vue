<script  setup lang = 'ts' name = "SearchTicket">
    import {ref} from 'vue'
    import { Search } from '@icon-park/vue-next'
    const searchTicket = ref('')
    function SearchTicket(){
      if(!searchTicket.value){
        window.alert('请输入需要搜索的内容！')
       
      }

      else{
        console.log('search start')
      }
    }
</script>

<template>
        <div class="search-ticket-grid">
            <el-input v-model="searchTicket" style="width: 240px" placeholder="搜索工单"
            type="search"  />
          
            <button  @click="SearchTicket">
              <search theme="outline" size="24" fill="#333" />
            </button>
        </div>
</template>