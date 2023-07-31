import { reqQueryNotice,reqAddNotice,reqDeleteNotice ,reqUpdateQueryNotice,reqUpdateNotice} from "../api/index";
const state = {
   noticeData:{},
   noticeData2:{}
}
const mutations = {
    SHOWNOTICE(state,noticeData){
        state.noticeData = noticeData
    },

    QUERYNOTICE(state,noticeData2){
        state.noticeData2 = noticeData2
    }
}
const actions = {
    // 请求分页查询通知
    async showNotice({commit},params){
        let result = await reqQueryNotice(params);
        if(result.flag == true){
            commit('SHOWNOTICE',result.data)
        }else{
            return result.msg
        }
    },

    // 请求添加通知
    async addNotice({commit},data){
        let result = await reqAddNotice(data);
        if(result.flag == true){
           return 'ok'
        }else{
            return result.msg
        }
    },

      // 请求删除通知
      async deleteNotice({commit},noticeId){
        let result = await reqDeleteNotice(noticeId);
        if(result.flag == true){
           return 'ok'
        }else{
            return result.msg
        }
    },

    //根据id查询通知
    async updateQueryNotice({commit},noticeId){
        let result = await reqUpdateQueryNotice(noticeId);
        if(result.flag==true){
            commit('QUERYNOTICE',result.data)
        }else{
            return result.msg
        }
    },

    // 修改通知
    async updateNotice({commit},data){
        let result = await reqUpdateNotice(data);
        if(result.flag==true){
          return 'ok'
        }else{
            return result.msg
        }
    }

}
const getters = {
    noticeData(state){
        return state.noticeData
    },
    noticeData2(state){
        return state.noticeData2
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}