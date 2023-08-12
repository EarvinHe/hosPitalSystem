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
import Carousel from '@/views/home/carousel'
import Users from '@/views/superManager/Users'
import UserList from '@/views/superManager/UserList'
import Auth from '@/views/superManager/Auth'
import { showMessage } from "@/util/message";
import { getToken } from "@/util/token";
Vue.use(VueRouter);

const routes = [
    {
        path: '/',//默认路径
        name: 'home',
        // component: () => import ('../views/login/Login'),//懒加载
        component: Home
    },
    {
        path: '/carousel',//默认路径
        name: 'carousel',
        // component: () => import ('../views/login/Login'),//懒加载
        component: Carousel
    },

    {
        path: '/login',//默认路径
        name: 'login',
        // component: () => import ('../views/login/Login'),//懒加载
        component: Login
    },

    {
        path: '/regist',//默认路径
        name: 'regist',
        // component: () => import ('../views/login/Login'),//懒加载
        component: Regist
    },

    {
        path: '/dept',//默认路径
        name: 'dept',
        // component: () => import ('../views/login/Login'),//懒加载
        component: Dept
    },
    {
        path: '/addDept',//默认路径
        name: 'addDept',
        // component: () => import ('../views/login/Login'),//懒加载
        component: AddDept
    },
    {
        // 路由传参，将选中的数据的deptId带给该页面
        path: '/updateDept/:deptId',//默认路径
        name: 'updateDept',
        // component: () => import ('../views/login/Login'),//懒加载
        component: UpdateDept
    },

    {
        // 
        path: '/drugList',//默认路径
        name: 'drugList',
        // component: () => import ('../views/login/Login'),//懒加载
        component: DrugList
    },
    {
        path: '/addDrug',//默认路径
        name: 'addDrug',
        // component: () => import ('../views/login/Login'),//懒加载
        component: AddDrug
    },
    {
        // 路由传参，将选中的数据的deptId带给该页面
        path: '/updateDrug/:drugsId',//默认路径
        name: 'updateDrug',
        // component: () => import ('../views/login/Login'),//懒加载
        component: UpdateDrug
    },

    {
        // 药品审核
        path: '/checkDrug',
        name: 'checkDrug',
        component: CheckDrug
    },
    {
        // 药品审核详情
        path: '/drugDetail/:drugsId',
        name: 'drugDetail',
        component: DrugDetail
    },
    {
        // 药品审核详情
        path: '/inCheckDrug/:drugsId',
        name: 'inCheckDrug',
        component: InCheckDrug
    },

    {
        // 
        path: '/patientList',//默认路径
        name: 'patientList',
        // component: () => import ('../views/login/Login'),//懒加载
        component: PatientList
    },
    {
        // 
        path: '/addPatient',//默认路径
        name: 'addPatient',
        // component: () => import ('../views/login/Login'),//懒加载
        component: AddPatient
    },

    {
        // 
        path: '/patientRegist',//默认路径
        name: 'patientRegist',
        // component: () => import ('../views/login/Login'),//懒加载
        component: PatientRegist
    },

    {
        // 
        path: '/triageList',//默认路径
        name: 'triageList',
        // component: () => import ('../views/login/Login'),//懒加载
        component: TriageList
    },
    {
        // 
        path: '/triageDetail/:deptId',//默认路径
        name: 'triageDetail',
        // component: () => import ('../views/login/Login'),//懒加载
        component: TriageDetail
    },
    {
        // 
        path: '/diagnosisResult',//默认路径
        name: 'diagnosisResult',
        // component: () => import ('../views/login/Login'),//懒加载
        component: DiagnosisResult
    },
    {
        path: '/log',//默认路径
        name: 'log',
        // component: () => import ('../views/login/Login'),//懒加载
        component: Log
    },
    {
        path: '/log2',//默认路径
        name: 'log2',
        // component: () => import ('../views/login/Login'),//懒加载
        component: Log2
    },
    {
        path: '/dutyList',//默认路径
        name: 'dutyList',
        // component: () => import ('../views/login/Login'),//懒加载
        component: DutyList
    },
    {
        path: '/dutyManager/:deptId',//默认路径
        name: 'dutyManager',
        // component: () => import ('../views/login/Login'),//懒加载
        component: DutyManager
    },
    {
        path: '/addDuty/:deptId',//默认路径
        name: 'addDuty',
        // component: () => import ('../views/login/Login'),//懒加载
        component: AddDuty
    },
    {
        path: '/noticeList',//默认路径
        name: 'noticeList',
        // component: () => import ('../views/login/Login'),//懒加载
        component: NoticeList
    },
    {
        path: '/addNotice',//默认路径
        name: 'addNotice',
        // component: () => import ('../views/login/Login'),//懒加载
        component: AddNotice
    },
    {
        path: '/updateNotice',//默认路径
        name: 'updateNotice',
        // component: () => import ('../views/login/Login'),//懒加载
        component: UpdateNotice
    },
    {
        path: '/fileList',//默认路径
        name: 'fileList',
        // component: () => import ('../views/login/Login'),//懒加载
        component: FileList
    },
    {
        path: '/addFile',//默认路径
        name: 'addFile',
        // component: () => import ('../views/login/Login'),//懒加载
        component: AddFile
    },

    // 用户管理模块（超级管理员）
    {
        path: '/users',//默认路径U
        name: 'users',
        // component: () => import ('../views/login/Login'),//懒加载
        component: Users
    },

    {
        path: '/userList/:deptId',//默认路径U
        name: 'userList',
        // component: () => import ('../views/login/Login'),//懒加载
        component: UserList
    },
    {
        path: '/auth',//默认路径U
        name: 'auth',
        // component: () => import ('../views/login/Login'),//懒加载
        component: Auth
    },
]

// 配置路由
const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
    /*    scrollBehavior(to, from, savedPosition) {
           return { y: 100 };
       } */

});

// 备份push和replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

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
router.beforeEach((to, from, next) => {
    const token = getToken()
    // 管理系统常见的两个金典逻辑：
    // 1.如果用户访问登录页面，但token已经存在，跳转到首页
    if (token) {
        // token存在的情况：
        // (1)已经存在token还访问login：
        if (to.path == '/login') {
            next('/')//那么重定向到首页
        }
    }
    else {
        // 如果token不存在，明显未登录或者未注册
        // 但是还要往其他页面跳转
        /*  if (to.path !== '/login' && to.path !== '/regist') {
             // 该if语句表示只有login和regist放行，如果去的不是这两，那么强制去登录页 
                 console.log(111)  
                 next('/login')
         } */
        if (to.path == "/login" || to.path == "/regist") {
            // 用户未登录或未注册，访问的是登录页或注册页，放行
            next();
        } else {
            // 用户未登录，访问的是其他页面，重定向到登录页,并弹出错误信息
            // showMessage('请先登录再试')
            next("/login");
        }
        // next()
    }
    next()
}
)

export default router;