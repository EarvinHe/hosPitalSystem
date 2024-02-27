<template>
  <div class="loginPage">
    <div class="loginBack">
      <!-- 导入el表单 -->
      <el-form
        label-width="70px"
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="loginContainer"
      >
        <h1 class="loginTitle">医疗管理系统登录</h1>

        <!-- 输入用户名 -->
        <el-form-item label="用户名" prop="userName">
          <el-input
            type="text"
            autocomplete="off"
            v-model="loginForm.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <!-- 输入密码 -->
        <el-form-item :label="'密\xa0\xa0\xa0码'" prop="password">
          <el-input
            type="password"
            autocomplete="off"
            v-model="loginForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item label="验证码" class="validateCode" prop="code">
          <div class="captcha-box">
            <el-input
              type="text"
              style="width: 200px"
              autocomplete="off"
              v-model="loginForm.code"
              placeholder="输入验证码"
            ></el-input>
            <img
              @click="changeCaptcha"
              width="80px"
              height="40px"
              :src="captchaUrl"
            />
          </div>
        </el-form-item>

        <el-form-item id="login-btn-box">
          <el-button class="login-btn1" @click="resetForm('loginForm')"
            >重置</el-button
          >
          <el-button class="login-btn2" type="primary" @click="submitLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
        code: "",
      },
      captchaUrl: "",
      rules: {
        // 必填项:required
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          // { validator: validateUsername, trigger: "blur" }, //自定义校验
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // { validator: this.validatePassword, trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  created() {
    // // 当组件创建完成后调用
    this.changeCaptcha();
  },
  methods: {
    // 引入MapMutations，存储userId
    ...mapMutations(["SETUSERDATA"]),
    // 登录方法
    /*   validate：对整个表单进行校验的方法，
    参数为一个回调函数。该回调函数会在校验结束后被调用，
    并传入两个参数：是否校验成功和未通过校验的字段。
    若不传入回调函数，则会返回一个 promise */
    submitLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          // 校验成功，接下来发起请求
          try {
            const data = {
              userName: this.loginForm.userName,
              password: this.loginForm.password,
              code:this.loginForm.code
            };
            const res = await this.$store.dispatch("userLogin", data);
            if ((res == "ok")) {
              this.$message({
                message: "登录成功",
                type: "success",
                showClose: true,
              });
            }else{
              this.$message({
                message: res,
                type: "error",
                showClose: true,
              });
            }
            this.$router.push("/");
          } catch (error) {}
        }
      });
    },

    // 验证码()
    async changeCaptcha() {
      const res = await this.$store.dispatch("userCode");
      // const reader = new FileReader();
      // // const imageUrl = reader.result;
      this.captchaUrl = "data:image/png;base64" + res;
    },

    loginSuccess(userName) {
      // 登录成功后的逻辑
      // 可以在这里将用户名存储到本地存储或进行其他操作
      localStorage.setItem("userName", userName);
    },

    // 重置登录信息
    resetForm() {
      this.$refs.loginForm.resetFields();
    },

    // 去注册
    toRegist() {
      this.$router.push("/regist");
    },
  },
};
</script>

<style>
.loginPage {
  width: 100%;
  height: 100%;
  /* background-size: contain; */
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(../../assets/ai.png);

  /* background: url(../../assets/loginBack.png); */
  position: relative;

  .loginBack {
    width: 350px;
    border-radius: 15px;
    background-clip: border-box;
    background-color: aliceblue;
    border: 1px solid #eaeaea;
    margin: auto;
    padding: 15px 30px;
    box-shadow: 0 0 25px #a9b2b6;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .loginTitle {
      text-align: center;
      margin: 5px 5px 15px 5px;
    }
    /* ::v-deep #login-btn-box.el-form-item__content {
    margin-left: 100px ;
  } */

    #login-btn-box {
      display: flex;
      margin-left: 25px;
      .login-btn1 {
        margin-right: 20px;
      }
    }
  }
  .captcha-box {
    display: flex;
  }
}
</style>