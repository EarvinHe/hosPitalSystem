<template>
  <div class="InCheckDrugPage">
    <div class="container">
      <h1 class="ckeckTitle">药品审核</h1>
      <el-form ref="inCheckForm" :model="inCheckForm" label-width="100px">
        <el-form-item :label="'药\xa0品\xa0名'">
          <el-input readonly v-model="inCheckForm.drugsName"></el-input>
        </el-form-item>
        <el-form-item label="生产厂商">
          <el-input readonly v-model="inCheckForm.drugsManufactor"></el-input>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-radio-group v-model="inCheckForm.checkStatus">
            <el-radio :label="0">通过</el-radio>
            <el-radio :label="1">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核意见">
          <el-input
            type="textarea"
            v-model="inCheckForm.checkContent"
          ></el-input>
        </el-form-item>
        <el-button type="success" plain @click="finishCheck">完成</el-button>
      </el-form>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "inCheckDrug",
  data() {
    return {
      inCheckForm: {
        drugsId: "",
        drugsName: "",
        drugsManufactor: "",
        checkStatus: "",
        checkContent: "",
        version: "",
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // this.$route.query.data
      this.inCheckForm = this.$route.query.data;
    },
    //提交审核
    async finishCheck() {
      // 发修改药品的请求
      try {
        const data = {
          drugsId: this.inCheckForm.drugsId,
          checkStatus: this.inCheckForm.checkStatus,
          checkContent: this.inCheckForm.checkContent,
          version: this.inCheckForm.version,
        };
      const res = await this.$store.dispatch("submitCheck", data);
       if (res == "ok") {
          this.$message({
            message: "修改成功",
            type: "success",
            showClose: true,
          });
        }
      this.$router.push('/CheckDrug')  
      } catch (error) {}
    },
  },
};
</script>
  
  <style lang="less" scoped >
.InCheckDrugPage {
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
    height: 340px;

    border: 1px solid rgb(239, 239, 239);
    border-radius: 6px;
    left: 50%;
    // top: 50%;
    margin: 0;
    position: absolute;
    transform: translate(-50%, -25%);
    .el-form {
      margin: 20px;
    }
    .el-form-item {
      width: 600px;
      margin-bottom: 15px;
    }
    .el-form-item__label {
      text-align: center;
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

    .ckeckTitle {
      font-size: larger;
      text-align: center;
      margin: 10px 5px 20px 5px;
    }
  }
}
</style>