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
        <el-form-item label="用户Id">
          <el-input v-model="UserUpdateForm.userId"></el-input>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="UserUpdateForm.realName"></el-input>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="UserUpdateForm.userName"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="UserUpdateForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="选择职位">
          <el-select
            style="width: 200px"
            multiple
            placeholder="重新选择你的职位"
            v-model="UserUpdateForm.authId"
            @change="handleSelectionChange"
          >
            <el-option
              v-for="(auth, index) in allAuths"
              :key="auth.authId"
              :label="auth.authDesc"
              :value="auth.authId"
              >{{ auth.authDesc }}</el-option
            >
          </el-select>
        </el-form-item>

        <el-form-item label="生日">
          <el-col :span="11">
            <el-date-picker
              type="date"
              v-model="UserUpdateForm.birth"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 200px"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="UserUpdateForm.mobile"></el-input>
        </el-form-item>

        <el-button
          class="finishUpdate"
          type="primary"
          size="small"
          @click="updateUser"
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
      UserUpdateForm: {
      userName: "",
        password: "",
        deptId: "",
        authId: [],
        realName: "",
        birth: "",
        sex: "",
        mobile: "",
        email: "",
        image: "",
      },
      dialogFormVisible: false,
      // isModal:false

      // 限定一个人能担任的最大职位数
      maxSelections: 2,
    };
  },
  computed: {
    ...mapState({
      allAuths: (state) => state.auth.allAuths,
    }),
  },
  methods: {
    openUpdateDialog(data) {
      this.dialogFormVisible = true;
      this.UserUpdateForm = data;
      // 查询所有职位
      this.$store.dispatch("queryAllAuth");
      console.log(this.UserUpdateForm);
    },

    // 限定所选职位最大值
    handleSelectionChange(selection) {
      if (selection.length > this.maxSelections) {
        this.UserUpdateForm.authId = this.UserUpdateForm.authId.slice(
          0,
          this.maxSelections
        );
      }
    },

    //   修改用户数据
    async updateUser() {
      try {
        // 用es6中的map方法，先将authId数组中的每个元素转化成对象，
        // 之所以转化成对象，是因为后端数据库结构如此，没办法
        const authArray = this.UserUpdateForm.authId.map((item) => ({
          authId: item,
        }));
        console.log(authArray);
        const data = {
          userId: this.UserUpdateForm.userId,
          realName: this.UserUpdateForm.realName,
          userName: this.UserUpdateForm.userName,
          sex: this.UserUpdateForm.sex,
          auths: authArray,
          birth: this.UserUpdateForm.patientTelphone,
          mobile: this.UserUpdateForm.patientAddress,
        };
        await this.$store.dispatch("updateUserByUserId", data);
        this.$message({
          message: "修改成功",
          type: "success",
          showClose: true,
        });
        // 关闭dialog
        this.dialogFormVisible = false;
      } catch (error) {}
    },

    // 刷新父页面数据
    handleDialogChange(){
      this.$emit('refresh-data')
    }
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