  <template>
  <el-drawer
    size="25%"
    style="border-radius: 15px 0px 0px 15px;"
    id="drawer"
    title="超级管理员"
    :visible.sync="drawer"
    :with-header="true"
  >
  <el-divider></el-divider>
  <span class="el-icon-user" @click="toUsers">用户管理</span>

  <span class="el-icon-plus" @click="toAddUser">添加用户</span>
  
  <span class="el-icon-refresh">更新用户</span>


  </el-drawer>
</template>
  <script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    openDrawer() {
      this.drawer = true;
    },
    toUsers(){
      this.$router.push('/users')
    },
    toAddUser(){
      this.$router.push('/regist')
    }
  },
};
</script>

  <style scoped>
/* 使用v-deep来穿透原有的样式，使之能够选中深层次控制圆角的元素，进而给抽屉添加圆角 */
#drawer ::v-deep .el-drawer__open .el-drawer.rtl {
  border-radius: 15px 0px 0px 15px;
}
#drawer ::v-deep .el-drawer__header{
  color: rgb(0, 0, 0);
}
.el-divider--horizontal{
  width: 90%;
  margin:  12px;
}
span{
  display: flex;
  align-items: center;
  width: 340px;
  height: 35px;
  cursor: pointer;
  margin: 7px 20px;
  color: rgb(92, 92, 92);
  transition: background-color 0.4s ;
  /* animation: fadeToGray forwards 1s; */
}

span:hover{
  display: flex;
  align-items: center;
  width: 340px;
  height: 35px;
  border-radius: 5px;
  background-color: rgb(230, 230, 230);
 
}
.el-icon-user:before{
  margin-right: 15px;
  margin-left: 5px;
}
.el-icon-refresh:before{
  margin-right: 15px;
  margin-left: 5px;
}
.el-icon-plus:before{
  margin-right: 15px;
  margin-left: 5px;
}
</style>