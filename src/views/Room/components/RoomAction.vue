<script setup lang="ts">
import {ref} from 'vue'
import { uploadImage } from '@/api/consult'
import type { Image } from '@/types/consult'
import { Toast } from 'vant'
import type { UploaderAfterRead } from 'vant/lib/uploader/types'
const text = ref('')
const emit = defineEmits<{
  (e:'send-text',data:string):void
  (e:'send-img',data:Image):void
}>()
const sendText = ()=>{
    text.value = ''
  emit('send-text',text.value)
}
const sendImg:UploaderAfterRead = async(data)=>{
  if(Array.isArray(data)) return
  if(!data.file) return
  const t = Toast.showLoadingToast('上传中...')
  // const {data:img} = await uploadImage(data.file)
  t.clear()
  // emit('send-img',img)
}
</script>

<template>
  <div class="room-action">
    <van-field
      type="text"
      v-model="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      @keyup.enter="sendText"
      :disabled="false"
    ></van-field>
    <van-uploader :after-read='sendImg' :preview-image="false" :disabled="false" >
      <cp-icon name="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>