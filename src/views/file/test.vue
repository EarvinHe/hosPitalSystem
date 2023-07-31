<template>
  <form @submit.prevent="uploadFile">
    <input type="file" ref="fileInput" multiple />
    <button type="submit">Upload</button>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  methods: {
    uploadFile() {
      const files = this.$refs.fileInput.files;
      const formData = new FormData();
      // 将选择的文件添加到FormData对象中
      for (let i = 0; i < files.length; i++) {
        formData.append("uploadFiles", files[i]);
      }
      // 使用Axios或其他HTTP客户端发送POST请求
      axios.post("http://localhost:8080/file/upload/common", formData)
        .then((response) => {
          // 处理上传成功的响应
        })
        .catch((error) => {
          // 处理上传失败的错误
        });
    },
  },
};
</script>

<style>
</style>