<template>
  <div class="fileContainer">
    <div class="topOption">
      <el-button
        type="primary"
        plain
        style="width: 100px; height: 35px; font-size: 10px; text-align: center"
        @click="toAddFile"
        >+上传文件</el-button
      >

      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width: 280px; margin-left: 100px"
        v-model="fileName"
      >
      </el-input>
      <el-button
        type="success"
        style="width: 65px; font-size: 10px; text-align: center"
        @click="getData"
        >搜索</el-button
      >
    </div>
    <div class="fileTable">
      <el-table
        :data="fileData.records"
        stripe
        border
        style="width: 100%; color: black"
      >
        <el-table-column prop="fileId" label="Id" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="fileName"
          label="文件名"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="filePath"
          label="保存路径"
          width="280"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="fileSize"
          label="文件大小"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="上传时间"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="toDownload(scope.row)"
              >下载</el-button
            >
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
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="fileData.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from 'axios';
import { mapGetters } from "vuex";
export default {
  name: "fileList",
  data() {
    return {
      page: 1,
      pageSize: 4,
      fileName: "",
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["fileData"]),

    // 计算属性：将dept小仓库中的pageData中的records拿出来
    records() {
      return this.fileData.records;
    },
  },
  methods: {
    // 去添加科室
    toAddFile() {
      this.$router.push("/addFile");
    },

    async handleCurrentChange(val) {
      try {
        const params = {
          page: val,
          pageSize: this.pageSize,
        };
        await this.$store.dispatch("QueryFile", params);
      } catch (error) {}
    },

    // 调用store里的方法，获取服务器数据,将数据展示在页面，
    // 即分页查询，包括搜索查询
    async getData() {
      try {
        const params = {
          page: this.page,
          pageSize: this.pageSize,
          fileName: this.fileName,
        };
        await this.$store.dispatch("QueryFile", params);
      } catch (error) {
        alert(error.msg);
      }
    },

    // 删除文件
    async handleDelete(index, row) {
      try {
        const id = row.fileId;
        await this.$store.dispatch("deleteFile", id);
        if ((this.fileData.total - 1) % this.pageSize == 0) {
          const params = {
            page: (this.fileData.total - 1) / this.pageSize,
            pageSize: this.pageSize,
            fileName: this.fileName
          };
          await this.$store.dispatch("QueryFile", params);
        } else {
          this.getData();
        }
      } catch (error) {
        alert(error.msg);
      }
    },

    // 下载共享文档
    async toDownload(row){
      const fileId = row.fileId
      // axios.get('http://localhost:8080/file/download/common',row.fileId)
      const thisImage =  await  this.$store.dispatch('downLoad',fileId)
      // 以blob的形式打印出来
      // console.log(thisImage)
      // 创建一个临时下载url
      const thisUlrl = URL.createObjectURL(thisImage)
      // console.log(thisUlrl)

      // 在页面上点击下载按钮创建一个临时的a链接，用于下载操作
      const link = document.createElement('a');
      // 下载的地址（从何处下载）
      link.download = row.filePath;
      // 下载的url即为创建的thisUrl
      link.href = thisUlrl;
      // 打开新的页面
      // link.target = '_blank'
      // 将link元素隐藏
      link.style.display = 'none'
      // 将这个link元素添加到页面body中
      document.body.appendChild(link);
      // 触发下载事件
      link.click();
      // 下载完成移除临时url
      URL.revokeObjectURL(link.href);
      // 同样移除临时link
      document.body.removeChild(link);
    },

  },
};
</script>
  
  <style lang="less" scoped>
.fileContainer {
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
  .fileTable {
    position: absolute;
    /* display: flex; */
    top: 175px;
    width: 992px;
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