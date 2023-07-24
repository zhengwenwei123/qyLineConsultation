<script setup lang="ts">
import { ref,onMounted,computed } from 'vue'
import { getAllDep } from '@/api/consult'
import type { TopDep } from '@/types/consult'
import {useConsultStore} from '@/stores'
const store = useConsultStore()
//当前选中的一级科室
const active = ref(0)
const allDep = ref<TopDep[]>([])
onMounted(async() => {
//  const res = await getAllDep()
//  allDep.value = res.data
})
const subdep = computed(()=>allDep.value[active.value]?.child)


</script>

<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室" />
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item title="内科" />
        <van-sidebar-item title="外科" />
        <van-sidebar-item title="皮肤科" />
        <van-sidebar-item title="骨科" />
      </van-sidebar>
      <div class="sub-dep">
        <router-link to="/consult/illness" @click="store.setDep(sub.id)">科室一</router-link>
        <router-link to="/consult/illness">科室二</router-link>
        <router-link to="/consult/illness">科室三</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.van-sidebar {
  width: 114px;
  &-item {
    padding: 14px;
    color: var(--cp-tag);
    &--select {
      color: var(--cp-main);
      font-weight: normal;
      &::before {
        display: none;
      }
    }
  }
}
.consult-dep-page {
  padding-top: 46px;
  .wrapper {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;
    .sub-dep {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      > a {
        display: block;
        padding: 14px 30px;
        color: var(--cp-dark);
      }
    }
  }
}
</style>