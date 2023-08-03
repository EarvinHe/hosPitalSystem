<template>
  <div>
    <el-dialog
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      width="25%"
      style="align-items: center"
    >
      <el-form :model="PatientDownLoadForm" label-width="100px" size="small">
        <el-form-item :label="'患\xa0者\xa0姓名'">
          <el-input v-model="PatientDownLoadForm.patientName"></el-input>
        </el-form-item>

        <el-form-item :label="'诊断科'">
          <el-select
            placeholder="请选择科室"
            style="width: 200px"
            v-model="PatientDownLoadForm.deptId"
          >
            <el-option
              v-for="(dept, index) in overCount"
              :key="dept.deptId"
              :label="dept.deptName"
              :value="dept.deptId"
              >{{ dept.deptName }}</el-option
            >
          </el-select>
        </el-form-item>
       
          <el-button
            class="finishUpdate"
            type="primary"
            size="small"
            @click="download"
            >完成</el-button
          >

      </el-form>
    </el-dialog>
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";
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
    ...mapGetters(["overCount"]),
  },
  methods: {
    openDownLoadDialog(data) {
      this.dialogFormVisible = true;
      this.PatientDownLoadForm = data;
      this.showPatientOver();
    },

    //   查询有几科诊断结束
    async showPatientOver() {
      await this.$store.dispatch(
        "queryOverCount",
        this.PatientDownLoadForm.patientId
      );
    },

    // 下载
    async download() {
      try {
     
        const patientId = this.PatientDownLoadForm.patientId;
        const deptId = this.PatientDownLoadForm.deptId;
        const pdf = await this.$store.dispatch("downLoadPatient", {
          patientId: patientId,
          deptId: deptId,
        });
        console.log(pdf);
        // 以blob流将其打印出来
        //创建一个临时下载url
        const loadUrl = URL.createObjectURL(pdf);
        console.log(loadUrl);
        // 在页面上点击下载按钮创建一个临时的a链接，用于下载操作
        const link = document.createElement("a");
        // 下载的地址（从何处下载）
        link.download =patientId + '的'+deptId +'诊断书'+ '.pdf' ;
        // 下载的url即为创建的loadUrl
        link.href = loadUrl;
        link.type = 'application/pdf';
        // 打开新的页面
        // link.target = '_blank'
        // 将link元素隐藏
        link.style.display = "none";
        // 将这个link元素添加到页面body中
        document.body.appendChild(link);
        // 触发下载事件
        link.click();
        // 下载完成移除临时url
        URL.revokeObjectURL(link.href);
        // 同样移除临时link
        document.body.removeChild(link);
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