import type { User,CodeType,UserInfo,PatientList,Patient } from '@/types/user'
import { request } from '@/utils/request'

// 密码登录
export const loginByPassword = (mobile: string, password: string) =>
  request<User>('/login/password', 'POST', { mobile, password })
  //发送验证码
  export const sendMobileCode = (mobile: string, type: CodeType) =>
    request('/code', 'GET', { mobile, type })
  //短信登陆
    export const loginByMobile = (mobile: string, code: string) =>
  request<User>('/login', 'POST', { mobile, code })
  //个人中心
  export const userInfo = ()=>request.get<UserInfo>('/patient/myUser')
  //获取患者信息
  export const getPatientList = () => request.get<PatientList>('/patient/mylist')
  //添加患者信息
  export const addPatient = (patient: Patient) => request('/patient/add', 'POST', patient)
  // 编辑患者信息
export const editPatient = (patient: Patient) => request('/patient/update', 'PUT', patient)
// 删除患者信息
export const delPatient = (id: string) => request(`/patient/del/${id}`, 'DELETE')
// 查询患者详情
export const getPatientDetail = (id: string) => request<Patient>(`/patient/info/${id}`)