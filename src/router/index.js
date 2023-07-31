// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router"
import store from "@/store"

import Home from "@/views/home/Home"
import Login from '@/views/login/Login'
import Regist from '@/views/regist/Regist'
import Dept from "@/views/dept/Dept"
import AddDept from '@/views/dept/AddDept'
import UpdateDept from '@/views/dept/UpdateDept'
import DrugList from '@/views/drug/DrugList'
import AddDrug from '@/views/drug/AddDrug'
import UpdateDrug from '@/views/drug/UpdateDrug'
import CheckDrug from '@/views/drug/CheckDrug'
import DrugDetail from '@/views/drug/DrugDetail'
import InCheckDrug from '@/views/drug/InCheckDrug'
import PatientList from '@/views/patient/PatientList'
import AddPatient from '@/views/patient/AddPatient'
import PatientRegist from '@/views/patient/PatientRegist'
import TriageList from '@/views/triage/TriageList'
import TriageDetail from '@/views/triage/TriageDetail'
import DiagnosisResult from '@/views/triage/DiagnosisResult'
import Log from '@/views/log/Log'
import Log2 from '@/views/log/Log2'
import DutyList from '@/views/duty/DutyList'
import DutyManager from '@/views/duty/DutyManager'
import AddDuty from '@/views/duty/AddDuty'
import NoticeList from '@/views/notice/NoticeList'
import AddNotice from '@/views/notice/AddNotice'
import UpdateNotice from '@/views/notice/UpdateNotice'
import FileList from '@/views/file/FileList'
import AddFile from '@/views/file/AddFile'
import test from '@/views/file/test'
import test1 from '@/views/file/test1'
import DownLoadPatient from '@/views/patient/DownLoadPatient'
import Carousel from '@/views/home/carousel'
Vue.use(VueRouter);

const routes = [
    {
        path:'/',//默认路径
        name:'home',
        // component: () => import ('../views/login/Login'),//懒加载
        component:Home
    },
    {
        path:'/carousel',//默认路径
        name:'carousel',
        // component: () => import ('../views/login/Login'),//懒加载
        component:Carousel
    },
 
    {
        path:'/login',//默认路径
        name:'login',
        // component: () => import ('../views/login/Login'),//懒加载
        component:Login
    },

    {
        path:'/regist',//默认路径
        name:'regist',
        // component: () => import ('../views/login/Login'),//懒加载
        component:Regist
    },

    {
        path:'/dept',//默认路径
        name:'dept',
        // component: () => import ('../views/login/Login'),//懒加载
        component:Dept
    },
    {
        path:'/addDept',//默认路径
        name:'addDept',
        // component: () => import ('../views/login/Login'),//懒加载
        component:AddDept
    },
    {
        // 路由传参，将选中的数据的deptId带给该页面
        path:'/updateDept/:deptId',//默认路径
        name:'updateDept',
        // component: () => import ('../views/login/Login'),//懒加载
        component:UpdateDept
    },

    {
        // 
        path:'/drugList',//默认路径
        name:'drugList',
        // component: () => import ('../views/login/Login'),//懒加载
        component:DrugList
    },
    {
        path:'/addDrug',//默认路径
        name:'addDrug',
        // component: () => import ('../views/login/Login'),//懒加载
        component:AddDrug
    },
    {
        // 路由传参，将选中的数据的deptId带给该页面
        path:'/updateDrug/:drugsId',//默认路径
        name:'updateDrug',
        // component: () => import ('../views/login/Login'),//懒加载
        component:UpdateDrug
    },

    {
        // 药品审核
        path:'/checkDrug',
        name:'checkDrug',
        component:CheckDrug
    },
    {
        // 药品审核详情
        path:'/drugDetail/:drugsId',
        name:'drugDetail',
        component:DrugDetail
    },
    {
        // 药品审核详情
        path:'/inCheckDrug/:drugsId',
        name:'inCheckDrug',
        component:InCheckDrug
    },

    {
        // 
        path:'/patientList',//默认路径
        name:'patientList',
        // component: () => import ('../views/login/Login'),//懒加载
        component:PatientList
    },
    {
        // 
        path:'/addPatient',//默认路径
        name:'addPatient',
        // component: () => import ('../views/login/Login'),//懒加载
        component:AddPatient
    },

    {
        // 
        path:'/patientRegist',//默认路径
        name:'patientRegist',
        // component: () => import ('../views/login/Login'),//懒加载
        component:PatientRegist
    },

    {
        // 
        path:'/triageList',//默认路径
        name:'triageList',
        // component: () => import ('../views/login/Login'),//懒加载
        component:TriageList
    },
    {
        // 
        path:'/triageDetail/:deptId',//默认路径
        // path:'/triageDetail',//默认路径
        name:'triageDetail',
        // component: () => import ('../views/login/Login'),//懒加载
        component:TriageDetail
    },
    {
        // 
        path:'/diagnosisResult',//默认路径
        // path:'/triageDetail',//默认路径
        name:'diagnosisResult',
        // component: () => import ('../views/login/Login'),//懒加载
        component:DiagnosisResult
    },
    {
        path:'/log',//默认路径
        // path:'/triageDetail',//默认路径
        name:'log',
        // component: () => import ('../views/login/Login'),//懒加载
        component:Log
    },
    {
        path:'/log2',//默认路径
        // path:'/triageDetail',//默认路径
        name:'log2',
        // component: () => import ('../views/login/Login'),//懒加载
        component:Log2
    },
    {
        path:'/dutyList',//默认路径
        // path:'/triageDetail',//默认路径
        name:'dutyList',
        // component: () => import ('../views/login/Login'),//懒加载
        component:DutyList
    },
    {
        path:'/dutyManager/:deptId',//默认路径
        // path:'/triageDetail',//默认路径
        name:'dutyManager',
        // component: () => import ('../views/login/Login'),//懒加载
        component:DutyManager
    },
    {
        path:'/addDuty/:deptId',//默认路径
        // path:'/triageDetail',//默认路径
        name:'addDuty',
        // component: () => import ('../views/login/Login'),//懒加载
        component:AddDuty
    },
    {
        path:'/noticeList',//默认路径
        // path:'/triageDetail',//默认路径
        name:'noticeList',
        // component: () => import ('../views/login/Login'),//懒加载
        component:NoticeList
    },
    {
        path:'/addNotice',//默认路径
        // path:'/triageDetail',//默认路径
        name:'addNotice',
        // component: () => import ('../views/login/Login'),//懒加载
        component:AddNotice
    },
    {
        path:'/updateNotice',//默认路径
        // path:'/triageDetail',//默认路径
        name:'updateNotice',
        // component: () => import ('../views/login/Login'),//懒加载
        component:UpdateNotice
    },
    {
        path:'/fileList',//默认路径
        // path:'/triageDetail',//默认路径
        name:'fileList',
        // component: () => import ('../views/login/Login'),//懒加载
        component:FileList
    },
    {
        path:'/addFile',//默认路径
        // path:'/triageDetail',//默认路径
        name:'addFile',
        // component: () => import ('../views/login/Login'),//懒加载
        component:AddFile
    },
    {
        path:'/test',//默认路径
        // path:'/triageDetail',//默认路径
        name:'test',
        // component: () => import ('../views/login/Login'),//懒加载
        component:test
    },
    {
        path:'/test1',//默认路径
        // path:'/triageDetail',//默认路径
        name:'test1',
        // component: () => import ('../views/login/Login'),//懒加载
        component:test1
    },

    {
        path:'/downLoadPatient',//默认路径
        // path:'/triageDetail',//默认路径
        name:'downLoadPatient',
        // component: () => import ('../views/login/Login'),//懒加载
        component:DownLoadPatient
    },
]

// 配置路由
const router = new VueRouter({
    mode: 'history',
  base: process.env.BASE_URL,
    routes,
 /*    scrollBehavior(to, from, savedPosition) {
        return { y: 100 };
    } */

});

// 备份push和replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.push;

// 重写push/replace方法
// 第一步（第一个参数）：告诉原来的push方法，你往哪里跳转，（传递哪些参数）
// 第二个参数：成功回调
// 第三个参数：失败回调
// call/aplly的区别
// 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点：call与aplly传递参数：call传递参数用逗号隔开，aplly方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

//路由守卫
router.beforeEach((to,from,next)=>{
    const token = store.state.user.userToken
    const name = store.state.user.userName
    // 管理系统常见的两个金典逻辑：
    // 1.如果用户访问登录页面，但token已经存在，跳转到首页
    if(token){
        // token存在的情况：
        // (1)已经存在token还访问login：
        if(to.path === '/login'){
            next('/')//那么重定向到首页
        }else{
            // 已经有token，但去的不是登录
            // 那么如果用户名已存在，放行
            if(name){
                next()
            }else{
                // 用户名不存在：（有可能localStorage中的用户名被误操作所清除）
                //只能重新登录一遍
                next('/login')
            }
        }
    }else{
        // 如果token不存在，明显未登录
        // 但是还要往其他页面跳转
        if(to.path !== '/login'){
            // 强制往登录跳转
            next('/login')
            return
        }
       
    }
    next()
})


  /*   if(to.path === '/login' && token){
        next('/')
        return
    }
    // 2.如果访问的不是登录页面，但是没有token，跳转岛登录页面
    if(to.path !== '/login' && !token){
        next('/login')
        return
    }
    next() */


export default router;