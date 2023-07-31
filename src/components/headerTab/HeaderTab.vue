<template>
  <div class="headerTab">
    <h1>分诊管理系统</h1>
    <!-- 未登录 -->
    <ul class="loginRegist" v-if="!userName">
      <router-link to="/login">你好，请登录</router-link>
      <li class="spacer"></li>
      <router-link to="/Regist">注册</router-link>
    </ul>
    <!-- 登录之后 -->
    <ul class="loginRegist" v-else="userName">
      <a>{{ userName }}</a>
      <li class="spacer"></li>
      <a @click="logout">退出登录</a>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      AdminName: "",
    };
  },
  computed: {
    ...mapGetters(['userName'])
  },


  methods: {
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
      color: #50a0a0;
    }
    .Regist {
      margin: 0px 10px;
    }
    .Login {
      margin: 0px 10px;
    }
  }
}
</style>