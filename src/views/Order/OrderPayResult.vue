<script setup lang="ts">
import {useMedicineDetail} from '@/hooks/index'
import { OrderType } from '@/enums/'
// import { getMedicalOrderDetail } from '@/api/medicine'
// import type { OrderDetail } from '@/types/medicine'
// import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
// const order = ref<OrderDetail>()
// const route = useRoute()
// onMounted(async () => {
//   const res = await getMedicalOrderDetail(route.query.orderId as string)
//   order.value = res.data
// })
// const {order} = useMedicineDetail(route.query.orderId as string)
</script>

<template>
  <div class="order-pay-result-page">
    <cp-nav-bar title="药品支付结果" />
    <div class="result">
      <van-icon name="clear" />
      <p class="price">￥ 100.00</p>
      <p class="status">支付失败</p>
      <p class="tip">
        订单支付失败，可以点击查看订单继续支付，如有疑问联系客服~
      </p>
    </div>
    <div class="result">
      <van-icon name="checked" />
      <p class="price">￥ 100.00</p>
      <p class="status">支付成功</p>
      <p class="tip">订单支付成功，已通知药房尽快发出， 请耐心等待~</p>
    </div>
    <div class="btn">
      <van-button type="primary" :to="`/order/10000`">查看订单</van-button>
      <van-button :to="`/room?orderId=10000`">返回诊室</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-pay-result-page {
  padding-top: 46px;
  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    .van-icon {
      font-size: 75px;
      margin-top: 60px;
    }
    .van-icon-clear {
      color: var(--cp-price);
    }
    .van-icon-checked {
      color: var(--cp-primary);
    }
    .price {
      font-size: 22px;
      margin-top: 10px;
    }
    .status {
      color: var(--cp-text3);
    }
    .tip {
      color: var(--cp-tip);
      width: 240px;
      text-align: center;
      margin-top: 20px;
    }
  }
  .btn {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    .van-button--primary {
      margin-right: 20px;
    }
  }
}
</style>