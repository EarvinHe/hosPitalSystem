<template>
  <div class="box-0">
    <!-- <form action=""  class="fromdata"> -->
    <input type="file" name="uploadFile" multiple @change="handlerClick" />
    <button @click="submit">提交</button>
    <!-- </form> -->
  </div>
</template>

<script>
import axios from "axios";
import file from "@/store/file";
let _fileObj;
export default {
  data() {
    return {
      files: [],
    };
  },
  methods: {
    handlerClick(e) {
      let uploadFile = e.target.files[0];
      // 将得到的文件列表转换成真正的数组
      // this.files = Array.from(uploadFile)
      //  _fileObj =this.files;
      _fileObj = uploadFile;
      let formData = new FormData();
      formData.append("uploadFile", _fileObj);
      axios.post("http://localhost:8080/file/upload/image", formData);
    },

    // async submit() {
    //   let formData = new FormData();
    //   formData.append("uploadFiles", _fileObj);
    //   axios.post("http://localhost:8080/file/upload/common", formData);
    // },
  },
};
</script>

<style scoped>
.box-0 {
  margin: 20px;
  width: 400px;
  height: 100px;
  border: 1px solid #ceabab;
}
.fromdata {
  border: 1px solid black;
  height: 35px;
}
::file-selector-button {
  height: 35px;
}
</style>