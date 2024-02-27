<template>
  <div class="deptContainer">
    <div class="topOption">
      <el-button
        type="primary"
        plain
        style="width: 100px; height: 35px; font-size: 10px; text-align: center"
        @click="toAddNotice"
        >+添加通知</el-button
      >
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width: 280px; margin-left: 100px"
      >
      </el-input>
      <el-button
        type="success"
        style="width: 65px; font-size: 10px; text-align: center"
        @click="getData"
        >搜索</el-button
      >
    </div>
    <div class="deptTable">
      <el-table
        :data="noticeData.records"
        stripe
        border
        style="width: 100%; color: black"
      >
      <el-table-column type="index" :index="indexMethod"  width="60" align="center" label="序列">
        </el-table-column>
        <el-table-column v-if="false" prop="noticeId" label="通知id" width="100">
        </el-table-column>
        <el-table-column prop="noticeName" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="path" label="通知链接" width="415">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="toUpdate(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
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
          :total="noticeData.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";
export default {
  name: "dept",
  data() {
    return {
      page: 1,
      pageSize: 4,
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
    // 自定义索引
    indexMethod(index) {
      return (this.page - 1) * this.pageSize + (index + 1);
    },
    handleSizeChange(val) {
      // 这是动态设置每页条数的方法，但现阶段无此功能
    },
    handleCurrentChange(val) {
      const params = {
        page: val,
        pageSize: this.pageSize,
      };
      this.$store.dispatch("showNotice", params);
    },

    // 即分页查询，包括搜索查询
    async getData() {
      try {
        const params = {
          page: this.page,
          pageSize: this.pageSize,
        };
        await this.$store.dispatch("showNotice", params);
      } catch (error) {
        alert(error.msg);
      }
    },

    // 删除
    async handleDelete(index, row) {
      try {
        const noticeId = row.noticeId;
        const res = await this.$store.dispatch("deleteNotice", noticeId);
        if (res == "ok") {
          if ((this.noticeData.total - 1) % this.pageSize == 0) {
            const params = {
              page: (this.noticeData.total - 1) / this.pageSize,
              pageSize: this.pageSize,
            };
            await this.$store.dispatch("showNotice", params);
          } else {
            this.getData();
          }
          this.$message({
            message: "删除成功",
            type: "success",
            showClose: true,
          });
        }
      } catch (error) {
        alert(error.msg);
      }
    },

    // 去添加
    toAddNotice() {
      this.$router.push("/addNotice");
    },

    toUpdate(row) {
      this.$router.push({
        name: "updateNotice",
        query: { noticeId: row.noticeId },
      });
    },
  },
};
</script>
  
  <style lang="less" scoped>
.deptContainer {
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
  .deptTable {
    position: absolute;
    /* display: flex; */
    top: 175px;
    width: 876px;
    left: 50%;
    transform: translate(-50%);
  }
  .pagination {
    position: absolute;
    left: 50%;
    margin-top: 15px;
    transform: translateX(-50%);
  }
}
</style>