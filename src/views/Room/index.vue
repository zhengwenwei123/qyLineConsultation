<script setup lang="ts">
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import {onMounted,onUnmounted,nextTick} from 'vue'
import { useUserStore } from '@/stores'
//导入socket.io插件
import {io} from 'socket.io-client'
import type {Socket} from 'socket.io-client'
import { useRoute } from 'vue-router'
import { baseURL } from '@/utils/request'
import type {Message,TimeMessages} from '@/types/room'
import {ref} from 'vue'
import {MsgType} from '@/enums'
import {getConsultOrderDetail} from '@/api/consult'
import type {ConsultOrderItem} from '@/types/consult'
import type { Image } from '@/types/consult'
let socket:Socket
//聊天列表
let list = ref<Message>([])
const route = useRoute()
const store = useUserStore()
const initSocket = ()=>{
//   socket = io(baseURL,{
//     auth:{
//       token:`Bearer ${store.user.token}`
//     },
//     query:{
//       orderId:route.query.orderId
//     }
//   })
//   socket.on('connect',()=>{
//     console.log('建立成功')
//   })
//   socket.on('error',()=>{
//     console.log('错误')
//   })
//   socket.on('disconnect',()=>{
//     console.log('断开')
//   })
//   //接收ws服务器给浏览器(患者端)发送的默认数据
//   socket.on('chatMagList',({data}:{data:TimeMessages[]})=>{
//     const result:Message[] = []
//     data.forEach(item => {
//       result.push({
//         id:item.createTime,
//         msgType:MsgType.Notify,
//         createTime:item.createTime,
//         msg:{
//           content:item.createTime
//         }
//       })
//       //把items的消息放入到result中
//       result.push(...item.items)
//     });
//     //把处理好的消息追加到list中
//     list.value.push(...result)
//   })
//接收医生回复
  socket.on('receiveChatMsg',async(msg)=>{
    list.value.push(msg)
    await nextTick()
    window.scrollTo(0,document.body.scrollHeight)
  })
  //接收订单变化消息
  socket.on('statusChange',()=>{
   getOrderDetail()
  })
}
onMounted(() => {
  initSocket()
})
onUnmounted(() => {
  socket.close()
})
//获取订单详情
const consult = ref<ConsultOrderItem>()
const getOrderDetail = async()=>{
 const {data} = await getConsultOrderDetail(route.query.orderId as string)
  consult.value = data
}
onMounted(() => {
  getOrderDetail()
})
const sendText = (text:string)=>{
  socket.emit('sendChatMsg',{
    from:store.user.id,
    to:consult.value?.docInfo?.id,//接诊医生,
    msgType:MsgType.MsgText,
    msg:{
      content:text
    }
  })
}
const sendImg = (img:Image)=>{
  socket.emit('sendChatMsg',{
    from:store.user.id,
    to:consult.value?.docInfo?.id,//接诊医生,
    msgType:MsgType.MsgImage,
    msg:{
      content:img
    }
  })
}
</script>

<template>
  <div class="room-page">
    <cp-nav-bar :title="医生问诊室" />
    <room-status :status='consult?.status' :countdown='consult?.countdown'></room-status>
     <room-message :list='list'></room-message>
    <room-action @send-text='sendText' @send-img='sendImg'></room-action> 
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>