<template>
  <div id="app">
    <BackTop :height="100" :bottom="30" :right="30">
      <div class="top">
        <img src="./assets/images/return.png" alt="top">
      </div>
    </BackTop>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style scoped>
  .top {
    padding: 10px;
    color: #fff;
    text-align: center;
    border-radius: 50%;
  }

  img {
    background: rgba(10, 13, 13, 0.6);
    border-radius: 50%;
  }
</style>
