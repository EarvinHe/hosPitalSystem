<template>
  <div class="container">
    <div class="tableList">
      <el-button
        type="primary"
        plain
        style="width: 100px; height: 35px; font-size: 10px; text-align: center"
        @click="toAddDuty(deptId)"
        >+添加用户</el-button
      >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column :label="'用户（医生）信息   '" align="center">
         
          <el-table-column type="index" :index="indexMethod"  width="60" align="center" label="序列">
        </el-table-column>

          <el-table-column v-if="false" prop="userId" label="ID" width="150" align="center">
          </el-table-column>

          <el-table-column
            prop="realName"
            label="医生姓名"
            width="100"
            align="center"
          >
          </el-table-column>

          <el-table-column prop="sex" label="性别" width="150" align="center">
            <template slot-scope="scope">
              {{ getGenderText(scope.row.sex) }}
            </template>
          </el-table-column>

          <el-table-column
            prop="auths[0].authDesc"
            label="职位1"
            width="100"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="auths[1].authDesc"
            label="职位2"
            width="100"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="mobile"
            label="联系电话"
            width="150"
            align="center"
          >
          </el-table-column>

          <el-table-column prop="email" label="邮箱" width="180" align="center">
          </el-table-column>

          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="toUpdateUser(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteThisRow(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <!-- <span class="demonstration">直接前往</span> -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="doctorsData.total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 添加一个自定义事件，以在dialog关闭时触发重新刷新页面数据 -->
    <UserUpdate ref="UserUpdate" @refresh-data="refreshData"></UserUpdate>
  </div>
</template>
    
<script>
import UserUpdate from "./UserUpdate.vue";
import { mapGetters, mapState } from "vuex";
export default {
  components:{
    UserUpdate
  },
  data() {
    return {
      tableData: [
      ],
      page: 1,
      pageSize: 2,
      realName: null,
      titleName: "",
    };
  },
  mounted() {
    this.pageUsers();
    
  },
  computed: {
    /*  ...mapState({
        doctorsData:state=>state.user.doctorsData
      }), */
    ...mapGetters(["doctorsData"]),
    deptId() {
      return this.$route.params.deptId;
    },
    records() {
      return this.doctorsData.records;
    },

  },

  methods: {
     // 自定义索引
     indexMethod(index) {
      return (this.page - 1) * this.pageSize + (index + 1);
    },
    // 将代表性别的数字转换程文字
    getGenderText(sex) {
      return sex === 0 ? "女" : "男";
    },
    // 翻页时分页查询
    async handleCurrentChange(val) {
      try {
        console.log(this.doctorsData)
        await this.$store.dispatch("queryAllDoctors", {
          deptId: this.deptId,
          page: val,
          pageSize: this.pageSize,
          realName: this.realName,
        });
        this.tableData = this.records;
      } catch (error) {}
    },

    // 查询数据分页显示
    async pageUsers() {
      try {
        await this.$store.dispatch("queryAllDoctors", {
          deptId: this.deptId,
          page: this.page,
          pageSize: this.pageSize,
          realName: this.realName,
        });
        this.tableData = this.records;
        // this.tableData.push(this.authDesc) 
        console.log(this.tableData)
      } catch (error) {}
    },

    // 去添加数据
    async toAddDuty(deptId) {
      try {
        await this.$router.push({
          name: "addDuty",
          params: { deptId: deptId },
        });
        
      } catch (error) {}
    },

    // 删除这条数据
    async deleteThisRow(row) {
      try {
        await this.$store.dispatch("deleteUser", row.userId);
        console.log((this.doctorsData.total - 1) % this.pageSize == 0)
        if ((this.doctorsData.total - 1) % this.pageSize == 0) {
          await this.$store.dispatch("queryAllDoctors", {
            deptId: this.deptId,
            page: this.page - 1,
            pageSize: this.pageSize,
            realName: this.realName,
          });
          this.tableData = this.records;
          this.$message({
            message: "删除成功",
            type: "success",
            showClose: true,
          });
        }else{
          this.pageUsers()
        }
      } catch (error) {}
    },

    // 去修改
    toUpdateUser(row){
      this.$refs.UserUpdate.openUpdateDialog(row)
    },
    //自定义刷新数据事件
    refreshData(){
      this.pageUsers()
    }
  },
};
</script>
    
    <style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  position: fixed;
  .tableList {
    height: 100%;
    position: absolute;
    // width: 100%;
    left: 50%;
    transform: translate(-50%, 20%);
  }
  .pagination {
    position: absolute;
    left: 50%;
    margin-top: 15px;
    transform: translateX(-50%);
  }
}
</style>