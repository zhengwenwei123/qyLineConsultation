<script setup lang="ts"></script>

<template>
  <div class="layout-page">
    <router-view></router-view>
    <!-- tabbar -->
    <van-tabbar route>
      <van-tabbar-item to="/home">
        首页
        <template #icon="props">
       <img :src="props.active ? '@/icon/home-active@2x' :'@/icon/home-default@2x'" />
    </template>
      </van-tabbar-item>
      <van-tabbar-item to="/article">
        健康百科
      </van-tabbar-item>
      <van-tabbar-item to="/notify">
        消息中心
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped></style>
