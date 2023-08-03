<template>
  <div class="container">
    <div class="tableList">
      <el-button
        type="primary"
        plain
        style="width: 100px; height: 35px; font-size: 10px; text-align: center" @click="toAddAuth"
        >+添加职位</el-button
      >
      <el-table :data="tableData" style="width: 100%">
        <el-table-column :label="'职位/权限   '" align="center">
          <el-table-column
            prop="authId"
            label="职位id"
            width="150"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="authName"
            label="职位名"
            width="150"
            align="center"
          >
          </el-table-column>

          <el-table-column
            prop="authDesc"
            label="职位描述"
            width="150"
            align="center"
          >
          </el-table-column>

          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="toUpdateAuth(scope.row)"
                >编辑</el-button
              >
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
    </div>
    <!-- 添加一个自定义事件，以在dialog关闭时触发重新刷新页面数据 -->
    <authUpdate ref="authUpdate" @refresh-updateData="refreshUpdateData"></authUpdate>
    <addAuthDialog ref="addAuth" @refresh-data="refreshData"></addAuthDialog>
  </div>
</template>
      
  <script>
import addAuthDialog from "./addAuthDialog.vue";
import { mapGetters, mapState } from "vuex";
import AuthUpdate from "./authUpdate.vue";
export default {
  components: {
    addAuthDialog,
    AuthUpdate
},
  data() {
    return {
      tableData: [],
      realName: null,
    };
  },
  mounted() {
    this.getAuth();
  },
  computed: {
    ...mapState({
      allAuths: (state) => state.auth.allAuths,
    }),
  },

  methods: {
    // 查询数据并显示
    async getAuth() {
      try {
        await this.$store.dispatch("queryAllAuth");
        this.tableData = this.allAuths;
      } catch (error) {}
    },

    // 删除这条数据
    async deleteThisRow(row) {
        try {
          await this.$store.dispatch("deleteAuth", row.authId);
          this.getAuth()
        } catch (error) {}
    },

    // 去添加数据
    toAddAuth() {
      this.$refs.addAuth.openAddDialog()
    },
    // 去修改
    toUpdateAuth(row){
      this.$refs.authUpdate.openUpdateDialog(row)
    },
    //自定义刷新数据事件
    refreshData() {
      this.getAuth()
    },
    refreshUpdateData(){
      this.getAuth()
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
  position: relative;
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