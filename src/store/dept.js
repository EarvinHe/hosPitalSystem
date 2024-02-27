// 该dept小仓库引入的依次是查询科室,分页查询科室，添加科室,
// 删除科室,修改科室,根据deptId查询科室的接口
import { reqAllDepts,reqPageQuery,reqAddDept,reqDeleteDept,
     reqUpdateDept,reqQueryById} from "../api/index";

const state = {
    // 存储请求返回的数据到仓库，初始为空,
    // 是否为字符串或者对象还是数组得看请求的数据是什么样子的
    deptData: [],
    // 分页查询的数据
    pageData:{},
    // 按需（id）查询的数据
    singleData:{}
}
const mutations = {
  // 将数据存储，deptInfo实际上是请求返回的result.data
  SHOWALLDEPTS(state, deptData) {
    state.deptData = deptData;
},

// 分页查询科室
SHOWPAGEDEPTS(state,pageData){
    state.pageData = pageData;
},

// 将按id查询到的科室数据存储在state中
SHOWDEPTBYID(state,singleData){
    state.singleData = singleData;
}

}
const actions = {

    // 在科室管理页面展示所有科室
    async showAllDepts({ commit }) {
        let result = await reqAllDepts();
        if (result.flag == true) {
            commit('SHOWALLDEPTS', result.data)
        }else{
            // console.log(result.msg)
            return result.msg
        }
        
    },

    // 在科室管理页面分页查询展示所有科室
    async showPageDepts({commit},data){
        let result =  await reqPageQuery(data);
        if (result.flag == true) {
            commit('SHOWPAGEDEPTS', result.data)
        }else{
            // console.log(result.msg)
            return result.msg
        }
    },

    //根据deptId查询科室
    async showDeptById({commit},deptId){
        let result = await reqQueryById(deptId);
        if(result.flag == true){
            commit('SHOWDEPTBYID',result)
        }else{
            // console.log(result.msg)
            return result.msg
        }
    },

    // 添加科室
    async addDept({commit},data){
        let result = await reqAddDept(data);
        if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },

    // 删除科室Id/批量删除
    async deleteDept({commit},deptId){
        let result = await reqDeleteDept(deptId);
        if(result.flag == true){
            return 'ok'
        }else{
            // console.log(result.msg)
            return result.msg
        }
    },

    // 批量删除科室
    // async deleteSomeDepts({commit},ids){
    //     let result = await reqDeleteDept(ids);
    //     if(result.flag == true){
    //         return 'ok'
    //     }
    // }

    // 修改科室
    async updateDept({commit},data){
        let result = await reqUpdateDept(data);
        if(result.flag == true){
            return 'ok'
        }else{
            // console.log(result.msg)
            return result.msg
        }
    }

}
const getters = {
    // 计算属性，将其数据简化，在组件中方便使用
    //当前形参中的state，当前仓库中的state，并非vuex中的打仓库state,
    // data:这是后端传过来的数据名字就叫data
    deptData(state){
        return state.deptData||[];
    },
    pageData(state){
        return state.pageData
    },
    singleData(state){
        return state.singleData.data
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}