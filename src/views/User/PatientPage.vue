<script setup lang="ts">
import {ref,onMounted, computed} from 'vue'
import { showConfirmDialog, showSuccessToast, showToast } from 'vant'
import { useRoute,useRouter} from 'vue-router'
import {useConsultStore} from '@/stores/index'
  const list  = ref([])
  const loadList = ()=>{
    // const res = await getPatientList()
    // list.value = res.data
    if(isSel.value){
      // const defPatient = data.find((item)=>item.defaultFlag===1)
      // if(defPatient){
      //   selectedPatientId.value = defPatient.id
      // }else{
      //   selectedPatientId.value = data[0].id
      // }
    }
  }
  onMounted(() => {
    loadList()
  })
  const show = ref(false)
  const openDialog = ()=>{
    patient.value = {...initPatient}
    show.value = true
  }
  const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]
const gender = ref(1)
const patient = ref({
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
})
const defaultFlag = computed({
  get(){
    return patient.value.defaultFlag === 1?true:false
  },
  set(value){
    patient.value.defaultFlag = value?1:0
  }
})
const initPatient = {
   name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
}
const form = ref()
const clickRight =async ()=>{
  await form.value?.validate()
  const gender = patient.value.idCard.slice(-2,-1) % 2
  if(gender !== patient.value.idCard){
    await showConfirmDialog({
      title:'温馨提示',
      message:'填写的性别和身份证号中的不一致\n您确认提交吗？'
    })
  }
  // patient.value.id?await editPatient(patient.value) : await addPatient(patient.value)
  show.value = false
  showSuccessToast(patient.value.id?'编辑成功':'添加成功')
} 
const showPopup = (item?)=>{
  if(item){
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
  }else{
    patient.value = {...initPatient}
  }
  show.value = true
}
const remove =async ()=>{
  if(patient.value.id){
    await showConfirmDialog({
      title:'温馨提示',
      message:`您确定删除${patient.value.name}患者信息吗？`
    })
    // await editPatient(patient.value.id)
    show.value = false
    showSuccessToast('删除成功')
  }

}
const route = useRoute()
const isSel = computed(()=>{
 return route.query.isSel === '1'
})
//点击选中患者
const selectedPatientId = ref('')
const selPatient = (id:string | undefined)=>{
  if(isSel.value){
    selectedPatientId.value = id
  }
}
const store = useConsultStore()
const router = useRouter()
const next = ()=>{
  if(!selectedPatientId) return showToast('请先选择患者')
  store.setPatient(selectedPatientId.value)
  router.push('/consult/pay')
}
</script>
<template>
  <div class="patient-page">
    <cp-nav-bar :title="isSel?'选择患者':'家庭档案'"></cp-nav-bar>
      <div class="patient-change" v-if="isSel">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    <div class="patient-list">
      <div class="selected" @click="selPatient(item.id)">
        <div class="info">
          <span class="name">李富贵</span>
          <span class="id">321111********6164</span>
          <span>男</span>
          <span>32岁</span>
        </div>
        <div class="tag">默认</div>
      </div>
      <div class="patient-item">
        <div class="info">
          <span class="name">李富贵</span>
          <span class="id">321333********6164</span>
          <span>男</span>
          <span>32岁</span>
        </div>
      </div>
      <div class="patient-add" v-if="list.length<6" @click="openDialog">
        <div @click="showPopup(item)" class="icon">添加</div>
        <cp-icon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
         <!-- 底部按钮 -->
    <div class="patient-next" v-if="isSel">
      <van-button type="primary" round block @click="next">下一步</van-button>
    </div>
       <van-popup v-model:show="show" position="right">
      <cp-nav-bar  :back='()=>(show = false)'  right-text="保存" @click-right ='clickRight' :title="patient.id?'编辑患者':'添加患者'">
      </cp-nav-bar>
         <van-form autocomplete="off" ref="form">
        <van-field label="真实姓名" v-model="patient.name" placeholder="请输入真实姓名" :rules="nameRules"/>
        <van-field label="身份证号" v-model="patient.idCard" placeholder="请输入身份证号" :rules="idCardRules"/>
        <van-field label="性别" class="pb4">
          <!-- 单选按钮组件 -->
          <template #input>
            <cp-radio-btn :options="options"></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox :icon-size="18" round v-model="defaultFlag"/>
          </template>
        </van-field>
      </van-form>
      <van-action-bar>
        <van-action-bar-button @click="remove">删除</van-action-bar-button>
      </van-action-bar>
    </van-popup>
    <cp-radio-btn :options='options' v-model="gender"></cp-radio-btn>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--cp-bg);
  border-radius: 8px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      color: var(--cp-tip);
      margin-right: 20px;
      line-height: 30px;
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
        width: 80px;
        margin-right: 0;
      }
      &.id {
        color: var(--cp-text2);
        width: 180px;
      }
    }
  }
  .icon {
    color: var(--cp-tag);
    width: 20px;
    text-align: center;
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 30px;
    height: 16px;
    font-size: 10px;
    color: #fff;
    background-color: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.selected {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 80%;
      height: 100%;
    }
  }
}
.patient-page {
  padding: 46px 0 80px;
  :deep() {
    .van-popup {
      width: 100%;
      height: 100%;
      padding-top: 46px;
      box-sizing: border-box;
    }
  }
}
// 底部操作栏
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
.patient-change {
  padding: 15px;
  > h3 {
    font-weight: normal;
    margin-bottom: 5px;
  }
  > p {
    color: var(--cp-text3);
  }
}
.patient-next {
  padding: 15px;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-sizing: border-box;
}
</style>