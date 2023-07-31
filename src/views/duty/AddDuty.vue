<template>
  <div class="addPage">
    <div class="container">
      <h1 class="addTitle">添加</h1>
      <el-form
        ref="addDutyForm"
        :model="addDutyForm"
        label-width="100px"
        :inline="true"
        size="small"
      >
        <el-form-item :label="'医生'" >
          <el-select  placeholder="请选择值班医生" v-model="addDutyForm.userId"   style="width: 190px">
            <el-option :label="user.realName"  v-for="(user,index) in userData" :key="user.userId" :value="user.userId">{{user.realName}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="'日期'">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 190px"
              v-model="addDutyForm.workTime"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="科室Id">
          <el-input v-model="addDutyForm.deptId" readonly></el-input>
        </el-form-item>

        <el-button type="success" plain @click="addDuty">添加</el-button>
      </el-form>
    </div>
  </div>
</template>
    
    <script>
import { mapState } from 'vuex';
export default {
  name: "addDuty",
  data() {
    return {
      addDutyForm: {
        //医生id
        userId: "",
        //科室
        deptId: "",
        // 值班日期
        workTime: "",
      },
    };
  },
  mounted() {
    this.addDutyForm.deptId = this.$route.params.deptId;
    this.showUserData()
  },
  computed: {
    deptId() {
      return this.$route.params.deptId;
    },
    ...mapState({
      userData:state=>state.duty.userData
    })
  },
  methods: {
    //在下拉列表中显示可选user
    async showUserData(){
        await this.$store.dispatch('queryUser',this.deptId)

    },

    async addDuty() {
      try {
        const data = this.addDutyForm;
        const consequence =  await this.$store.dispatch("addDuty", data);
        if(consequence == 'ok'){
          this.$message({
              message: "添加成功",
              type: "success",
              showClose: true,
            })
            this.$router.push({  name:"dutyManager", params: { deptId:this.deptId } });
        }else{
          this.$message({
              message: "添加失败",
              type: "warning",
              showClose: true,
            })
        }
      } catch (error) {}
    },
  },
};
</script>
    
    <style lang="less" scoped >
.addPage {
  width: 100%;
  height: 100%;
  display: flex;
  background-size: cover;
  background-image: url(../../assets/h2.jpg);
  overflow: hidden; /* 禁止滚动条 */
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  position: relative;
  .container {
    width: 680px;
    box-shadow: 3px 3px 10px 3px rgba(199, 196, 196, 0.5);
    background-color: rgba(255, 255, 255, 0.5);
    height: 300px;
    border: 1px solid rgb(239, 239, 239);
    border-radius: 6px;
    left: 50%;
    // top: 50%;
    margin: 0;
    position: absolute;
    transform: translate(-50%, -20%);
    .el-form {
      margin: 20px;
    }
    .el-form-item {
      width: 310px;
    }
    .el-form-item__content .el-textarea {
      width: 510px;
      position: absolute;
    }
    .el-button {
      left: 50%;
      // top: 50%;
      margin-top: 80px;
      position: absolute;
      transform: translateX(-50%);
      text-align: center;
      width: 150px;
    }

    .addTitle {
      font-size: larger;
      text-align: center;
      margin: 10px 5px 20px 5px;
    }
  }
}
</style>