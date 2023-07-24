<script setup lang="ts">
import {useRouter} from 'vue-router'
const router = useRouter()
const props = defineProps<{
    middle:string,
    right:string,
    back?:()=>void  
}>()
const onClickLeft = () => {
  // TODO 点击左侧返回按钮
  // if(history.state.back){
  //     router.back()
  // }else{
  //     router.push('/')
  // }
  if(props.back){
     props.back()
  }
}
const emit = defineEmits<{
    (e:'click-right'):void
}>()
</script>

<template>
  <van-nav-bar
    fixed
    left-arrow
    :title="middle"
    :right-text="right"
    @click-left="onClickLeft"
    @click-right="emit('click-right')"
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__text {
      font-size: 15px;
    }
  }
}
</style>