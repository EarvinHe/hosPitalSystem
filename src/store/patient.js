import { reqAllPatients,reqAddPatient,reqDeletePatientById,reqUpdatePatient,
    reqQueryPatientById,reqPatientRegist,reqPatientDept,reqUpdatePatientStatus,
    reqQueryPatientresult,reqDownLoadPatient,reqOverPatientCount } from "@/api";

const state = {
    patientData:{},
    // patientCounts:[]
    patientDeptData:{},
    overCount:[]
}

const mutations = {
    // 分页查询患者
    QUERYALLPATIENTS(state,patientData){
        state.patientData = patientData
    },

    // 根据科室id查询患者人数
    // PATIENTCOUNT(state,patientcount){
    //     state.patientCounts.push(patientcount)
    //     // state.patientCount = patientCount
    // }

    QUERYPATIENTBYDEPTID(state,patientDeptData){
        state.patientDeptData = patientDeptData
    },

    QUERYOVERCOUNT(state,overCount){
        state.overCount = overCount
    }
}

const actions = {  
        // 分页查询所有患者
    async queryAllPatients({commit},params){
        let result = await reqAllPatients(params);
        if(result.flag == true){
            commit('QUERYALLPATIENTS',result.data)
        }else{
            return result.msg
        }
    },

    // 添加患者
    async addPatient({commit},data){
        let result = await reqAddPatient(data);
        if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },

    // 根据id删除患者
    async deletePatientById({commit},ids){
        let result = await reqDeletePatientById(ids);
        if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },

    // 根据id查询患者
    async queryPatientById({commit},data){
         let result = await reqQueryPatientById(data);
         if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },

    // 根据id修改患者
    async updatePatient({commit},data){
        let result = await reqUpdatePatient(data);
        if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },

    // 挂号
    async patientRegister({commit},data){
        let result = await reqPatientRegist(data);
        if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },

    // 根据科室id查患者人数(太麻帆，已作废)
    // async patientCount({commit},deptId){
    //     let result = await reqPatientCount(deptId)
    //     if(result.flag == true){
    //         commit('PATIENTCOUNT',result.data)
    //     }
    // }
    
    //根据科室id分页查询所有患者 
    async queryPatientByDeptId({commit},{deptId, page,pageSize}){
        let result = await reqPatientDept(deptId,page,pageSize)
        if(result.flag == true){
            commit('QUERYPATIENTBYDEPTID',result.data);
        }else{
            return result.msg
        }
    },

    // 叫号修改患者诊断状态
    async updatePatientStatus({commit},{status,id}){
        let result = await reqUpdatePatientStatus(status,id);
        if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },

    // 诊断结果
    async resultPatient({commit},{id,diagnosisResult}){
        let result = await reqQueryPatientresult(id,diagnosisResult)
        if(result.flag == true){
            return 'ok'
        }else{
            return result.msg
        }
    },

    // 下载患者诊断书
    async downLoadPatient({commit},{patientId,deptId}){
        let result = await reqDownLoadPatient(patientId,deptId)
    },

    // 查看已经有计科诊断结束
    async queryOverCount({commit},patientId){
        let result = await reqOverPatientCount(patientId);
        if(result.flag==true){
            commit('QUERYOVERCOUNT',result.data)
        }else{
            return result.msg
        }
    }
    
}

const getters = {
   patientData(state){
        return state.patientData
    },
    patientCounts(state){
        return state.patientCounts
    },
    patientDeptData(state){
        return state.patientDeptData
    },
    overCount(state){
        return state.overCount
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}