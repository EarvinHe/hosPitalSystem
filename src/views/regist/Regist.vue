<template>
  <div class="registPage">
    <div class="registBack">
      <!-- 导入el表单 -->
      <h1 class="registTitle">用户注册</h1>
      <el-form
        size="small"
        ref="registForm"
        :rules="rules"
        :model="registForm"
        class="registCotainer"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="registForm.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item :label="'密\xa0\xa0\xa0码'" prop="password">
          <el-input
            type="password"
            v-model="registForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="真实姓名" prop="realName">
          <el-input
            v-model="registForm.realName"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item label="版本" prop="version">
          <el-input
          type="number"
            v-model="registForm.version"
            placeholder="请输入版本"
          ></el-input>
        </el-form-item> -->

        <el-form-item :label="'性\xa0\xa0\xa0别'" prop="sex">
          <el-radio-group v-model="registForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="'生\xa0\xa0\xa0日'" prop="birth">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              v-model="registForm.birth"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile">
          <el-input
            v-model="registForm.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>

        <el-form-item :label="'邮\xa0\xa0\xa0箱'" prop="email">
          <el-input
            v-model="registForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>

        <!--  <el-form-item label="选择文件" prop="">
          <el-input type="file" v-model="registForm.realName"></el-input>
        </el-form-item> -->

        <el-form-item label="选择科室">
          <el-select
            style="width: 420px"
            placeholder="请选择科室"
            v-model="registForm.deptId"
          >
            <el-option
              v-for="(dept, index) in deptInfo"
              :key="dept.deptId"
              :label="dept.deptName"
              :value="dept.deptId"
              >{{ dept.deptName }}</el-option
            >
            <!-- <el-option label="脑科" value="脑科">脑科</el-option>s -->
          </el-select>
        </el-form-item>

        <el-form-item label="选择职位">
          <el-select
            style="width: 420px"
            multiple
            placeholder="请选择你的职位"
            v-model="registForm.authId"
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

        <el-form-item label="用户头像">
          <input
            type="file"
            name="uploadFile"
            multiple
            @change="handlerClick"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="userRegist">注册</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
let _fileObj;
import axios from "axios";
import { mapGetters, mapState } from "vuex";
export default {
  name: "regist",
  data() {
    return {
      registForm: {
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
        // version:1,
      },
      files: [],
      // 校验规则:
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        birth: [{ required: true, message: "请选择日期", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        // deptName: [{ required: true, message: "请选择科室", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      },
    };
  },
  mounted() {
    // 注册页面加载时查询所有科室,测试返回的数据格式
    this.$store.dispatch("selectAllDepts", {});
    // 注册时查询所有可供选择的职位
    this.$store.dispatch("queryAllAuth");

    // console.log(JSON.parse(JSON.stringify (this.allAuths)))
  },
  computed: {
    ...mapGetters(["deptInfo"]),
    ...mapState({
      allAuths: (state) => state.auth.allAuths,
    }),
  },
  methods: {
    // 用户注册
    async userRegist() {
      try {
        // 用es6中的map方法，先将authId数组中的每个元素转化成对象，
        // 之所以转化成对象，是因为后端数据库结构如此，没办法
        const authArray = this.registForm.authId.map((item) => ({
          authId: item,
        }));
        console.log(authArray);

        /*      // 将参数结构赋值
      const {birth,deptId,email,mobile,password,realName,sex,userName} = this; */
        await this.$store.dispatch("userRegist", {
          birth: this.registForm.birth,
          deptId: this.registForm.deptId,
          auths: authArray,
          email: this.registForm.email,
          mobile: this.registForm.mobile,
          password: this.registForm.password,
          realName: this.registForm.realName,
          sex: this.registForm.sex,
          userName: this.registForm.userName,
          image: this.registForm.image,
        });
        this.$router.push({
          name: "userList",
          params: { deptId: this.registForm.deptId },
        });
      } catch (error) {
        alert(error.msg);
      }
    },

    // 上传用户头像，绑定点击事件，获取文件
    async handlerClick(e) {
      let uploadFile = e.target.files[0];
      // 将得到的文件列表转换成真正的数组
      // this.files = Array.from(uploadFile)
      _fileObj = uploadFile;
      let formData = new FormData();
      formData.append("uploadFile", _fileObj);
      const result = await axios.post(
        "http://localhost:8080/file/upload/image",
        formData
      );
      this.registForm.image = result.data.data;
    },
  },
};
</script>

<style lang="less" scoped>
.registPage {
  width: 100%;
  height: 100%;
  /* background-size: contain; */
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(../../assets/ai.png);

  /* background: url(../../assets/loginBack.png); */
  position: relative;

  .registBack {
    width: 500px;

    border-radius: 15px;
    background-clip: border-box;
    background-color: aliceblue;
    border: 1px solid #eaeaea;
    margin: auto;
    padding: 30px;
    box-shadow: 0 0 25px #a9b2b6;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .registTitle {
      text-align: center;
      margin: 0px 5px 20px 5px;
    }
  }
  .el-form-item {
    margin-bottom: 15px;
  }
}
</style>