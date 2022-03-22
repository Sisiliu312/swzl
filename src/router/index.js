import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes=[
  {
    path:'/',
    redirect:"/Home"
  },
  {
    path:'/Home',
    name:'Home',
    component:() => import('../views/Home.vue')
  },
  {
    path:'/Gerenzhongxin',
    name:'Gerenzhongxin',
    component:() => import('../views/Gerenzhongxin.vue')
  },
  {
    path:'/Sample1/:id',
    name:'Sample1',
    component:() => import('../views/Sample1.vue')
  },
  {
    path:'/Sample2',
    name:'Sample2',
    component:() => import('../views/Sample2.vue')
  },
  {
    path:'/Xinjian',
    name:'Xinjian',
    component:() => import('../views/Xinjian.vue')
  },
  {
    path:'/Zhaolingtie',
    name:'Zhaolingtie',
    component:() => import('../views/Zhaolingtie.vue')
  },
  {
    path:'/Xunwutie',
    name:'Xunwutie',
    component:() => import('../views/Xunwutie.vue')
  },
  {
    path:'/Pipeitongzhi',
    name:'Pipeitongzhi',
    component:() => import('../views/Pipeitongzhi.vue')
  },
  {
    path:'/Wodefabu',
    name:'Wodefabu',
    component:() => import('../views/Wodefabu.vue')
  },
  {
		path:'/login',
    name:'login',
		component: r=>require.ensure([],()=>r(require('@/views/Login_')),'login')
	}
]
const router =new VueRouter({
    routes
})

router.beforeEach((to,from,next)=>{

  if(to.path=='/login'){
    next();
  }else{

    // 如果有浏览器存有token
	if(store.state.token){
    // 如果是登录页面则返回shouye
		if(to.path == "/login"){
			next({path: '/'})
		}
    // 不是登录页面 那么判断是否有userInfo
    else{
      if(store.state.userInfo==null){
        var token = store.state.token
        console.log(token)
        console.log(store.state.userInfo)
        store.dispatch("getUserInfo",token).then(res=>{
          next();
        }).catch((err)=>{
          next({path:'/login'})
        })
      }else{
        next();
      }
		}
		
	}
  //如果没有token 则跳到登录页
  else {
    next({path:'/login'})
  }
  
  }

  
})

export default router
