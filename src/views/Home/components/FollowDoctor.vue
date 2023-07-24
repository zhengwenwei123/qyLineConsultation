<script setup lang="ts">
import DoctorCard from './DoctorCard.vue'
import { Swipe, SwipeItem } from 'vant';
import { useWindowSize } from '@vueuse/core'
import {ref,onMounted,onUnmounted} from 'vue'
import {getDoctorPage} from '@/api/consult'
import type {DoctorList} from '@/types/consult'
const { width } = useWindowSize()
const width1 = ref(0)
const setWidth = ()=> width1.value = window.innerWidth
const list = ref<DoctorList>()
const loadData =async ()=>{
//  const res = await getDoctorPage({ current: 1, pageSize: 5 })
//   list.value = res.data.rows
}
onMounted(() => {
  setWidth()
  loadData()
  window.addEventListener('resize',setWidth)
})
onUnmounted(() => {
  window.removeEventListener('resize',setWidth)
})

</script>

<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="body">
   <van-swipe class="my-swipe" :width='(150 / 375) * width1' :show-indicators='false' indicator-color="white" :loop='false'>
  <van-swipe-item v-for="item in 5" :key="item">
    <doctor-card :item='item'/>
  </van-swipe-item>

</van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-doctor {
  background-color: var(--cp-bg);
  height: 250px;
  .head {
    display: flex;
    justify-content: space-between;
    height: 45px;
    align-items: center;
    padding: 0 15px;
    font-size: 13px;
    > a {
      color: var(--cp-tip);
    }
  }
  .body {
    width: 100%;
    overflow: hidden;
  }
}
</style>