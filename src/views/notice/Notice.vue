<template>
  <div class="noticeRight">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>通知栏</span>
        <span style="float: right; padding: 3px 0" type="text">今日</span>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column  label="标题" align="center">
          <template slot-scope="scope">
            <a href="D:/hospital/noticeHtml/im403.html" >百度</a>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="日期" align="center">
        </el-table-column>
      </el-table>
      <div class="pagination">
        <!-- <span class="demonstration">直接前往</span> -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="noticeData.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// @click="clickthisTitle(scope.row.path)" :target="scope.row.path"
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 3,
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["noticeData"]),

    // 计算属性：将notice小仓库中的noticeData中的records拿出来
    records() {
      return this.noticeData.records;
    },
  },
  methods: {
    // 分页查询数据
    async getData() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
      };
      await this.$store.dispatch("showNotice", params);
      this.tableData = this.records;
    },

    // 翻页
    async handleCurrentChange(val) {
      const params = {
        page: val,
        pageSize: this.pageSize,
      };
      await this.$store.dispatch("showNotice", params);
      this.tableData = this.records;
    },

    // 点击链接
    clickthisTitle(path){
      // console.log(path)
    }
  },
};
</script>

<style lang="less" scoped>
.noticeRight {
  float: left;
  width: 560px;
  height: 270px;
  position: absolute;
  left: 50%;
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
  }
  .pagination {
    position: absolute;
    left: 50%;
    margin-top: 15px;
    transform: translateX(-50%);
  }
}
</style>