<template>
  <div class="resultPage">
    <div class="container">
      <h1 class="resultTitle">诊断</h1>
      <el-form
        ref="resultForm"
        :model="resultForm"
        label-width="100px"
        size="small"
      >
        <el-form-item label="患者编号">
          <el-input v-model="resultForm.patientId"></el-input>
        </el-form-item>
        <el-form-item label="患者姓名">
          <el-input v-model="resultForm.patientName"></el-input>
        </el-form-item>
        <el-form-item label="科室编号">
          <el-input v-model="resultForm.deptId"></el-input>
        </el-form-item>
        <el-form-item :label="'科\xa0\xa0\xa0\xa0\xa0\xa0\xa0室'">
          <el-input v-model="resultForm.deptName"></el-input>
        </el-form-item>
        <el-form-item label="医生编号">
          <el-input v-model="resultForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="医生姓名">
          <el-input v-model="resultForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="症状描述">
          <el-input type="textarea" v-model="resultForm.symptomDesc"></el-input>
        </el-form-item>
        <el-form-item label="症状意见">
          <el-input type="textarea" v-model="resultForm.symptomIdea"></el-input>
        </el-form-item>
        <el-button type="success" plain @click="submitResult">完成</el-button>
      </el-form>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "addDept",
  data() {
    return {
      resultForm: {
        patientId: "",
        patientName: "",
        deptId: "",
        deptName: "",
        userId: "",
        realName: "",
        symptomDesc: "",
        symptomIdea: "",
      },
    };
  },
  computed: {
    queryData() {
      return this.$route.query;
    },
  },
  mounted() {
    this.showData();
  },
  methods: {
    showData() {
      console.log(this.$route.query);
      this.resultForm = this.queryData;
    },

    // 提交诊断
    async submitResult() {
      try {
        const id = this.resultForm.id;
        const diagnosisResult = this.resultForm;
        const res = await this.$store.dispatch("resultPatient", {
          id,
          diagnosisResult,
        });
        if (res == "ok") {
          this.$message({
            message: "叫号成功",
            type: "success",
            showClose: true,
          });
        }
        this.$router.push({
          name: "triageDetail",
          params: { deptId: this.resultForm.deptId },
          query: { deptName: this.resultForm.deptName },
        });
      } catch (error) {}
    },
  },
};
</script>
  
  <style lang="less" scoped >
.resultPage {
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
    box-shadow: 3px 3px 10px 3px rgba(199, 196, 196, 0.5);
    background-color: rgba(255, 255, 255, 0.5);
    width: 500px;
    height: 600px;
    border: 1px solid rgb(239, 239, 239);
    border-radius: 6px;
    left: 50%;
    top: 50%;
    margin: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    .el-form {
      margin: 20px;
    }
    .el-form-item {
      width: 420px;
    }
    .el-button {
      left: 50%;
      // top: 50%;
      margin: 10px;
      position: absolute;
      transform: translateX(-50%);
      text-align: center;
      width: 150px;
    }

    .resultTitle {
      font-size: larger;
      text-align: center;
      margin: 15px 5px 20px 5px;
    }
  }
}
</style>