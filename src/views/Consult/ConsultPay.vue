<script setup lang="ts">
import type {ConsultOrderPreData} from '@/types/consult'
import type {Patient} from '@/types/user'
import {ref,onMounted} from 'vue'
import {getConsultOrderPre,createConsultOrder,getConsultOrderPayUrl} from '@/api/consult'
import {useConsultStore} from '@/stores'
import {getPatientDetail} from '@/api/user'
import { showToast, showConfirmDialog, Toast,showLoadingToast } from 'vant'
import { useRoute, useRouter,onBeforeRouteLeave } from 'vue-router'
const payInfo = ref<ConsultOrderPreData>()
const store = useConsultStore()
const router = useRouter()
const getPayInfo =async ()=>{
  // try {
  //   const {data} = await getConsultOrderPre({
  //   type:store.consult.type,
  //   illnessType:store.consult.illnessType
  // })
  // payInfo.value = data
  //   // 设置默认优惠券
  // store.setCoupon(payInfo.value.couponId)
  // } catch (error) {
  //   showToast('请重新选择支付信息')
  // router.push('/home')
  // }
}
const patient = ref<Patient>()
const getPatient =async ()=>{
  // const {data} = await getPatientDetail(store.consult.patientId)
  // patient.value = data
}
onMounted(() => {
  getPayInfo()
  getPatient()
})
const show = ref(false)
const agree = ref(false)
const paymentMethod = ref<0 | 1>()
const orderId = ref('')
const openPay =async ()=>{
  if(!agree.value){
    return showToast('请勾选我已同意支付协议')
  }
  show.value = true
  try {
    const {data} = await createConsultOrder(store.consult)
    orderId.value = data.id
    store.clear()
  } catch (error) {
    console.log(error)
  }
}
//订单创建支付窗口后，订单创建成功
onBeforeRouteLeave(()=>{
  if(orderId.value) return false
})
const onClose =async ()=>{
     return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付',
  })
    .then(() => {
      return false
    })
    .catch(() => {
      orderId.value = ''
      router.push('/user/consult')
      return true
    })
}
//点击弹层中支付按钮，获取支付地址，进行跳转
const payOrder =async ()=>{
 if(paymentMethod.value === undefined) return showToast('请选择支付方式')
 showLoadingToast({ message: '跳转支付', duration: 0 })
//  const {data} = await getConsultOrderPayUrl({
//    paymentMethod:paymentMethod.value,
//    orderId:orderId.value,
//    payCallback:'http://localhost:5173/room'
//  })
 window.location.href = 'http://localhost:5173/room'
}
</script>

<template>
  <div class="consult-pay-page">
    <cp-nav-bar title="支付" />
    <div class="pay-info">
      <p class="tit">图文问诊 49 元</p>
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠券" value="-¥10.00" />
      <van-cell title="积分抵扣" value="-¥10.00" />
      <van-cell title="实付款" value="¥29.00" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell title="患者信息" value="李富贵 | 男 | 30岁"></van-cell>
      <van-cell title="病情描述" label="头痛，头晕，恶心"></van-cell>
    </van-cell-group>
    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意 <span class="text">支付协议</span></van-checkbox>
    </div>
    <van-submit-bar button-type="primary" :price="2900" button-text="立即支付" text-align="left" @click="openPay" />
   <cp-pay-sheet v-model:show="show" :orderId='orderId' payCallback="/order/pay/result"></cp-pay-sheet>
  </div>
</template>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;
}
.pay-info {
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  align-items: center;
  .tit {
    width: 100%;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .img {
    margin-right: 10px;
    width: 38px;
    height: 38px;
    border-radius: 4px;
    overflow: hidden;
  }
  .desc {
    flex: 1;
    > span {
      display: block;
      color: var(--cp-tag);
      &:first-child {
        font-size: 16px;
        color: var(--cp-text2);
      }
    }
  }
}
.pay-price {
  ::v-deep() {
    .vam-cell__title {
      font-size: 16px;
    }
    .van-cell__value {
      font-size: 16px;
      color: var(--cp-price);
    }
  }
}
.pay-space {
  height: 12px;
  background-color: var(--cp-bg);
}
.pay-schema {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  .text {
    color: var(--cp-primary);
  }
}
::v-deep() {
  .van-submit-bar__button {
    font-weight: normal;
    width: 160px;
  }
}
.pay-type {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>