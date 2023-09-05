<template>
  <header>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#80becb"
      text-color="#ffffff"
      active-text-color="#a94343"
      >
      <el-menu-item index="1" @click="toHome">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">科室管理</template>
        <el-menu-item index="2-1" @click="toDept">科室管理</el-menu-item>
        <el-menu-item index="2-2" @click="toAddDept">增加科室</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title" >患者管理</template>
        <el-menu-item index="3-1" @click="toPatient">患者管理</el-menu-item>
        <el-menu-item index="3-2" @click="toAddPatient">增加患者</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">分诊管理</template>
        <el-menu-item index="4-1"  @click="toTriage" >分诊管理</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">医药采购平台</template>
        <el-menu-item index="5-1" @click="toDrugList">医药管理</el-menu-item>
        <el-menu-item index="5-2" @click="toDrugCheck">药品审核</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">日志管理</template>
        <el-menu-item index="6-1" @click="toLog">登录日志</el-menu-item>
        <el-menu-item index="6-2"  @click="toLog2">诊断日志</el-menu-item>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">其他管理</template>
        <el-menu-item index="7-1" @click="toFileList">共享文档</el-menu-item>
        <el-menu-item index="7-2" @click="toManagerDuty">值班管理</el-menu-item>
        <el-menu-item index="7-3" @click="toManagerNotice">通知管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </header>
</template>

<script>
export default {
  name:'Header',
  data() {
    return {

    }
  },
  methods: {
    //去首页 
    toHome(){
      this.$router.push('/')
    },

    //点击去科室管理页面
    toDept(){
      this.$router.push('/dept')
    },
    //点击去增加科室页面
    toAddDept(){
      this.$router.push('/addDept')
    },
    // 去药品管理
    toDrugList(){
      this.$router.push('/drugList')
    },
    //点击去药品审核
    toDrugCheck(){
      this.$router.push('/checkDrug')
    },
    // 去患者管理
    toPatient(){
      this.$router.push('/patientList')
    },
    // 去添加患者
    toAddPatient() {
      this.$router.push("/addPatient");
    },

    // 去分诊管理
    toTriage(){
      this.$router.push('/triageList')
    },
    // 去日志页面
    toLog(){
      this.$router.push('/log')
    },

    // // 去日志页面
    toLog2(){
      this.$router.push('/log2')
    },
    // 去管理值班
    toManagerDuty(){
      this.$router.push('/dutyList')
    },
    //去通知管理
    toManagerNotice(){
      this.$router.push('/noticeList')
    },
    // 去文件管理
    toFileList(){
      this.$router.push('/fileList')
    }

  },
};
</script>

<style lang="less" scoped>
header {
  // display: flex;
  height: 60px;
  width: 100%;
  box-shadow: 5px 0px 5px #b9b9b984;
  background-color: #add0d7;
  .header ul{
    white-space: nowrap;
  }
  // overflow: auto; /* 或者 overflow: scroll; */
  .el-menu-item{
    margin: 0px 0px 0px 150px;
  }

}
</style>