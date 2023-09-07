<template>
  <div class="addPage">
    <div class="container">
      <h1 class="addTitle">上传文件</h1>
      <form id="addForm" class="addForm" @submit.prevent="uploadFile" >
        <input class="inputData" type="file" ref="fileInput" multiple />

        <button class="loadButton" type="submit">Upload</button>
      </form>
    </div>
    
  </div>
</template>
  

  <script>
  // import md5 from 'md5'
export default {
  name: "addFile",
  data() {
    return {
      uploadProgress: 0,
      // customColor: "#409eff",
    };
  },
  methods: {
// 切片
 /*  async handleChange(e){
          let chunkSize = 1024*1024;//1mb
          const target = e.target;
          // console.log(e)
          if(target.files){
            const file = target.file[0];
            const {name,size} = file;
            let start =0;
            let index = 0;
            while (start<size){
              let blob = null;
              if(start + chunkSize > size){
                blob = file.slice(start,size);
              }else{
                blob = file.slice(start,start+ chunkSize)
              }
              start += chunkSize;
              let blobFile = new File([blob],name);
              let formData = new FormData();
            }
          }
        }, */

    async uploadFile() {
      try {
        const files = this.$refs.fileInput.files;
        // const formData = new FormData();
        const startTime = performance.now(); // 记录请求开始的时间
        // 将选择的文件添加到FormData对象中
        let chunkSize = 20*1024*1024;//20mb
        for (let i = 0; i < files.length; i++) {
          
          // 解构赋值
          const {name,size} = files[i];
          let start =0;
            let index = 0;
            while (start<size){
              let blob = null;
              if(start + chunkSize > size){
                // 文件小于单一切片大小时不用切直接传过去
                blob = files[i].slice(start,size);
              }else{
                // 文件大于切片大小时，从start到start+chunkSize中切片
                blob = files[i].slice(start,start+ chunkSize)
              }
              start += chunkSize;
              // new一个File对象
              let blobFile = new File([blob],name);
              // new一个fromData对象，用于将切片存入
              const formData = new FormData();
              formData.append("uploadFiles", blobFile);
              formData.append("index", index + '');
              const res = await this.$store.dispatch("addFile", formData);
              console.log(res);
            }

          // formData.append("uploadFiles", files[i]);
        }
        // const res = await this.$store.dispatch("addFile", formData);
        // console.log(res);
        const endTime = performance.now(); // 记录请求结束的时间
        const timeTaken = endTime - startTime; // 计算响应时间
        console.log("请求的响应时间：", timeTaken.toFixed(2), "毫秒"); // 打印响应时间
        if (res == "ok") {
          this.$message({
            message: "文件上传成功",
            type: "success",
            showClose: true,
          });
        }
        // this.$router.push("/fileList");
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
  .addForm {
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
    border: #40a0ffe6;
    border-radius: 5px;
    color: #fff;
    background-color: #40a0ffc0;
    cursor: pointer;
  }
  // 用伪类来给按钮加一个点击改变颜色
  .inputData::file-selector-button:active {
    background-color: #409eff;
  }
  .inputData {
    display: flex;
    width: 400px;
    align-items: center;
    padding: 2px 5px;
    height: 35px;
    border: 1px solid #b4bccc;
    border-radius: 5px 0px 0px 5px;
    transition: border-color 0.3s ease;
  }
  .inputData:focus {
    border: 1px solid #409eff;
  }
  .loadButton {
    width: 80px;
    height: 40.6px;
    background-color: #67c23a;
    border: none;
    cursor: pointer;
    border-radius: 0px 5px 5px 0px;
  }
  .loadButton:active {
    background-color: #5eb533;
  }
}
</style>