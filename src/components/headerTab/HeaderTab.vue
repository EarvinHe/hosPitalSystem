<template>
  <div class="headerTab">
    <h1>分诊管理系统</h1>
    <!-- 未登录 -->
    <ul class="loginRegist" v-if="!userName">
      <router-link to="/login">你好，请登录</router-link>
      <li class="spacer"></li>
      <router-link to="/regist">注册</router-link>
    </ul>
    <!-- 登录之后 -->
    <ul class="loginRegist" v-else="userName">
      <a>{{ userName }}</a>
      <li class="spacer"></li>
      <a @click="logout">退出登录</a>
      <li class="spacer"></li>
     <i class="el-icon-user-solid" style="height: 20px;width: 20px;" @click="toManager"></i>
    </ul>
    <SuperManager ref="SuperManager"></SuperManager>
  </div>
  
</template>

<script>
import SuperManager from '@/views/superManager/SuperManager'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      AdminName: "",
    };
  },
  components:{
    SuperManager
  },
  computed: {
    ...mapGetters(['userName'])
  },


  methods: {
    toManager(){
      this.$refs.SuperManager.openDrawer()
    },

    // 登出
    async logout() {
      try {
        await this.$store.dispatch("userLogout");
        // 重新加载页面(不符合逻辑，应只需重新加载该组件，将曾经登录的用户名去掉)
        // location.reload();
        // 先将用户名去掉，再重新加载该组件
        // this.userName = null
        this.$router.push('/login')
      } catch (error) {
        alert(error.msg);
      }
    },

    //超级管理员的权限，用户设置等
    userManager(){
      
    }
  },
};
</script>

<style lang="less" scoped>
.headerTab {
  display: flex;
  height: 35px;
  justify-content: space-between;
  background: #f1f0f0;
  h1 {
    font-size: x-large;
    font-weight: bold;
    color: #485454;
    padding: 5px;
    font-family: sans-serif;
    margin: 0px 0px 0px 165px;
  }
  li {
    width: 1px;
    height: 12px;
    margin: 0px 10px 0px 10px;
    padding: 0px;
    background: #c6bcbc;
    overflow: hidden;
  }
  .loginRegist {
    display: flex;
    float: left;
    padding: 5px;
    margin: 5px 160px 0px 0px;
    a {
      text-decoration: none;
      font-size: 13px;
      color: #666;
    }
    a:hover {
      cursor: pointer;
      color: #50a0a0;
    }
    .Regist {
      margin: 0px 10px;
    }
    .Login {
      margin: 0px 10px;
    }
   .el-icon-user-solid:hover{
    cursor: pointer;
    color: #50a0a0;
   }
  }
}
</style>