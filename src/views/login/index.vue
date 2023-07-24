<script setup lang='ts'>
import {ref,onUnmounted} from 'vue'
import {showFailToast,type FormInstance,Toast,showSuccessToast} from 'vant'
import {loginByPassword,sendMobileCode,loginByMobile} from '@/api/user'
import { mobileRules, passwordRules,codeRules} from '@/utils/rules'
import {useUserStore} from '@/stores'
import { useRoute, useRouter } from 'vue-router'
const clickRight = ()=>{
}
const agree = ref(false)
const isShowPass = ref(false)
const isPass = ref(true)
//账号密码的响应变量
const mobile = ref('13230000001')
const password = ref('abc12345')
//验证码
const code = ref('')
//登录点击
const store = useUserStore()
const router = useRouter()
const route = useRoute()
const login =async ()=>{
     if (!agree.value) return showFailToast('请勾选我已同意 ')
    //  const res = await loginByPassword(mobile.value,password.value)
      // const res = isPass.value?await loginByPassword(mobile.value,password.value):await loginByMobile(mobile.value,code.value)
      //    store.setUser(res.data)
          router.push((route.query.returnUrl as string) || '/user')
          showSuccessToast('登录成功')
}
//获取表单实例
const form = ref<FormInstance>()
//发送验证码时间
const time = ref(0)
let timeId:number
const send =async ()=>{
  if(time.value>0)return
   await form.value?.validate('mobile')
  //  await sendMobileCode(mobile.value,'login') 
    showFailToast('发送成功')
    time.value = 60
  clearInterval(timeId)
  timeId = window.setInterval(()=>{
    console.log(timeId)
    time.value--
    if(time.value<=0)
    window.clearInterval(timeId)
  },1000)
}
onUnmounted(() => {
  window.clearInterval(timeId)
})
</script>
<template>
<div class="login-page">
    <cp-nav-bar
    title='登录'
      right-text="注册"
      @click-right="$router.push('/register')"
    ></cp-nav-bar>
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{isPass?'密码登录':'短信验证码登录'}}</h3>
      <a href="javascript:;" @click="isPass=!isPass">
        <span>{{!isPass?'密码登录':'短信验证码登录'}}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off"  @submit="login">
      <van-field v-model="mobile" :rules='mobileRules' placeholder="请输入手机号" type="tel"></van-field>
      <van-field v-model="password" v-if="isPass" :rules='passwordRules' placeholder="请输入密码"  :type="isShowPass?'text':'password'">
         <template #button >
          <img  @click="isShowPass = !isShowPass" v-if="isShowPass" src="@/icon/eye-states-on@2x.png" alt="" class="imgm">
          <img  @click="isShowPass = !isShowPass" src="@/icon/eye-states-off@2x.png" v-else alt="" class="imgm">
    </template>
          </van-field>
          <van-field v-else placeholder="短信验证码" v-model="code" :rules='codeRules'>
        <template #button>
          <span class="btn-send" @click="send" :class="{active:time>0}">{{time>0 ?`${time}s后再发送`:'发送验证码' }}</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">>登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
    .login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    display: flex;
    padding: 30px 30px 50px;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
.van-form {
  padding: 0 14px;
      .imgm{
        width: 16px;
        height: 16px;
    }
  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .van-checkbox {
      a {
        color: var(--cp-primary);
        padding: 0 5px;
      }
    }
  }
  .btn-send {
    color: var(--cp-primary);
    &.active {
      color: rgba(22,194,163,0.5);
    }
  }
}
</style>