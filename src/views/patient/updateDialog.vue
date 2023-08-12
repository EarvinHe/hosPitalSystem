<template>
  <div>
    <el-dialog
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      width="25%"
      style="align-items: center"
    >
      <el-form :model="PatientUpdateForm" label-width="100px" size="small">
        <el-form-item :label="'患\xa0者\xa0姓名'">
          <el-input v-model="PatientUpdateForm.patientName"></el-input>
        </el-form-item>

        <el-form-item label="患者身份证号">
          <el-input v-model="PatientUpdateForm.patientIdCard"></el-input>
        </el-form-item>

        <el-form-item label="患者性别">
          <el-radio-group v-model="PatientUpdateForm.patientSex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="患者Id" v-if="false">
          <el-input v-model="PatientUpdateForm.patientId"></el-input>
        </el-form-item>

        <el-form-item label="患者生日">
          <el-col :span="11">
            <el-date-picker
              v-model="PatientUpdateForm.patientBirthday"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 200px"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="患者电话">
          <el-input v-model="PatientUpdateForm.patientTelphone"></el-input>
        </el-form-item>

        <el-form-item label="患者住址">
          <el-input v-model="PatientUpdateForm.patientAddress"></el-input>
        </el-form-item>
        <el-button
          class="finishUpdate"
          type="primary"
          size="small"
          @click="updatePatient"
          >完成</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  name: "",
  data() {
    return {
      PatientUpdateForm: "",
      dialogFormVisible: false,
      // isModal:false
    };
  },
  methods: {
    openUpdateDialog(data) {
      this.dialogFormVisible = true;
      this.PatientUpdateForm = data;
    },

    //   修改患者数据
    async updatePatient() {
      try {
        const data = {
          patientName: this.PatientUpdateForm.patientName,
          patientIdCard: this.PatientUpdateForm.patientIdCard,
          patientSex: this.PatientUpdateForm.patientSex,
          patientId: this.PatientUpdateForm.patientId,
          patientBirthday: this.PatientUpdateForm.patientBirthday,
          patientTelphone: this.PatientUpdateForm.patientTelphone,
          patientAddress: this.PatientUpdateForm.patientAddress,
        };
        const res = await this.$store.dispatch("updatePatient", data);
        if (res == "ok") {
          this.$message({
            message: "修改成功",
            type: "success",
            showClose: true,
          });
        }
        // 关闭dialog
        this.dialogFormVisible = false;
      } catch (error) {}
    },
  },
};
</script>
  
  <style lang="less" scoped>
.el-input {
  width: 200px;
}
.finishUpdate {
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>