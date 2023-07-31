<template>
  <div class="drugDetailPage">
    <div class="container">
      <h1 class="updateTitle">详情</h1>
      <el-form
        ref="DrugDetailForm"
        :model="DrugDetailForm"
        label-width="100px"
        :inline="true"
        size="small"
      >
      <el-button size="mini" plain icon="el-icon-arrow-left" @click="backCheckDrug">返回</el-button>
        <el-form-item :label="'药\xa0品\xa0名'">
          <el-input v-model="DrugDetailForm.drugsName"></el-input>
        </el-form-item>
        <el-form-item :label="'规\xa0\xa0\xa0\xa0\xa0\xa0格'">
          <el-input v-model="DrugDetailForm.drugsSpecifications"></el-input>
        </el-form-item>
        <el-form-item :label="'单\xa0\xa0\xa0\xa0\xa0\xa0位'">
          <el-input v-model="DrugDetailForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="生产企业">
          <el-input v-model="DrugDetailForm.drugsManufactor"></el-input>
        </el-form-item>
        <el-form-item :label="'生产日期'">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 190px"
              v-model="DrugDetailForm.manufactureTime"
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
              v-model="DrugDetailForm.expireTime"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 190px"
              v-model="DrugDetailForm.createTime"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="审核开始日期">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 190px"
              v-model="DrugDetailForm.checkStartTime"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item :label="'进\xa0\xa0\xa0\xa0\xa0\xa0价'">
          <el-input
            type="number"
            v-model="DrugDetailForm.purchasePrice"
          ></el-input>
        </el-form-item>
        <el-form-item :label="'零\xa0\xa0售\xa0价'">
          <el-input type="number" v-model="DrugDetailForm.salePrice"></el-input>
        </el-form-item>
        <el-form-item label="销售状态">
          <el-radio-group v-model="DrugDetailForm.saleStatus">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否进口">
          <el-radio-group v-model="DrugDetailForm.isImport">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-radio-group v-model="DrugDetailForm.checkStatus">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="药品说明">
          <el-input
            type="textarea"
            v-model="DrugDetailForm.drugsDesc"
          ></el-input>
        </el-form-item>
        
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "drugDetail",
  data() {
    return {
      DrugDetailForm: {
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
        saleStatus: 0,
        // 是否进口
        isImport: "",
        //药品说明
        drugsDesc: "",
        // 创建日期
        createTime:'',
        // 审核开始日期
        checkStartTime:"",
        // 审核状态
        checkStatus:"",

      },
    };
  },
  mounted() {
    this.showOneDrug();
  },
  computed: {
    ...mapState({
      singleDrug: (state) => state.drug.singleDrug,
    }),
  },
  methods: {
    // 进入详情页面时，展示原来药品的全部数据
    async showOneDrug() {
      try {
        const drugsId = this.$route.params.drugsId;
        await this.$store.dispatch("showOneDrug", drugsId);
        this.DrugDetailForm = this.singleDrug;
      } catch (error) {}
    },

    // 返回药品审核
    backCheckDrug(){
      this.$router.push('/checkDrug')
    }

  },
};
</script>

<style lang="less" scoped >
.drugDetailPage {
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
      width: 190px;
      position: absolute;
    }
    .el-button {
      // left: 50%;
      // top: 50%;
      // margin-top: 80px;
      position: absolute;
      transform: translateY(-40px);
      text-align: center;
      width: 150px;
    }

    .updateTitle {
      // position: absolute;
      width: 200px;
      transform: translateX(120%);
      font-size: larger;
      text-align: center;
      margin: 10px 5px 20px 5px;
    }
  }
}
</style>