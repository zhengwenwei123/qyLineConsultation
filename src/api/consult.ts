import type { KnowledgePage, KnowledgeParams,DoctorPage,PageParams,FollowType,TopDep,ConsultOrderPreParams,ConsultOrderPreData,PartialConsult,ConsultOrderItem
  ,ConsultOrderListParams,ConsultOrderPage
} from '@/types/consult'
import { request } from '@/utils/request'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)

  export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)
  export const followOrUnfollow = (id: string, type: FollowType = 'doc') =>
  request('/like', 'POST', { id, type })
  export const getAllDep = () => request<TopDep[]>('/dep/all')
  // 拉取预支付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', params)
// 生成订单
export const createConsultOrder = (data: PartialConsult) =>
  request<{ id: string }>('/patient/consult/order', 'POST', data)
// 获取支付地址  0 是微信  1 支付宝
export const getConsultOrderPayUrl = (params: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => request<{ payUrl: string }>('/patient/consult/pay', 'POST', params)
export const getConsultOrderDetail = (orderId: string) =>
  request<ConsultOrderItem>('/patient/consult/order/detail', 'GET', { orderId })
  // 查看处方
export const getPrescriptionPic = (id: string) =>
request<{ url: string }>(`/patient/consult/prescription/${id}`)
export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)
export const cancelOrder = (id:string)=>request.put(`/patient/order/cancel/${id}`)