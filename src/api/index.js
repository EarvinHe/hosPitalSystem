import requests, { post } from './request'
// 登录功能 
/* userName true 普通参数 string 用户名
passWord true 普通参数 string 密码 */
export const loginApi = (data) => requests({
    // user表下面查询用户
    url: '/user/login', method: 'post', data
    , header: {    
        'Content-Type': 'application/json'
    }
})

// // 获取验证码请求（暂时作废）
// export const getChangeCaptcha = () => requests({ url: '/user/code',
//  method: 'get' });

// 用户注册 url：/user/register 参数：
export const reqUserRegist = (data) => requests({
    url: '/user/register', data, method: 'post'
})

// 查询所有科室（分诊管理，科室管理）
export const reqAllDepts = (data) => requests({
    url: '/dept', data, method: 'get'
})
// 查询所有科室+部门（用户管理）
export const reqAllDeptAndUser = () => requests({
    url: 'user/dept', method: 'get'
})
// 注册查询科室
export const reqDeptWhenRegist = ()=>requests({
    url:'/dept/list',method:'get',
})

// export const reqAllDepts = () => requests({
//     url:'/dept',method:'get'
// })

// /user/logout 退出登录
export const reqLogout = () => requests({
    url: '/user/logout', method: 'get'
})


// 科室分页查询 data:page,pageSize,deptName url/dept/page
export const reqPageQuery = (params) => requests({
    url: '/dept/page', method: 'get', params
})

// 添加科室  url:'/dept' data:dept
export const reqAddDept = (data) => requests({
    url: '/dept', data, method: 'post'
})

// 删除科室/批量删除
// url:/dept/{ids}
export const reqDeleteDept = (ids) => requests({
    url: `/dept/${ids}`, method: 'delete'
})

// 科室修改  url:'/dept'   
export const reqUpdateDept = (data) => requests({
    url: '/dept', method: 'put', data
})

// 根据deptId查询dept  url:'/dept/{id}'
export const reqQueryById = (id) => requests({
    url: `/dept/${id}`, method: 'get'
})

// 查询所有药品  /drugs/page
export const reqAllDrugs = (params) => requests({
    url: '/drugs/page', method: 'get', params
})

// 采购药品   /drugs   data:drugs
export const reqAddDrug = (data) => requests({
    url: '/drugs', method: 'post', data
})

// 修改药品 /drugs
export const reqUpdateDrug = (data) => requests({
    url: '/drugs', method: 'put', data
})

// 根据id查询药品  /drugs/{drugsId}
export const reqQueryDrugById = (drugsId) => requests({
    url: `/drugs/${drugsId}`, method: 'get'
})

// 根据id删除药品 /drugs/{drugsIds}
export const reqDeleteDrugById = (drugsIds) => requests({
    url: `/drugs/${drugsIds}`, method: 'delete'
})


// 修改药品销售状态  /drugs/sale/{status}
export const reqChangeStatus = (status, drugsId) => requests({
    method: 'put', url: `/drugs/sale/${status}/${drugsId}`
    // 参数需要换下位置
})

// 完成审核并上传结果   /drugs/check
export const reqSubmitCheck = (data) => requests({
    url: '/drugs/check', method: 'put', data
})

// 提交审核  url：/drugs/check/2
export const reqCheckDrug = (params) => requests({
    url: '/drugs/check/2', method: 'put', params
})


// 查询所有审核中的药品  /drugs/page
export const reqAllInCheckDrugs = (params) => requests({
    url: '/drugs/page/2', method: 'get', params
})

// 分页查询患者  /patient/page
export const reqAllPatients = (params) => requests({
    url: '/patient/page', method: 'get', params
})

// 添加患者   /patient
export const reqAddPatient = (data) => requests({
    url: '/patient', method: 'post', data
})

// 删除患者  /patient/{ids}
export const reqDeletePatientById = (ids) => requests({
    url: `/patient/${ids}`, method: 'delete'
})

// 根据id查询患者  /patient/{id}
export const reqQueryPatientById = (id) => requests({
    url: `/patient/${id}`, method: 'get'
})

// 根据id修改患者  /patient
export const reqUpdatePatient = (data) => requests({
    url: '/patient', method: 'put', data
})

// 挂号
export const reqPatientRegist = (data) => requests({
    url: '/patientDept', method: 'post', data
})

// 根据科室id查患者人数  /patientDept/count/{deptId}   已作废
// export const reqPatientCount = (deptId)=>requests({
//     url:`/patientDept/count/${deptId}`,method:'get'
// })

/* // 根据deptId分页查询所有患者  /patientDept/page/{deptId}
// 如果同时有路径参数和query参数一起要传，应用模板字符串将路径参数嵌入，
// 再在后边加上parmas：{}的形式传递query参数， */
export const reqPatientDept = (deptId, page, pageSize) => requests({
    url: `/patientDept/page/${deptId}`, params: {
        page: page,
        pageSize: pageSize
    }
})

// 叫号修改诊断状态  /patientDept/{status}
export const reqUpdatePatientStatus = (status, id) => requests({
    url: `/patientDept/${status}`, method: 'put', params: { id: id }
})

// 诊断结果 /diag/{id}
export const reqQueryPatientresult = (id, data) => requests({
    url: `/diag/${id}`, method: 'post', data
})

// 分页查询日志   /log/page/{type}
export const reqQueryLog = (type, page, pageSize, logContent) => requests({
    url: `/log/page/${type}`, method: 'get', params: {
        page: page,
        pageSize: pageSize,
        logContent: logContent
    }
})

// 查找目前所有值班人数  /work
export const reqAllDutyCount = () => requests({
    url: '/work', method: 'get'
})

// 分页查询值班表  /work/page（首页）
export const reqDutyWork = (params) => requests({
    url: "/work/page", method: 'get', params
})

// 添加值班表 /work
export const reqAddDuty = (data) => requests({
    url: '/work', method: 'post', data
})

// 分页查询值班表（每个科室）  /work/page/{deptId}  
export const reqDutyWorkByDept = (deptId, page,pageSize,realName) => requests({
    url: `/work/page/${deptId}`, method: 'get', params: {
        page: page,
        pageSize: pageSize,
        realName:realName
    }
})

// 根据科室id查医生id(值班表添加)
export const reqQueryUserByDeptId = (deptId)=>requests({
    url:`/user/dept/${deptId}`,method:'get'
})

// 删除值班表 /work/{workId}
export const reqDeleteWork = (workId)=>requests({
    url:`/work/${workId}`,method:'delete'
})

// 分页查询通知  /notice/page
export const reqQueryNotice =(params)=>requests({
    url:'/notice/page',method:"get",params
})

// 添加通知  /notice
export const reqAddNotice =(data)=>requests({
    url:'/notice',method:'post',data
})

// 根据noticeId删除
export const reqDeleteNotice =(noticeId)=>requests({
    url:`/notice/${noticeId}`,method:'delete'
})

// 根据id查找通知  /notice/{noticeId}
export const reqUpdateQueryNotice =(noticeId)=>requests({
    url:`/notice/${noticeId}`,method:'get'
})

// 修改通知  /notice
export const reqUpdateNotice =(data)=>requests({
    url:'/notice',method:'put',data
})

// 查询所有文件 /file/page
export const reqQueryFile =(params)=>requests({
    url:'/file/page',method:'get',params
})

// 根据id删除文件  /file/{fileId}
export const reqDeleteFile =(fileId)=>requests({
    url:`file/${fileId}`,method:'delete'
})

// 添加文件
export const reqAddFile = (data)=>requests({
    url:'http://localhost:8080/file/upload/common',method:'post',data

})

// 下载共享文档
export const reqDownLoad =(fileId)=>requests({
    url:`/file/download/common/${fileId}`,method:'get',
    headers:{
        'Content-Type': 'application/octet-stream;charset=UTF-8'
    },
    responseType:'blob'
})

// 下载患者诊断书
export const reqDownLoadPatient = (patientId,deptId)=>requests({
    url:`/file/download/patient/${patientId}/${deptId}`,method:'get',
    headers:{
        'Content-Type': 'application/pdf'
    },
    responseType:'blob'
})

// 根据patientId查已经有几科诊断结束  /patientDept/{patientId}
export const reqOverPatientCount =(patientId)=>requests({
    url:`/patientDept/${patientId}`,method:'get'
})

// 根据科室id分页查询所有医生  /user/page/{deptId}
export const reqAllDoctors = (deptId,page,pageSize,realName)=>requests({
    url:`/user/page/${deptId}`,method:'get', params: {
        page: page,
        pageSize: pageSize,
        realName:realName
    }
})

// 职位模块   查询所有职位（注册用到了） /auth/list
export const reqAllAuth = ()=>requests({
    url:'/auth/list',method:'get'
})

// 删除用户（医生，院长）  /user/{userId}
export const reqDeleteUser = (userId)=>requests({
    url:`/user/${userId}`,method:'delete'
})