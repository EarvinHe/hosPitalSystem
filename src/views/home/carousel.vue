<template>
  <el-carousel :interval="4000" type="card" height="250px">
    <el-carousel-item v-for="(Img,index) in images" >
      <img style="width: 100%; height: 100%" :src="require(`../../assets/${Img}`)" alt="" />
      <!-- <h3 class="medium">{{ item }}</h3> -->
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      images: [
        "ai.png",
        "h1.jpg",
        "health.png",
        "hospital.png",
        "loginPage.jpg",
        "hosipital.png",
      ],
    };
  },
};
</script>

<style>
.el-carousel{
  background: linear-gradient(90deg, #dddd,#e7e7e782 ,#bcd3ed,#88b6eb)
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  border-radius: 5px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  border-radius: 5px;
}
</style>