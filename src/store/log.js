import {  reqQueryLog} from "../api/index";
const state = {
    loginLogData:{}
}
const mutations = {
    QUERYLOG(state,loginLogData){
        state.loginLogData = loginLogData
    }
}
const actions = {
    // 请求分页查询日志
    async queryLog({commit},{type,page,pageSize,logContent}){
        let result = await reqQueryLog(type,page,pageSize,logContent)
        if(result.flag == true){
            commit('QUERYLOG',result.data);
        }else{
            return result.msg
        }
    }

}
const getters = {
    loginLogData(state){
        return state.loginLogData
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}