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
    path:'/MyInfo',
    name:'MyInfo',
    component:() => import('../views/MyInfo.vue')
  },
  {
    path:'/PostDetail/:id',
    name:'PostDetail',
    component:() => import('../views/PostDetail.vue')
  },
  {
    path:'/Create',
    name:'Create',
    component:() => import('../views/Create.vue')
  },
  {
    path:'/CreatePost',
    name:'CreatePost',
    component:() => import('../views/CreatePost.vue')
  },
  {
    path:'/CreateAsk',
    name:'CreateAsk',
    component:() => import('../views/CreateAsk.vue')
  },
  {
    path:'/MyMessage',
    name:'MyMessage',
    component:() => import('../views/MyMessage.vue')
  },
  {
    path:'/MyPublish',
    name:'MyPublish',
    component:() => import('../views/MyPublish.vue')
  },
  {
		path:'/login',
    name:'login',
		component: r=>require.ensure([],()=>r(require('@/views/Login')),'login')
	},
  {
		path:'/EditInfo',
    name:'EditInfo',
		component: r=>require.ensure([],()=>r(require('@/views/EditInfo')),'EditInfo')
	},
  {
		path:'/FeedbackQ',
    name:'FeedbackQ',
		component: r=>require.ensure([],()=>r(require('@/views/FeedbackQ')),'FeedbackQ')
	},
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
