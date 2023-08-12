<template>
  <div class="headerTab">
    <span>分诊管理系统</span>
    <!-- 未登录 -->
    <ul class="loginRegist" v-if="!userName">
      <router-link to="/login">你好，请登录</router-link>
    </ul>
    <!-- 登录之后 -->
    <ul class="loginRegist" v-else="userName">
      <li> <a>{{ userName }}</a></li>
     
      <li><a @click="logout">退出登录</a></li>
     
      <li> <i class="el-icon-user-solid" style="height: 20px; width: 20px" @click="toManager"></i> </li>
    </ul>
    <SuperManager ref="SuperManager"></SuperManager>
  </div>
</template>

<script>
import SuperManager from "@/views/superManager/SuperManager";
import { mapGetters } from "vuex";
import { getToken } from "@/util/token";
export default {
  data() {
    return {
      AdminName: "",
    };
  },
  components: {
    SuperManager,
  },
  computed: {
    ...mapGetters(["userName"]),
  },

  methods: {
    toManager() {
      this.$refs.SuperManager.openDrawer();
    },

    // 登出
    async logout() {
      try {
        // if(getToken()){
        await this.$store.dispatch("userLogout");
        // 重新加载页面(不符合逻辑，应只需重新加载该组件，将曾经登录的用户名去掉)
        // location.reload();
        // 先将用户名去掉，再重新加载该组件
        // this.userName = null

        this.$router.push("/login");
      } catch (error) {}
    },

    //超级管理员的权限，用户设置等
    userManager() {},
  },
};
</script>

<style lang="less" scoped>
.headerTab {
  display: flex;
  height: 35px;
  background: #939393;
  justify-content: space-between;
  padding: 0px 60px;
  align-items: center;
}
span{
  font-size: 30px;
  font-family: 'Microsoft YaHei';
  font-weight: 600;
  color: aliceblue;
  text-shadow: 1px 1px 3px;
}
.loginRegist{
  display: flex;
  align-content: center;

}
.loginRegist li a{
  height: 24px;
  line-height: 12px;
  padding: 0px 10px;
  color: #ebebeb;
  border-right: 1px solid rgb(206, 204, 204);
}
.loginRegist li a:hover{
  cursor: pointer;
}
.el-icon-user-solid{
  color: rgb(220, 219, 219);
  padding: 0 10px;
}
.el-icon-user-solid:hover {
    cursor: pointer;
    color: #50a0a0;
  }
</style>