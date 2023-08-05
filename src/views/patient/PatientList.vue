<template>
  <div class="patientContainer">
    <div class="topOption">
      <el-button
        type="primary"
        plain
        style="width: 100px; height: 35px; font-size: 10px; text-align: center"
        @click="toAddPatient"
        >+添加患者</el-button
      >
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width: 280px; margin-left: 100px"
        type="text"
      >
      </el-input>
      <el-button
        type="success"
        style="width: 65px; font-size: 10px; text-align: center"
        >搜索</el-button
      >
    </div>
    <div class="patientTable">
      <el-table
        :data="patientData.records"
        stripe
        border
        style="width: 100%; color: black"
      >
      <el-table-column type="index" :index="indexMethod"  width="60" align="center" label="序列">
        </el-table-column>

        <el-table-column
        v-if="false"
          align="center"
          prop="patientId"
          label="编号"
          width="60"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="patientName"
          label="姓名"
          width="100"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="patientSex"
          label="性别"
          width="120"
        >
          <template slot-scope="scope">
            {{ getGenderText(scope.row.patientSex) }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="patientIdCard"
          label="身份证号"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="patientBirthday"
          label="出身年月日"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="patientTelphone"
          label="电话"
          width="140"
        >
        </el-table-column>

        <el-table-column align="center" label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" @click="toUpdate(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >

            <el-button
              size="mini"
              type="success"
              @click="toPatientRegist(scope.row)"
              >挂号</el-button
            >

            <el-button
              size="mini"
              type="primary"
              @click="downloadResult(scope.row)"
              >下载诊断</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <!-- <span class="demonstration">直接前往</span> -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="patientData.total"
        >
        </el-pagination>
      </div>
    </div>
    <updateDialog ref="updateDialog"></updateDialog>
    <OverCountDialog ref="OverCountDialog"></OverCountDialog>
  </div>
</template>
  
  <script>
import updateDialog from "./updateDialog.vue";
import OverCountDialog from "@/views/patient/OverCountDialog";
import { mapGetters } from "vuex";
export default {
  name: "PatienList",
  data() {
    return {
      patientName: "",
      page: 1,
      pageSize: 4,
    };
  },
  components: {
    updateDialog,
    OverCountDialog,
  },
  computed: {
    ...mapGetters(["patientData"]),
    records() {
      return this.patientData.records;
    },
  },
  mounted() {
    // 在组件创建时展示数据
    this.getPatientData();
  },
  methods: {
     // 自定义索引
     indexMethod(index) {
      return (this.page-1)*this.pageSize + (index + 1);
    },
    // 将代表性别的数字转换程文字
    getGenderText(patientSex) {
      return patientSex === 0 ? "女" : "男";
    },

    //翻页的时候查询数据
    async handleCurrentChange(val) {
      try {
        const params = {
          page: val,
          pageSize: this.pageSize,
          patientName: this.patientName,
        };
        await this.$store.dispatch("queryAllPatients", params);
      } catch (error) {}
    },

    // 分页展示所有患者
    async getPatientData() {
      try {
        const params = {
          page: this.page,
          pageSize: this.pageSize,
          patientName: this.patientName,
        };
        await this.$store.dispatch("queryAllPatients", params);
      } catch (error) {}
    },

    // 去添加患者页面
    toAddPatient() {
      this.$router.push("/addPatient");
    },

    // 根据id删除患者
    async handleDelete(index, row) {
      try {
        const ids = row.patientId;
       const res =  await this.$store.dispatch("deletePatientById", ids);
        if (res == "ok") {
          if ((this.patientData.total - 1) % this.pageSize == 0) {
            const params = {
              page: (this.patientData.total - 1) / this.pageSize,
              pageSize: this.pageSize,
              patientName: this.patientName,
            };
            await this.$store.dispatch("queryAllPatients", params);
          } else {
            this.getPatientData();
          }
          this.$message({
            message: "删除成功",
            type: "success",
            showClose: true,
          });
        }
      } catch (error) {}
    },

    // 根据id去修改数据
    toUpdate(row) {
      this.$refs.updateDialog.openUpdateDialog(row);
    },

    // 下载诊断书
    downloadResult(row) {
      this.$refs.OverCountDialog.openDownLoadDialog(row);
    },

    // 去挂号页面
    toPatientRegist(row) {
      const data = {
        patientId: row.patientId,
        patientName: row.patientName,
      };

      this.$router.push({ path: "/patientRegist", query: { data } });
    },

    // 去下载诊断结果
    /*   downloadResult(row) {
      this.$router.push({name:'downLoadPatient',query:{patientId:row.patientId,patientName:row.patientName}})
    }, */
  },
};
</script>
  
  <style lang="less" scoped>
.patientContainer {
  /* display: flex; */
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  position: fixed;
  .topOption {
    /* display: flex; */
    width: 660px;
    height: 40px;
    position: absolute;
    left: 50%;
    margin-top: 70px;
    transform: translate(-50%, 50%);
  }
  .patientTable {
    position: absolute;
    /* display: flex; */
    top: 175px;
    width: 1081px;
    left: 50%;
    transform: translate(-50%);
  }
  .buttonstyle {
    width: 79px;
  }
  .pagination {
    position: absolute;
    left: 50%;
    margin-top: 15px;
    transform: translateX(-50%);
  }
}
</style>