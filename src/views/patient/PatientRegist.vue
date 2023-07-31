<template>
  <div class="updatePage">
    <div class="container">
      <h1 class="updateTitle">挂号</h1>
      <el-form
        ref="PatientRegistForm"
        :model="PatientRegistForm"
        label-width="100px"
      >
        <el-form-item label="患者编号">
          <el-input v-model="PatientRegistForm.patientId"></el-input>
        </el-form-item>
        <el-form-item label="患者姓名">
          <el-input v-model="PatientRegistForm.patientName"></el-input>
        </el-form-item>
        <el-form-item label="选择科室">
          <el-select
            placeholder="请选择科室"
            v-model="PatientRegistForm.deptId"
          >
            <el-option
              v-for="(dept, index) in deptInfo"
              :key="dept.deptId"
              :label="dept.deptName"
              :value="dept.deptId"
              >{{ dept.deptName }}</el-option
            >
            <!-- <el-option label="脑科" value="脑科">脑科</el-option>s -->
          </el-select>
        </el-form-item>
        <el-button type="success" plain @click="doneRegist">完成</el-button>
      </el-form>
    </div>
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";
export default {
  name: "PatientRegist",
  data() {
    return {
      PatientRegistForm: {
        patientId: "",
        patientName: "",
        deptId: "",
      },
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    // 拿到在曾经用户注册页面存储在vuex中的科室数据
    ...mapGetters(["deptInfo"]),
  },
  methods: {
    // 拿到患者数据和科室数据
   async getData() {
       this.PatientRegistForm = this.$route.query.data;
      await this.$store.dispatch("selectAllDepts");
      const oneData = JSON.parse(JSON.stringify(this.deptInfo));
      
    },

    // 完成挂号
    async doneRegist() {
      try {
        await this.$store.dispatch("patientRegister", this.PatientRegistForm);
        this.$message({
              message: "挂号成功",
              type: "success",
              showClose: true,
            });
        this.$router.push("/patientList");
        
      } catch (error) {}
    },
  },
};
</script>
  
  <style lang="less" scoped >
.updatePage {
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
    height: 300px;
    border: 1px solid rgb(239, 239, 239);
    border-radius: 6px;
    left: 50%;
    // top: 50%;
    margin: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    .el-form {
      margin: 20px;
    }
    .el-form-item {
      width: 700px;
    }
    .el-button {
      left: 50%;
      // top: 50%;
      margin: 0;
      position: absolute;
      transform: translateX(-50%);
      text-align: center;
      width: 150px;
    }

    .updateTitle {
      font-size: larger;
      text-align: center;
      margin: 10px 5px 20px 5px;
    }
  }
}
</style>