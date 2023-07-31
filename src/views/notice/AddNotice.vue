<template>
    <div class="addPage">
      <div class="container">
        <h1 class="addTitle">通知添加</h1>
        <el-form ref="addNoticeForm" :model="addNoticeForm" label-width="100px">
          <el-form-item label="通知标题">
            <el-input v-model="addNoticeForm.noticeName"></el-input>
          </el-form-item>
          <el-form-item label="通知内容">
            <el-input   type="textarea" v-model="addNoticeForm.noticeContent"></el-input>
          </el-form-item>
          <el-button type="success" plain @click="addNotice">添加</el-button>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "addNotice",
    data() {
      return {
        addNoticeForm: {
          noticeName: "",
          noticeContent: "",
        },
      };
    },
    methods: {
      async addNotice() {
        try {
          await this.$store.dispatch("addNotice", this.addNoticeForm);
          this.$message({
                message: "添加成功",
                type: "success",
                showClose: true,
              });
              // 跳转科室管理
              this.$router.push("/NoticeList");
        } catch (error) {
          alert(error.msg)
        }
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
      box-shadow: 3px 3px 10px 3px rgba(199, 196, 196, 0.5);
      background-color: rgba(255, 255, 255, 0.5);
      height: 300px;
      border: 1px solid rgb(239, 239, 239);
      border-radius: 6px;
      left: 50%;
      // top: 50%;
      margin: 0;
      position: absolute;
      transform: translate(-50%, -50%);
      .el-form {
        margin: 20px;
        height: 200px;
      }
      .el-form-item {
        width: 700px;
        
      }
      .el-button {
        left: 50%;
        // top: 50%;
        margin: 0;
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