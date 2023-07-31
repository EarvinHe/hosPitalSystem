<template>
    <div>
      <el-dialog
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
        width="25%"
        style="align-items: center;"
      >
        <el-form
          :model="PatientDownLoadForm"
          label-width="100px"
          
          size="small"
        >
  
          <el-form-item :label="'患\xa0者\xa0姓名'" > 
            <el-input v-model="PatientDownLoadForm.patientName"></el-input>
          </el-form-item>

          <el-form-item :label="'诊断科'">
            <el-select  placeholder="请选择科室" style="width: 200px;" v-model="PatientDownLoadForm.deptId">
            <el-option v-for="(dept,index) in overCount" :key="dept.deptId" :label="dept.deptName" :value="dept.deptId">{{ dept.deptName }}</el-option>

          </el-select>
          </el-form-item>

          <el-button class="finishUpdate" type="primary" size="small" @click="download">完成</el-button>
        </el-form>
      </el-dialog>
    </div>
  </template>
  
  <script>
import { mapGetters } from 'vuex';
  export default {
    name: "",
    data() {
      return {
        PatientDownLoadForm: "",
        dialogFormVisible: false,
        // isModal:false
      };
    },
 computed: {
    ...mapGetters(['overCount'])
 },
    methods: {
      openDownLoadDialog(data) {
        this.dialogFormVisible = true;
        this.PatientDownLoadForm = data;
        this.showPatientOver()
      },

    //   查询有几科诊断结束
      async showPatientOver(){
           await this.$store.dispatch('queryOverCount',this.PatientDownLoadForm.patientId)
        },

        // 下载
       async download(){
            const patientId = this.PatientDownLoadForm.patientId
            const deptId = this.PatientDownLoadForm.deptId
           await this.$store.dispatch('downLoadPatient',{patientId:patientId,deptId:deptId})
        }
  
    },
  };
  </script>
  
  <style lang="less" scoped>
    .el-input{
        width: 200px;
    }
    .finishUpdate{
       margin-left: 50%;
       transform: translateX(-50%);
    }
  </style>