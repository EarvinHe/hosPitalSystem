<template>
  <div class="homeLayout">
    <div class="carouselPart">
      <carousel></carousel>
    </div>
    <div class="contentView">
      <!-- 这是左边值班表 -->
      <div class="deptLeft">
        <Duty></Duty>
      </div>
      <!-- 这是右边通栏 -->
      <div class="noticeRight">
        <Notice></Notice>
      </div>
    </div>
  </div>
</template>

<script>
import Duty from "../duty/Duty";
import carousel from '@/views/home/carousel'
import Notice from "@/views/notice/Notice";
export default {
  name: "home",
  components: {
    Duty,
    Notice,
    carousel
  },
};
</script>

<style  scoped>
.homeLayout {
  background-image: url(../../assets/h1.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  display: block;
  background: rgb(239, 246, 248);
  width: 100%;
  height: 100vh;
  position: relative;
  }

  .carouselPart{
    margin-top: 1px;
    position: absolute;
    width: 100%;
    height: 250px;
  }
  .contentView {
    /* display: flex; */
    /* position: fixed; */
    position: absolute;
    width: 100%;
    margin-top: 280px;
    height: 200px;
    /* border: chocolate solid 1px; */
  
}
</style>