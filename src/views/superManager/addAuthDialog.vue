<template>
  <div>
    <el-dialog
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      width="25%"
      style="align-items: center"
      @close="handleDialogChange"
    >
      <!-- 上述自定义了一个触发事件，当dialog关闭时，触发方法，用以再修改完成后刷新父页面数据 -->
      <el-form label-width="100px" size="small">
        <el-form-item label="职位Id">
          <el-input v-model="addAuthForm.authId"></el-input>
        </el-form-item>

        <el-form-item label="职位名称">
          <el-input v-model="addAuthForm.authName"></el-input>
        </el-form-item>

        <el-form-item label="职位描述">
          <el-input v-model="addAuthForm.authDesc"></el-input>
        </el-form-item>

        <el-form-item label="赋权">
          <el-select
            style="width: 200px"
            multiple
            placeholder="选择需要赋予的权限"
            v-model="addAuthForm.menuId"
          >
            <el-option
              v-for="(aMenu, index) in allMenu"
              :key="aMenu.menuId"
              :label="aMenu.menuName"
              :value="aMenu.menuId"
              >{{ aMenu.menuName }}</el-option
            >
          </el-select>
        </el-form-item>

        <el-button
          class="finishUpdate"
          type="primary"
          size="small"
          @click="addAuths"
          >完成</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>
    
    <script>
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      addAuthForm: {
        authId: "",
        authName: "",
        authDesc: "",
        menuId: [],
      },
      dialogFormVisible: false,
      // isModal:false
    };
  },
  computed: {
    ...mapState({
      allAuths: (state) => state.auth.allAuths,

      allMenu: (state) => state.auth.allMenu,
    }),
  },
  methods: {
    openAddDialog() {
      this.dialogFormVisible = true;
      // 查询所有职位
      this.$store.dispatch("reqAllMenu");
    },

    //   添加用户数据
    async addAuths() {
      try {
        // 用es6中的map方法，先将menuId数组中的每个元素转化成对象，
        // 之所以转化成对象，是因为后端数据库结构如此，没办法
        const menuIdArray = this.addAuthForm.menuId.map((item) => ({
          menuId: item,
        }));

        const data = {
          authId: this.addAuthForm.authId,
          authName: this.addAuthForm.authName,
          authDesc: this.addAuthForm.authDesc,
          menus: menuIdArray
        };
        await this.$store.dispatch("addAuth", data);
        this.$message({
          message: "添加成功",
          type: "success",
          showClose: true,
        });
        // 关闭dialog
        this.dialogFormVisible = false;
      } catch (error) {
        console.log(error)
      }
    },

    // 刷新父页面数据
    handleDialogChange() {
      this.$emit("refresh-data");
    },
  },
};
</script>
    
    <style lang="less" scoped>
.el-input {
  width: 200px;
}
.finishUpdate {
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>