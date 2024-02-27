import { reqAllDrugs,reqAddDrug,reqUpdateDrug,
    reqQueryDrugById,reqDeleteDrugById,reqCheckDrug,reqChangeStatus,
    reqSubmitCheck,reqAllInCheckDrugs } from "@/api";

const state = {
    inCheckData:{},
    drugData:{},
    singleDrug:{}
}

const mutations = {
    SHOWALLDRUGS(state,drugData){
        state.drugData = drugData
    },
    // 修改页面展示要修改的药品数据
    SHOWONEDRUG(state,singleDrug){
        state.singleDrug = singleDrug
    },
    //审核中的数据
    QUERUALLINCHECKDRUGS(state,inCheckData){
        state.inCheckData=inCheckData
    }
}

const actions = {
    //分页查询所有药品
    async showAllDrugs({commit},params){
        let result = await reqAllDrugs(params);
        if(result.flag == true){
            commit('SHOWALLDRUGS',result.data)
        }else{
            return result.msg
        }
    },

    // 添加药品
    async addDrugs({commit},data){
        let result  = await reqAddDrug(data);
        if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },

    // 修改药品
    async updateDrugs({commit},data){
        let result = await reqUpdateDrug(data);
        if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },

    // 根据id查询
    async showOneDrug({commit},drugsId){
        let result  = await reqQueryDrugById(drugsId)
        if(result.flag == true){
            commit('SHOWONEDRUG',result.data)
        }else{
            return result.msg
        }
    },

    // 根据id删除药品
    async deleteOneDrug({commit},drugsIds){
        let result = await reqDeleteDrugById(drugsIds);
        if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },

    // 提交审核药品
    async checkDrug({commit},data){
        let result = await reqCheckDrug(data);
        if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },

    // 修改药品状态
    async changeSaleStatus({commit},{status,drugsId}){
        let result = await reqChangeStatus(status,drugsId);
        if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },
      // 提交审核药品结果
      async submitCheck({commit},data){
        let result = await reqSubmitCheck(data);
        if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },

    //查询所有审核中的药品
    async queryAllIncheckDrugs({commit},data){
        let result = await reqAllInCheckDrugs(data)
        if(result.flag == true){
            commit('QUERUALLINCHECKDRUGS',result.data)
        }else{
            return result.msg
        }
    }
    
}

const getters = {
    drugData(state){
        return  state.drugData
    },
    inCheckData(state){
        return state.inCheckData
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}