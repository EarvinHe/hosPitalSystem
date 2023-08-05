<template>
  <div class="addPage">
    <div class="container">
      <h1 class="addTitle">添加</h1>
      <el-form
        ref="addPatientForm"
        :model="addPatientForm"
        label-width="100px"
        :inline="true"
        size="small"
      >
        <el-form-item :label="'患者姓名'">
          <el-input v-model="addPatientForm.patientName"></el-input>
        </el-form-item>
        <el-form-item :label="'姓\xa0\xa0\xa0\xa0\xa0\xa0别'">
          <el-radio-group v-model="addPatientForm.patientSex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="'生日'">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 190px"
              v-model="addPatientForm.patientBirthday"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="addPatientForm.patientIdCard"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            type="number"
            v-model="addPatientForm.patientTelphone"
          ></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="addPatientForm.patientAddress"></el-input>
        </el-form-item>

        <el-button type="success" plain @click="addPatient">添加</el-button>
      </el-form>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "addPatient",
  data() {
    return {
      addPatientForm: {
        // 患者姓名
        patientName: "",
        //患者性别
        patientSex: "",
        // 患者生日
        patientBirthday: "",
        // 身份证
        patientIdCard: "",
        // 手机号
        patientTelphone: "",
        // 住址
        patientAddress: "",
      },
    };
  },
  methods: {
    async addPatient() {
      try {
        const data = this.addPatientForm;
       const res = await this.$store.dispatch("addPatient", data);
        if (res == "ok") {
          this.$message({
            message: "添加成功",
            type: "success",
            showClose: true,
          });
        }
        // 跳转患者管理

        this.$router.push("/patientList");
      } catch (error) {}
    },
  },
};
</script>
  
  <style lang="less" scoped >
.addPage {
  width: 100%;
  height: 100%;
  display: flex;
  background-size: cover;
  background-image: url(../../assets/h2.jpg);
  overflow: hidden; /* 禁止滚动条 */
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  position: relative;
  .container {
    width: 680px;
    box-shadow: 3px 3px 10px 3px rgba(199, 196, 196, 0.5);
    background-color: rgba(255, 255, 255, 0.5);
    height: 300px;
    border: 1px solid rgb(239, 239, 239);
    border-radius: 6px;
    left: 50%;
    // top: 50%;
    margin: 0;
    position: absolute;
    transform: translate(-50%, -20%);
    .el-form {
      margin: 20px;
    }
    .el-form-item {
      width: 310px;
    }
    .el-form-item__content .el-textarea {
      width: 510px;
      position: absolute;
    }
    .el-button {
      left: 50%;
      // top: 50%;
      margin-top: 80px;
      position: absolute;
      transform: translateX(-50%);
      text-align: center;
      width: 150px;
    }

    .addTitle {
      font-size: larger;
      text-align: center;
      margin: 10px 5px 20px 5px;
    }
  }
}
</style>