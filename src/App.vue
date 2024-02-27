<template>
  <div id="app">
     <!-- 路由出口；路由匹配到的组件将显示在这里   -->
     <HeaderTab></HeaderTab>
     <Header></Header>
  <router-view>
   
  </router-view>

  </div>
</template>

<script>
import HeaderTab from '@/components/headerTab/HeaderTab'
import Header from '@/components/header/Header'

export default {
  name: 'app',
  components: {
    HeaderTab,
    Header
  }
}
</script>

<style >
  html,body,#app{
    height: 100%;
    width: 100%;
    overflow-x: hidden;
     /* 或者  */
    /* position: relative; */
    /* padding: 0px; */
    position: relative;
  }

</style>
