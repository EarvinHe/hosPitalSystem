<template>
  <div class="container">
    <el-card
      class="box-card1"
      shadow="hover"
      v-for="(duty, index) in allDutys"
      :key="index"
    >
      <div slot="header" class="clearfix">
        <span>{{ duty.deptName }}</span>
        <el-button
          style="float: right; padding: 3px 0; color: rgb(4, 154, 109)"
          type="text"
          @click="toManagerDuty(duty.deptId, duty.deptName)"
          >管理</el-button
        >
      </div>
      <div class="text item">
        {{ "值班人数：" + duty.count }}
      </div>
      <div class="text item">
        {{ "地址：" + duty.deptLocation }}
      </div>
    </el-card>
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";
export default {
  name: "dutyList",
  data() {
    return {
      allDutys: [],
    };
  },
  mounted() {
    this.getdutyData();
  },
  computed: {
    ...mapGetters(["dutyData"]),
  },
  methods: {
    // 获取数据
    async getdutyData() {
      await this.$store.dispatch("DutyCount");
      const allDutys = JSON.parse(JSON.stringify(this.dutyData));
      this.allDutys = allDutys;

    },

    //    去管理值班分页查询页面
    toManagerDuty(deptId, deptName) {
      this.$router.push({
        name: "dutyManager",
        params: { deptId: deptId },
        query: { deptName },
      });
      // this.$router.push({path:'/triageDetail',query:{deptId}})
    },
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