<script name = "Main" setup lang = 'ts'>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const cachedViews = ref<string[]>([]);

// 动态维护需要缓存的组件名称
watch(
  () => route.name,
  (name) => {
    if (route.meta.keepAlive && name && !cachedViews.value.includes(name as string)) {
      cachedViews.value.push(name as string);
    }
  },
  { immediate: true }
);
   
</script>

<template>
  
        <div class = 'router-view-container'>
            
            <RouterView>

            </RouterView>
        </div>
</template>

<style scoped>

</style>