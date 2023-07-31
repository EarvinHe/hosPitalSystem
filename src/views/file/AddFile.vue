<template>
  <div class="addPage">
    <div class="container">
      <h1 class="addTitle">上传文件</h1>
      <form id="addForm" class="addForm" @submit.prevent="uploadFile">
        <input class="inputData" type="file" ref="fileInput" multiple />
        <button class="loadButton" type="submit">Upload</button>
      </form>
    </div>
    F
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  name: "addFile",
  data() {
    return {};
  },
  methods: {
    async uploadFile() {
      const files = this.$refs.fileInput.files;
      const formData = new FormData();
      // 将选择的文件添加到FormData对象中
      for (let i = 0; i < files.length; i++) {
        formData.append("uploadFiles", files[i]);
      }

      // 使用Axios或其他HTTP客户端发送POST请求
      axios
        .post("http://localhost:8080/file/upload/common", formData)
        .then((response) => {
          // 处理上传成功的响应
          this.$message({
              message: "上传成功",
              type: "success",
              showClose: true,
            });
          this.$router.push('/fileList')
        })
        .catch((error) => {
          // 处理上传失败的错误
        });
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
    width: 500px;
    height: 200px;
    border: 1px solid rgb(211, 211, 211);
    border-radius: 6px;
    left: 50%;
    top: 30%;
    margin: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    .addTitle {
      font-size: larger;
      text-align: center;
      margin: 10px 5px 20px 5px;
    }
  }
  .addForm{
    display: flex;
    height: 35px;
    align-items: center;
    // border: 1px solid #ceabab;
    padding: 2px 5px;
    border-radius: 5px;
  }
  .inputData::file-selector-button {
      /* 自定义样式 */
      margin-top: 2px;
      height: 32px;
      width: 80px;
      border:#40a0ffe6 ;
      border-radius: 5px;
      color: #fff;
      background-color: #40a0ffc0;
      cursor: pointer;
    }
    // 用伪类来给按钮加一个点击改变颜色
    .inputData::file-selector-button:active{
      background-color: #409EFF;
    }
    .inputData{
      display: flex;
      width: 400px;
      align-items: center;
      padding: 2px 5px;
      height: 35px;
      border: 1px solid #b4bccc;
      border-radius: 5px 0px 0px 5px ;
      transition: border-color 0.3s ease;
    }
    .inputData:focus{
      border: 1px solid #409EFF;
    }
    .loadButton{
      width: 80px;
      height: 40.6px;
      background-color: #67C23A;
      border:none;
      cursor: pointer;
      border-radius: 0px 5px 5px 0px ;
    }
    .loadButton:active{
      background-color: #5eb533;
    }
}
</style>