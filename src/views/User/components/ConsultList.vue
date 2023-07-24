<script setup lang="ts">
import {getConsultOrderList} from '@/api/consult'
import type {ConsultOrderListParams,ConsultType,ConsultOrderItem} from '@/types/consult'
import {ref} from 'vue'
  const list = ref<ConsultOrderItem[]>([]);
  const props = defineProps<{ type: ConsultType }>()
    const loading = ref(true);
    const finished = ref(true);
    const params = ref<ConsultOrderListParams>({
       type: props.type,
       current: 1,
       pageSize: 5
    })
    //默认加载一次
    const onLoad =async () => {
      // 异步更新数据
    const {data}  = await getConsultOrderList(params)
     list.value.push(...data.rows)
     loading.value = false
     if(data.pageTotal === list.value.length){
       finished.value = true
     }else{
       params.value.current++
     }
    };
    const onDelete = (id)=>{
     list.value = list.value.filter((item)=>{
        return item.id !== id
      })
    }
</script>

<template>
  <div class="consult-list">
<van-list
  v-model:loading="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
   <consult-item v-for="i in 5" :key="i" :on-delete = 'onDelete'/>
</van-list>
  </div>
</template>

<style lang="scss" scoped>
.consult-list {
  padding: 10px 15px;
}
</style>