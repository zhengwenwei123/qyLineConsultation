<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
import type {KnowledgeList,KnowledgeType,KnowledgeParams} from '@/types/consult'
import {getKnowledgePage} from '@/api/consult'
import {ref} from 'vue'  
const loading = ref(false)
const finished = ref(false)
const list = ref<number[]>([])
const props = defineProps<{
  type:KnowledgeType
}>()
const params = ref<KnowledgeParams>({
   type: props.type,
  current:1,
  pageSize:10
})
const onLoad =async ()=>{
 setTimeout(() => {
    const data = [1, 2, 3, 4, 5]
    list.value.push(...data)
    // 模拟加载完毕
    if (list.value.length > 20) {
      finished.value = true
    }
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="knowledge-list">
    <van-list   
    v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
     <knowledge-card v-for="i in list" :key="i"></knowledge-card>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>