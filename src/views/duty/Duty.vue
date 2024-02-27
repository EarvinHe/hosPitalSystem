<template>
  <div class="dutyLeft">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>值班表</span>
        <span style="float: right; padding: 3px 0" type="text">今日</span>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          prop="realName"
          label="值班医生"
          width="100"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="workTime"
          label="日期"
          width="220"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="联系方式"
          width="150"
          align="center"
        >
        </el-table-column>
      </el-table>
      <div class="pagination">
        <!-- <span class="demonstration">直接前往</span> -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="AlldutyWorkData.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "duty",
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 3,
    };
  },
  mounted() {
    this.getdata();
  },
  computed: {
    ...mapGetters(["AlldutyWorkData"]),
    records() {
      return this.AlldutyWorkData.records;
    },
  },
  methods: {
    async getdata() {
      try {
        const params = {
          page: this.page,
          pageSize: this.pageSize,
        };
        await this.$store.dispatch("pageWork", params);

        this.tableData = this.records;
      } catch (error) {}
    },

    async handleCurrentChange(val) {
      try {
      } catch (error) {
        const params = {
          page: val,
          pageSize: this.pageSize,
        };
        await this.$store.dispatch("pageWork", params);
        this.tableData = this.records;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.dutyLeft {
  float: left;
  width: 560px;
  height: 270px;
  position: absolute;
  right: 50%;
  // border: darkgoldenrod solid 1px;

  margin: 20px 40px 0px 40px;
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 560px;
    height: 360px;
    .pagination {
      position: absolute;
      left: 50%;
      margin-top: 15px;
      transform: translateX(-50%);
    }
  }
}
</style>