import { followOrUnfollow,getPrescriptionPic } from '@/api/consult'
import type { FollowType } from '@/types/consult'
import {showImagePreview,onShowPrescription,showToast} from 'vant'
import { useClipboard } from '@vueuse/core'
import {useRouter,useRoute} from 'vue-router'
import { OrderType } from '@/enums'
import { getMedicalOrderDetail } from '@/api/medicine'
import type { OrderDetail } from '@/types/medicine'
import { onMounted, ref } from 'vue'
// 封装逻辑，规范 useXxx，表示使用某功能
export const useFollow = (type: FollowType = 'doc') => {
    const loading = ref(false)
    // {a, b} 类型，传值得时候 {a, b, c} 也可以，这是类型兼容：多的可以给少的
    const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
      loading.value = true
      try {
        await followOrUnfollow(item.id, type)
        item.likeFlag = item.likeFlag === 1 ? 0 : 1
      } finally {
        loading.value = false
      }
    }
    return { loading, follow }
  }
  // 封装查看处方逻辑
export const useShowPrescription = () => {
  const onShowPrescription = async (id?: string) => {
    if (id) {
      const res = await getPrescriptionPic(id)
      showImagePreview([res.data.url])
    }
  }
  return { onShowPrescription }
}
export const useCopy = ()=>{
  const { copy, isSupported } = useClipboard()
  const onCopy = (copyText:string)=>{
    if(!isSupported) return showToast('浏览器不支持复制')
    copy(copyText)
  }
  return {onCopy}
}
export const useMedicineDetail = (id:string)=>{
const order = ref<OrderDetail>()
const route = useRoute()
onMounted(async () => {
  const res = await getMedicalOrderDetail(id)
  order.value = res.data
})
  return {order}
}