// 该user小仓库引入的依次是用户注册，与用户注册页面有关的查询科室，用户登出的接口
// 但登录功能直接写在了login组件当中，因为并没有用到仓库,
// 最后又加上了loginApi因为发现要借用该请求存储userId到state
import { setToken,getToken,removeToken,setUserName,gettUserName,removeUsername,setUserData,getUserData, removeUserData } from "@/util/token";
import { loginApi, reqUserRegist, reqAllDepts,reqLogout,reqAllDoctors} from "../api/index";
const state = {
    // 存储请求返回的数据到仓库，初始为空,
    // 是否为字符串或者对象还是数组得看请求的数据是什么样子的
    deptInfo: {},
    userName:gettUserName(),
    userToken:getToken(),
    userData:getUserData(),
    doctorsData:[]
}
const mutations = {

    // 用户登录
    USERLOGIN(state,userToken){
        state.userToken = userToken
    },


    //存储userId,userName
    SETUSERDATA(state,userName){
        state.userName = userName
    },
    SETUSERDATA1(state,userData){
        state.userData = userData
    },

    // 将数据存储，deptInfo实际上是请求返回的result.data
    SELECTALLDEPTS(state, deptInfo) {
        state.deptInfo = deptInfo;
    },

    // 退出登录时，同时清除本地存储的user信息
    USERLOGOUT(state){
        state.userName=''
        state.userToken ='',
        state.userData=[],
        removeUserData(),
        removeToken();
        removeUsername();
    },

    ALLDOCTORS(state,doctorsData){
        state.doctorsData = doctorsData
    }
}
const actions = {

    // 用户登录(token)
    async userLogin({commit},data){
        let result = await loginApi(data);
        // console.log(result.data)
        if(result.flag == true){
            commit('USERLOGIN',result.data.token)
            // 持久化存储token
            setToken(result.data.token)

            commit('SETUSERDATA1',result.data.user)
            setUserData(JSON.stringify( result.data.user))
            // 持久化存储用户信息
            commit('SETUSERDATA',result.data.user.userName)
            setUserName(result.data.user.userName)
            return 'ok';
        }else{
            return result.msg
        }
    },

    //用户注册(该方法是注册页面下的userRegist，即注册按钮触发)
    async userRegist({ commit }, data) {
        let result = await reqUserRegist(data);
        if(result.flag == true){
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 在注册页面展示时查询所有科室
    async selectAllDepts({ commit }, data) {
        let result = await reqAllDepts(data);
        if (result.flag == true) {
            commit('SELECTALLDEPTS', result.data)
        }
    },

    // 用户登出,没有参数data，无须在{commit}后加参数(为区分前面的请求，user改为了doctor)
    async userLogout({commit}){
        let result = await reqLogout();
        if(result.flag == true){
            commit('USERLOGOUT')
        }else{
            return result.msg
        }
    },

    // 根据科室id分页查询所有医生
    async queryAllDoctors({commit},{deptId,page,pageSize,realName}){
        let result = await reqAllDoctors(deptId,page,pageSize,realName);
        if(result.flag == true){
            commit('ALLDOCTORS',result.data)
        }else{
            return result.msg
        }
    }
}
const getters = {
    // 计算属性，将其数据简化，在组件中方便使用
    //当前形参中的state，当前仓库中的state，并非vuex中的打仓库state,
    // data:这是后端传过来的数据名字就叫data
    deptInfo(state){
        return state.deptInfo;
    },
    userName(state){
        return state.userName
    },
    // 用户（医生）信息
    doctorsData(state){
        return state.doctorsData
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}