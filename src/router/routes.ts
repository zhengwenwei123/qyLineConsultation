const routes = [
    {
      path:'/login',
      component:()=>import('@/views/login/index.vue')
    },
    {
      path:'/',
      component:()=>import('@/views/Layout/index.vue'),
      redirect:'/home',
      children:[
        {
          path:'/home',
          component:()=>import('@/views/Home/index.vue'),
          meta:{
            title:'首页'
          }
        },
        {
           path: '/article',
            component: () => import('@/views/Article/index.vue') ,
            meta:{
              title:'健康百科'
            }
          },
        { 
          path: '/notify',
           component: () => import('@/views/Notify/index.vue') ,
           meta:{
             title:'消息中心'
           }
          },
        { 
          path: '/user', 
          component: () => import('@/views/User/index.vue') ,
          meta:{
            title:'个人中心'
          }
        },
      ] ,

    },
    {
      path: '/user/patient',
      component: () => import('@/views/User/PatientPage.vue'),
      meta: { title: '家庭档案' }
    },
    {
      path: '/consult/fast',
      component: () => import('@/views/Consult/ConsultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/consult/dep',
      component: () => import('@/views/Consult/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/consult/illness',
      component: () => import('@/views/Consult/ConsultIllness.vue'),
      meta: { title: '病情描述' }
    },
    {
      path: '/consult/pay',
      component: () => import('@/views/Consult/ConsultPay.vue'),
      meta: { title: '问诊支付' }
    },
    {
      path:'/room',
      component:()=>import('@/views/Room/index.vue'),
      meta:{title:'问诊室'}
    },
    {
      path: '/user/consult',
      component: () => import('@/views/User/ConsultPage.vue'),
      meta: { title: '问诊记录' }
    },
    {
      path: '/order/pay',
      component: () => import('@/views/Order/OrderPay.vue'),
      meta: { title: '药品支付' }
    },
    {
      path: '/order/pay/result',
      component: () => import('@/views/Order/OrderPayResult.vue'),
      meta: { title: '药品支付结果' }
    },
    {
      path: '/order/:id',
      component: () => import('@/views/Order/OrderDetail.vue'),
      meta: { title: '药品订单详情' }
    },
    {
      path: '/medicine/express/2',
      component: () => import('@/views/Order/OrderLogistics.vue'),
      meta: { title: '物流详情' }
    }
  ]
  export default routes