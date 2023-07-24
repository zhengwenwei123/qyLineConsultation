import {defineStore} from 'pinia'
import type {PartialConsult} from '@/types/consult'
import type {ConsultType} from '@/enums/index'
import {ref} from 'vue'
export const useConsultStore = defineStore('cp-consult',()=>{
    const consult = ref<PartialConsult>({})
    //记录问诊类型
    const setType = (type:ConsultType)=>{
        consult.value.type = type
    }
    //记录问诊级别页面
    const setIllnessType = (type:0 | 1)=>{
        consult.value.illnessType = type
    }
    //设置科室
    const setDep = (id:string)=>{
        consult.value.depId = id
    }
    //设置描述病情
    const setIllness = (illness: Pick<PartialConsult, 'illnessDesc' | 'illnessTime' | 'consultFlag' | 'pictures'>)=>{
        consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    //设置患者
    const setPatient = (id:string)=>{
        consult.value.patientId = id
    }
    //设置优惠卷
    const setCoupon = (id?: string) => (consult.value.couponId = id)
    //清空记录
    const clear = ()=>{
        consult.value = {}
    }
    return { consult, setType, setIllnessType, setDep, setIllness, setPatient, setCoupon, clear }
},
{
    persist:true
})