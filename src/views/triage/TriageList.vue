<template>
  <div class="container">
    <el-card
      class="box-card1"
      shadow="hover"
      v-for="(dept, index) in allDepts"
      :key="dept.deptId"
    >
      <div slot="header" class="clearfix">
        <span>{{ dept.deptName }}</span>
        <el-button style="float: right;
         padding: 3px 0; color: rgb(4, 154, 109)" 
          @click="toTriage(dept.deptId,dept.deptName)" type="text">开诊</el-button
        >
      </div>
      <div  class="text item" >
        {{ "待诊人数："+ dept.count  }}
      </div>
      <div class="text item">
        {{ "地址：" + dept.location }}
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "triageList",
  data() {
    return {
      allDepts: [],
      eachDeptPatient:'',

    };
  },
  mounted() {
    this.getDeptData();
  },
  computed: {
    ...mapGetters(["deptData"]),
    // ...mapGetters(['patientCount'])
  },
  methods: {
    async getDeptData() {
      await this.$store.dispatch("showAllDepts");
      const allDepts = JSON.parse(JSON.stringify(this.deptData));
      this.allDepts = allDepts;
     },

       // 点击去分诊
  toTriage(deptId,deptName){
    this.$router.push({name:'triageDetail',params:{deptId:deptId},query:{deptName}})
    // this.$router.push({path:'/triageDetail',query:{deptId}})
  }
  },


};
</script>

<style lang="less" scoped>
.container {
  /* display: flex;  */
  display: grid;
  grid-template-columns: repeat(
    3,
    1fr
  ); /* 将容器分为三列，每列平均占据剩余空间的1/3 */
  /* 可以添加其他样式，如边距、填充等 */
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card1 {
  width: 440px;
  margin: 35px;
}
</style>