<template>
  <div>
    <el-dialog
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      width="50%"
    >
      <el-form
        :model="DrugDetailForm"
        label-width="100px"
        :inline="true"
        size="mini"
      >

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
              v-model="DrugDetailForm.manufactureTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 185px"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="保质日期">
          <el-col :span="11">
            <el-date-picker
              v-model="DrugDetailForm.expireTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 185px"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker
              v-model="DrugDetailForm.createTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 185px"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="审核日期">
          <el-col :span="11">
            <el-date-picker
              v-model="DrugDetailForm.checkStartTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 185px"
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
          <el-radio-group>
            <el-input
              v-show="DrugDetailForm.saleStatus == 0"
              value="上架"
            ></el-input>
            <el-input
              v-show="DrugDetailForm.saleStatus == 1"
              value="下架"
            ></el-input>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否进口">
          <el-radio-group>
            <el-input
               v-show="DrugDetailForm.isImport == 0"
               value="进口"
            ></el-input>
            <el-input
               v-show="DrugDetailForm.isImport == 1"
               value="非进口"
            ></el-input>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="审核状态" >
          <el-radio-group>
            <el-input v-show="DrugDetailForm.checkStatus == 0"
            value="通过"
            ></el-input>
            <el-input v-show="DrugDetailForm.checkStatus == 1"
            value="不通过"
            ></el-input>
            <el-input v-show="DrugDetailForm.checkStatus == 2"
            value="审核中"
            ></el-input>
            <el-input v-show="DrugDetailForm.checkStatus == 3"
            value="未提交审核"
            ></el-input>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="药品说明">
          <el-input
            type="textarea"
            style="width: 105%"
            v-model="DrugDetailForm.drugsDesc"
          ></el-input>
        </el-form-item>

        <el-form-item label="审核意见">
          <el-input
            type="textarea"
            style="width: 272%"
            v-model="DrugDetailForm.checkContent"
          ></el-input>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      DrugDetailForm: "",
      dialogFormVisible: false,
      // isModal:false
    };
  },
  methods: {
    openDialog(data) {
      this.dialogFormVisible = true;
      this.DrugDetailForm = data;
    },
  },
};
</script>

<style lang="less" scoped>
</style>