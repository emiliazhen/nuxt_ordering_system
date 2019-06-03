<template>
  <div class="container">
    <div class="main">
      <img src="~assets/images/404.png" alt="404 not found">
      <h3 v-if="error.statusCode === 404">
        404 Not Found 您需要的页面没有找到
      </h3>
      <h3 v-else>
        500页面，服务器错误
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'docPage',
  props: ['error']
}
</script>

<style lang="scss" scoped>
.main{
  padding: 100px;
  height: 100%;
  background-color: #fff;
  h3{
    color: #555;
    margin-top:30px;
  }
}
</style>

