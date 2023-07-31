<template>
  <div class="deptContainer">
    <div class="topOption">
      <el-button
        type="primary"
        plain
        style="width: 100px; height: 35px; font-size: 10px; text-align: center"
        @click="toAddDept"
        >+添加科室</el-button
      >
      <el-button
        type="danger"
        plain
        style="width: 100px; height: 35px; font-size: 10px; text-align: center"
        @click="deleteSomeDepts"
        >×删除选中</el-button
      >
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width: 280px; margin-left: 100px"
        v-model="deptName"
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
        :data="pageData.records"
        stripe
        border
        @selection-change="handleSelectionChange"
        style="width: 100%; color: black"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="deptId" label="编号" width="100">
        </el-table-column>
        <el-table-column prop="deptName" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="telephone" label="办公室电话" width="180">
        </el-table-column>
        <el-table-column prop="location" label="所在区域" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="toUpdatePage(scope.row.deptId)"
              >编辑</el-button
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="pageData.total"
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
      // 此deptName用于搜索框
      deptName: "",
      // 这是复选框选中的数据组成一个新的数组
      multipleSelection: [],
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["pageData"]),
    ...mapGetters(["deptData"]),

    // 计算属性：将dept小仓库中的pageData中的records拿出来
    records() {
      return this.pageData.records;
    },
  },
  methods: {
    // 去添加科室
    toAddDept() {
      this.$router.push("/addDept");
    },
    handleSizeChange(val) {
      // 这是动态设置每页条数的方法，但现阶段无此功能
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      const params = {
        page: val,
        pageSize: this.pageSize,
      };
      this.$store.dispatch("showPageDepts", params);
    },

    // 调用store里的方法，获取服务器数据,将数据展示在页面，
    // 即分页查询，包括搜索查询
    async getData() {
      // this.$store.dispatch("showAllDepts");
      try {
        const params = {
          page: this.page,
          pageSize: this.pageSize,
          // deptName用于检索框
          deptName: this.deptName,
        };
        await this.$store.dispatch("showPageDepts", params);
      } catch (error) {
        alert(error.msg);
      }
    },

    async handleDelete(index, row) {
      try {
        const id = row.deptId;
        await this.$store.dispatch("deleteDept", id);
        if ((this.pageData.total - 1) % this.pageSize == 0) {
          const params = {
            page: (this.pageData.total - 1) / this.pageSize,
            pageSize: this.pageSize,
            // deptName用于检索框
            deptName: this.deptName,
          };
          await this.$store.dispatch("showPageDepts", params);
        }else{
          this.getData();
        }
      } catch (error) {
        alert(error.msg);
      }
    },
    // 改变勾选,用于批量删除时选中需要删除的数据
    handleSelectionChange(val) {
      //打印val，查看val的参数的各项属性，尤其是id
      // console.log(val);
      // 将val的值赋给multipleSection数组
      this.multipleSelection = val;
    },

    // 批量删除
    deleteSomeDepts() {
      try {
        this.multipleSelection.forEach(async (item) => {
          await this.$store.dispatch("deleteDept", item.deptId);
          this.getData();
        });
      } catch (error) {
        alert(error.msg);
      }
    },

    // 点击修改去修改页面
    toUpdatePage(deptId) {
      // 路由传参，将要修改的数据的id传到修改页面
      this.$router.push({ path: `/updateDept/${deptId}` });
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