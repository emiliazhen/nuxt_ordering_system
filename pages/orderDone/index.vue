<template>
  <div class="container">
    <div class="main">
      <div class="clearfix">
        <div class="fl">
          <i class="el-icon-success"></i>
        </div>
        <div class="fr tl">
          <p>您的订单已成功提交！</p>
          <p>订单号：2012010201010201，2010002010201</p>
          <p class="goIndex">
            {{totalTime}} 秒后自动返回首页...
          </p>
        </div>
      </div>
      <div class="btnRow tl">
        <el-button type="primary" round @click="$router.push('/')">返回首页</el-button>
        <el-button round @click="$router.push('/indent')">查看历史订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      totalTime: 10
    }
  },
  mounted () {
    var timerId = window.setInterval(() => {
      this.totalTime--
      if(this.totalTime === 0){
        console.log('done')
        window.clearInterval(timerId)
        this.$router.push('/')
      }
    },1000)
  }
}
</script>


<style lang="scss" scoped>
.main{
  margin:10px auto;
  background-color: #fff;
  padding:120px 410px;
  border: 1px solid #ddd;
  >.clearfix{
    >.fl{
      width: 60px;
      height: 60px;
      font-size: 60px;
      color:#ff9c00;
    }
    >.fr{
      width: 300px;
      >p{
        margin:5px 0;
        &.goIndex{
          color: #555;
        }
      }
    }
  }
  >.btnRow{
    padding:30px 20px;
    >.el-button{
      width: 140px;
    }
  }
}
</style>
