<template>
  <div class="addPage">
    <div class="container">
      <h1 class="addTitle">添加</h1>
      <el-form
        ref="addDrugForm"
        :model="addDrugForm"
        label-width="100px"
        :inline="true"
        size="small"
      >
        <el-form-item :label="'药\xa0品\xa0名'">
          <el-input v-model="addDrugForm.drugsName"></el-input>
        </el-form-item>
        <el-form-item :label="'规\xa0\xa0\xa0\xa0\xa0\xa0格'">
          <el-input v-model="addDrugForm.drugsSpecifications"></el-input>
        </el-form-item>
        <el-form-item :label="'单\xa0\xa0\xa0\xa0\xa0\xa0位'">
          <el-input v-model="addDrugForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="生产企业">
          <el-input v-model="addDrugForm.drugsManufactor"></el-input>
        </el-form-item>
        <el-form-item :label="'生产日期'">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 190px"
              v-model="addDrugForm.manufactureTime"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="保质日期">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 190px"
              v-model="addDrugForm.expireTime"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item :label="'进\xa0\xa0\xa0\xa0\xa0\xa0价'">
          <el-input
            type="number"
            v-model="addDrugForm.purchasePrice"
          ></el-input>
        </el-form-item>
        <el-form-item :label="'零\xa0\xa0售\xa0价'">
          <el-input type="number" v-model="addDrugForm.salePrice"></el-input>
        </el-form-item>
        <el-form-item label="销售状态">
          <el-radio-group v-model="addDrugForm.saleStatus">
            <!-- <el-radio label="是"></el-radio> -->
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否进口">
          <el-radio-group v-model="addDrugForm.isImport">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="药品说明">
          <el-input type="textarea" v-model="addDrugForm.drugsDesc"></el-input>
        </el-form-item>
        <el-button type="success" plain @click="addDrugs">添加</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "addDept",
  data() {
    return {
      addDrugForm: {
        // 药品名字
        drugsName: "",
        // 规格
        drugsSpecifications: "",
        // 单位
        unit: "",
        // 企业
        drugsManufactor: "",
        // 生产日期
        manufactureTime: "",
        //保质日期
        expireTime: "",
        //进价
        purchasePrice: "",
        //零售价
        salePrice: "",
        //销售状态
        saleStatus: 1,
        // 是否进口
        isImport: "",
        //药品说明
        drugsDesc: "",
      },
    };
  },
  methods: {
    async addDrugs() {
      try {
        const data = this.addDrugForm;
        await this.$store.dispatch("addDrugs", data);
        this.$message({
          message: "添加成功",
          type: "success",
          showClose: true,
        });
        // 跳转药品管理
        
        this.$router.push("/drugList");
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
    height: 450px;
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