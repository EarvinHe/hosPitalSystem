import {  reqAllAuth,reqAllMenu,reqAddAuth,reqDeleteAuth,reqUpdateAuth} from "../api/index";
const state = {
   allAuths:[],
   allMenu:[]
}
const mutations = {
    //注册时将查询到的职位保存在vuex中
    QUERYALLAUTH(state,allAuths){
        state.allAuths = allAuths
    },

    // 查询所有权限
    REQALLMENU(state,allMenu){
        state.allMenu = allMenu
    }
}
const actions = {
    // 注册和职位模块时查询所有职位
    async queryAllAuth({commit}){
        let result = await reqAllAuth();
        console.log(result)
        if(result.flag == true){
            commit('QUERYALLAUTH',result.data)
        }else{
            return result.msg
        }
    },

    // 查询所有权限
    async reqAllMenu({commit}){
        let result = await reqAllMenu();
        console.log(result)
        if(result.flag == true){
            commit('REQALLMENU',result.data)
        }else{
            return result.msg
        }
    },

     // 添加职位
     async addAuth({commit},data){
        let result = await reqAddAuth(data);
        console.log(result)
        if(result.flag == true){
           return 'ok'
        }else{
            return result.msg
        }
    },

    // 删除职位
    async deleteAuth({commit},authId){
        let result = await reqDeleteAuth(authId)
        if(result.flag == true){
            return 'ok'
         }else{
             return result.msg
         }
    },
    
    //修改职位
    async updateAuth({commit},data){
        let result = await reqUpdateAuth(data)
        if(result.flag == true){
            return 'ok'
         }else{
             return result.msg
         }
    }
  

}
const getters = {
   
}

export default {
    state,
    mutations,
    actions,
    getters,
}