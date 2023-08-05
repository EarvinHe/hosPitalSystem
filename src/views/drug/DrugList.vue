<template>
  <div class="drugContainer">
    <div class="topOption">
      <el-button
        type="primary"
        plain
        style="width: 100px; height: 35px; font-size: 10px; text-align: center"
        @click="toAddDrug"
        >+采购药品</el-button
      >
      <el-button
        type="danger"
        plain
        style="width: 100px; height: 35px; font-size: 10px; text-align: center"
        >×删除选中</el-button
      >
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width: 280px; margin-left: 100px"
        v-model="drugsName"
        type="text"
      >
      </el-input>
      <el-button
        type="success"
        style="width: 65px; font-size: 10px; text-align: center"
        >搜索</el-button
      >
    </div>
    <div class="drugTable">
      <el-table
        :data="drugData.records"
        stripe
        border
        @selection-change="handleSelectionChange"
        style="width: 100%; color: black"
      >
        <el-table-column
          fixed="left"
          align="center"
          label="查看具体"
          width="80"
        >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
        <el-table-column type="index" :index="indexMethod"  width="60" align="center" label="序列">
        </el-table-column>
        <el-table-column v-if="false" align="center" prop="drugsId" label="编号" width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="drugsName"
          label="药品名"
          width="140"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="drugsSpecifications"
          label="规格"
          width="70"
        >
        </el-table-column>
        <el-table-column align="center" prop="unit" label="单位" width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="drugsManufactor"
          label="生产企业"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="salePrice"
          label="销售价格(元)"
          width="110"
        >
        </el-table-column>

        <el-table-column align="center" label="操作" width="320px">
          <template slot-scope="scope">
            <el-button size="mini" @click="toUpdatePage(scope.row.drugsId)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="changeStatus(scope.row)"
              v-if="scope.row.saleStatus == 0"
              >↓下架</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="changeStatus(scope.row)"
              v-else="scope.row.saleStatus == 1"
              >↑上架</el-button
            >
            <el-button
              class="buttonstyle"
              type="success"
              size="mini"
              v-if="scope.row.checkStatus == 3"
              @click="toCheck(scope.row.drugsId)"
              >提交审核</el-button
            >
            <el-button
              class="buttonstyle"
              type="info"
              size="mini"
              v-if="scope.row.checkStatus == 2"
              >审核中</el-button
            >
            <el-button
              class="buttonstyle"
              type="warning"
              size="mini"
              v-if="scope.row.checkStatus == 1"
              >不通过</el-button
            >
            <el-button
              class="buttonstyle"
              type="success"
              size="mini"
              v-if="scope.row.checkStatus == 0"
              >已通过</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <!-- <span class="demonstration">直接前往</span> -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="drugData.total"
        >
        </el-pagination>
      </div>
    </div>
    <DrugDialog ref="DrugDialog"></DrugDialog>
  </div>
</template>

<script>
import DrugDialog from "./DrugDialog.vue";
import { mapGetters } from "vuex";
export default {
  name: "drugList",
  data() {
    return {
      // dialogFormVisible:false,
      sale_Status: "",
      page: 1,
      pageSize: 4,
      drugsName: "",
    };
  },
  components: {
    DrugDialog,
  },
  computed: {
    ...mapGetters(["drugData"]),
    records() {
      return this.drugData.records;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
     // 自定义索引
     indexMethod(index) {
      return (this.page-1)*this.pageSize + (index + 1);
    },
    // 在此查看药品具体信息
    handleClick(row) {
      this.$refs.DrugDialog.openDialog(row);
    },
    dialogFormVisible() {},

    // 去添加页面
    toAddDrug() {
      this.$router.push("/addDrug");
    },
    handleSelectionChange() {},
    async handleCurrentChange(val) {
      try {
        const params = {
          page: val,
          pageSize: this.pageSize,
          drugsName: this.drugsName,
        };
        await this.$store.dispatch("showAllDrugs", params);
      } catch (error) {}
    },
    handleSizeChange() {
      // 现阶段无此功能
    },

    //分页展示数据
    async getData() {
      try {
        const params = {
          page: this.page,
          pageSize: this.pageSize,
          drugsName: this.drugsName,
        };
        await this.$store.dispatch("showAllDrugs", params);
      } catch (error) {}
    },

    //点击删除数据
    async handleDelete(index, row) {
      //参数为每页第几(index+1)条数据，和这条数据的具体内容
      try {
        const res = await this.$store.dispatch("deleteOneDrug", row.drugsId);
        if (res == "ok") {
          if ((this.drugData.total - 1) % this.pageSize == 0) {
            const params = {
              page: (this.drugData.total - 1) / this.pageSize,
              pageSize: this.pageSize,
              drugsName: this.drugsName,
            };
            await this.$store.dispatch("showAllDrugs", params);
          } else {
            this.getData();
          }
          this.$message({
            message: "删除成功",
            type: "success",
            showClose: true,
          });
        }
      } catch (error) {}
    },

    // 点击编辑按钮去修改页面
    toUpdatePage(drugsId) {
      // 路由传参，将要修改的数据的id传到修改页面
      this.$router.push({ path: `/updateDrug/${drugsId}` });
    },

    // 提交审核
    async toCheck(drugsId) {
      try {
        const params = {
          drugsId: drugsId,
        };
        const res = await this.$store.dispatch("checkDrug", params);
        if (res == "ok") {
          this.$message({
            message: "提交审核成功",
            type: "success",
            showClose: true,
          });
        }
        this.getData();
      } catch (error) {}
    },

    // 修改药销售品状态
    async changeStatus(row) {
      try {
        if (row.saleStatus == 0) {
          row.saleStatus = 1;
        } else if (row.saleStatus == 1) {
          row.saleStatus = 0;
        }
        const status = row.saleStatus;
        const drugsId = row.drugsId;

        const res = await this.$store.dispatch("changeSaleStatus", {
          status,
          drugsId,
        });
        if (res == "ok") {
          this.$message({
            message: "修改销售状态成功",
            type: "success",
            showClose: true,
          });
        }
        this.$router.replace({
          path: "/drugList" + "/",
          query: { status, drugsId },
        });
        this.getData();
      } catch (error) {}
    },
  },
};
</script>

<style lang="less" scoped>
.drugContainer {
  /* display: flex; */
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  position: relative;
  .topOption {
    /* display: flex; */
    width: 660px;
    height: 40px;
    position: absolute;
    left: 50%;
    margin-top: 70px;
    transform: translate(-50%, 50%);
  }
  .drugTable {
    position: absolute;
    /* display: flex; */
    top: 175px;
    width: 1011px;
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