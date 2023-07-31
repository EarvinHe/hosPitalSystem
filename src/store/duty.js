import {  reqAllDutyCount,reqDutyWork,reqAddDuty,reqDutyWorkByDept,
    reqQueryUserByDeptId,reqDeleteWork} from "../api/index";
const state = {
   dutyData:{},
   dutyWorkData:{},
   userData:[],
   AlldutyWorkData:{}
}
const mutations = {
    DUTYCOUNT(state,dutyData){
        state.dutyData = dutyData
    },
    DUTYWORKDATA(state,AlldutyWorkData){
        // 首页AlldutyWorkData   
        state.AlldutyWorkData = AlldutyWorkData
    },

    DUTYWORKDATABYDEPT(state,dutyWorkData){
        // 根据科室
        state.dutyWorkData = dutyWorkData
    },
    // 根据科室id查user医生
    QUERYUSER(state,userData){
        state.userData = userData
    }

}
const actions = {
        // 查询值班人数
        async DutyCount({commit}){
            let result = await reqAllDutyCount()
            if(result.flag == true){
                commit('DUTYCOUNT',result.data)
            }else{
                return result.msg
            }
        },


        // 分页查询值班表(首页)
        async pageWork({commit},params){
            let result = await reqDutyWork(params);
            if(result.flag == true){
                commit('DUTYWORKDATA',result.data)
            }else{
                return result.msg
            }
        },

        // 分页查询值班表
        async pageWorkByDept({commit},{deptId, page,pageSize,realName}){
            let result = await reqDutyWorkByDept(deptId, page,pageSize,realName);
            if(result.flag == true){
                commit('DUTYWORKDATABYDEPT',result.data)
            }else{
                return result.msg
            }
        },

        // 添加值班室
        async addDuty({commit},data){
            let result = await reqAddDuty(data);
            if(result.flag == true){
                return 'ok'
            }else{
                return result.msg
            }
        },

        //根据科室id查医生id（添加）
        async queryUser({commit},deptId){
            let result = await reqQueryUserByDeptId(deptId);
            if(result.flag == true){
                commit('QUERYUSER',result.data)
            }else{
                return result.msg
            }
        },

        // 根据workId删除值班表
        async deleteWork({commit},workId){
            let result = await reqDeleteWork(workId);
            if(result.flag == true){
                return 'ok'
            }else{
                return result.msg
            }
        }
}
const getters = {
    dutyData(state){
        return state.dutyData
    },
    dutyWorkData(state){
        return state.dutyWorkData
    },
    AlldutyWorkData(state){
        return state.AlldutyWorkData
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}