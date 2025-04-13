<script lang="ts" setup name="Test">
import axios from 'axios'
const HandleSearch = function(){
    axios.post('http://222.215.137.44:8084/api_jsonrpc/', 
    {
        "method":"files.list",
        "params":{
        feelec_template_id:5525442659
        }
        }
 )
 .then((res) =>{
    console.log(res)
 })
}

</script>

<template>
    <el-button type="primary" @click="HandleSearch">
        test
    </el-button>
</template>