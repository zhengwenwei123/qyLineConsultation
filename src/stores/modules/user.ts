//存储登录用户相关数据
import {defineStore} from 'pinia'
import type {User} from '../../types/user'
import {ref} from 'vue'
export const useUserStore = defineStore('cp-user',()=>{
    const user = ref({} as User)
    //方法
    //存储用户信息
    const setUser = (u:User)=>{
        user.value = u     
    }
    const delUser = ()=>{
        user.value = {} as User
    }
    return {
        user,
        setUser,
        delUser
    }
},{
    persist:{
        key:'cp-user-150',
        paths:['user']
    }
})