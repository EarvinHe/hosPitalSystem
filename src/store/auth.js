import {  reqAllAuth} from "../api/index";
const state = {
   allAuths:[]
}
const mutations = {
    //注册时将查询到的职位保存在vuex中
    QUERYALLAUTH(state,allAuths){
        state.allAuths = allAuths
    }
}
const actions = {
    // 注册时查询所有职位
    async queryAllAuth({commit}){
        let result = await reqAllAuth();
        console.log(result)
        if(result.flag == true){
            commit('QUERYALLAUTH',result.data)
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