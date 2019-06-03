<template>
  <div class="container headerBar">
    <div class="main">
        <h1 class="logo fl">
        </h1>
        <div class="fr">
          <div class="login">
            <el-button type="primary" size="small">工作台</el-button>
            <i class="icon-login-out"></i>
          </div>
        </div>
        <div class="topNav fr">
          <ul class="fr navInside">
            <li :class="{active:this.$route.path === '/'}"><nuxt-link to="/">首页</nuxt-link></li>
            <li :class="{active:this.$route.path === '/supplier'}"><nuxt-link to="/supplier"> 供应商</nuxt-link></li>
            <li :class="{active:this.$route.path === '/exhibition'}"><nuxt-link to="/exhibition"> 款式廊</nuxt-link></li>
            <li :class="{active:this.$route.path === '/cart'}"><nuxt-link to="/cart"> 购物车({{collectNum}})</nuxt-link></li>
            <li :class="{active:this.$route.path === '/indent'}"><nuxt-link to="/indent"> 订货单</nuxt-link></li>
            <li :class="{active:this.$route.path === '/favorite'}"><nuxt-link to="/favorite"> 收藏夹</nuxt-link></li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data (){
    return {
      activeIndex: this.$route.path,
      collectNum: 10
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

