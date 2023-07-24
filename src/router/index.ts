import {useUserStore} from '@/stores/index'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
NProgress.configure({
  showSpinner: false
})
router.beforeEach((to)=>{
  // const store = useUserStore()
  // if(!store.user.token && !['/login','/other'].includes(to.path)) return '/login'
  NProgress.start()
})
router.afterEach((to)=>{
  document.title = `${to.meta.title || ''}-优医问诊`
  NProgress.done()
})
export default router
