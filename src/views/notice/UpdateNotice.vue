<template>
  <div class="updatePage">
    <div class="container">
      <h1 class="updateTitle">通知修改</h1>
      <el-form
        ref="updateNoticeForm"
        :model="updateNoticeForm"
        label-width="100px"
      >
        <el-form-item label="通知标题">
          <el-input v-model="updateNoticeForm.noticeName"></el-input>
        </el-form-item>
        <el-form-item label="通知内容">
          <el-input
            type="textarea"
            v-model="updateNoticeForm.noticeContent"
          ></el-input>
        </el-form-item>
        <el-button type="success" plain @click="updateNotice"
          >修改完成</el-button
        >
      </el-form>
    </div>
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";
export default {
  name: "updateNotice",
  data() {
    return {
      updateNoticeForm: {
        noticeName: "",
        noticeContent: "",
      },
    };
  },
  mounted() {
    this.queryData();
  },
  computed: {
    noticeId() {
      return this.$route.query.noticeId;
    },
    ...mapGetters(["noticeData2"]),
  },
  methods: {
    // 根据id查询数据
    async queryData() {
      try {
        await this.$store.dispatch("updateQueryNotice", this.noticeId);
        this.updateNoticeForm = this.noticeData2;
      } catch (error) {}
    },

    // 修改通知
    async updateNotice() {
      try {
        const data = this.updateNoticeForm;
        const result = await this.$store.dispatch("updateNotice", data);
        if (result == "ok") {
          this.$message({
            message: "修改成功",
            type: "success",
            showClose: true,
          });
        }
          this.$router.push("/noticeList");
        
      } catch (error) {}
    },
  },
};
</script>
  
  <style lang="less" scoped >
.updatePage {
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

    .updateTitle {
      font-size: larger;
      text-align: center;
      margin: 10px 5px 20px 5px;
    }
  }
}
</style>