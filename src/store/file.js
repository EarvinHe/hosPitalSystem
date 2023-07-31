import { reqQueryFile, reqDeleteFile,reqDownLoad } from "../api/index";
const state = {
    fileData: {}
}
const mutations = {
    QUERYFILE(state, fileData) {
        state.fileData = fileData
    }
}
const actions = {
    // 请求分页查询日志
    async QueryFile({ commit }, params) {
        let result = await reqQueryFile(params);
        if (result.flag == true) {
            commit('QUERYFILE', result.data)
        } else {
            return result.msg
        }
    },

    //删除文件
    async deleteFile({ commit }, fileId) {
        let result = await reqDeleteFile(fileId);
        if (result.flag == true) {
            return 'ok'
        } else {
            return result.msg
        }
    },

    // 下在文档
    async downLoad({commit},fileId){
        let result = await reqDownLoad(fileId);
        return result
        
    }

    /*     // 上传文件
        async addFile({commit},formData){
            let result = await reqAddFile(formData);
            if(result.flag == true){
                return 'ok'
            }else{
                return result.msg
            }
        } */


}
const getters = {
    fileData(state) {
        return state.fileData
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}