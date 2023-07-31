<template>
    <!-- 这是诊断日志面板 -->
    <div class="LogContainer">
      <div class="topOption">
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
      <div class="logTable">
        <el-table stripe border style="width: 100%; color: black" :data="records">
          <el-table-column align="center" prop="logId" label="ID" width="70">
          </el-table-column>
  
          <el-table-column
            align="center"
            prop="userName"
            label="操作人"
            width="160"
          >
          </el-table-column>
  
          <el-table-column
            align="center"
            prop="logContent"
            label="內容"
            width="250"
          >
          </el-table-column>
  
          <el-table-column
            align="center"
            prop="createTime"
            label="时间"
            width="300"
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
            :total="loginLogData.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </template>
    
    <script>
  import { mapGetters } from "vuex";
  export default {
    name: "checkDrug",
    data() {
      return {
        page: 1,
        pageSize: 4,
        logType: 1,
        logContent: "",
      };
    },
    mounted() {
      this.getData();
    },
    computed: {
      ...mapGetters(["loginLogData"]),
      records() {
        return this.loginLogData.records;
      },
    },
    methods: {
      async handleCurrentChange(val) {
        try {
          const type = this.logType;
          await this.$store.dispatch("queryLog", {
            type,
            page: val,
            pageSize: this.pageSize,
            logContent: this.logContent,
          });
          
        } catch (error) {}
      },
  
      // 获取数据
      async getData() {
        try {
          const type = this.logType;
          await this.$store.dispatch("queryLog", {
            type,
            page: this.page,
            pageSize: this.pageSize,
            logContent: this.logContent,
          });
          
        } catch (error) {}
      },
    },
  };
  </script>
    
    <style lang="less" scoped>
  .LogContainer {
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
    .logTable {
      position: absolute;
      /* display: flex; */
      top: 175px;
      width: 781px;
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