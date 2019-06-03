<template>
  <div class="articleWrapper clearfix">
    <div class="fl">
      <div class="articleInner tl">
        <h2 class="title">2018春季新款男士风衣</h2>
        <div class="infos">
          <span class="tag">新款发布</span>
          <span class="ctime">1-1 10：00</span>
          <nuxt-link :to="{name:'docView-id', params:{id: 10}}" target="_blank">深圳市XXXXX供应商</nuxt-link>
        </div>
        <div class="intro">最新火热XXXX电视剧XXXX明星同款最新火热XXXX电视剧XXXX明星同款 最新火热XXXX电视剧XXXX明星同款</div>
        <div class="article">
          2018年春季最新 明星同款 2018年春季最新 明星同款 2018年春季最 新 明星同款 2018年春季最明星同款 2018
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
        </div>
      </div>
    </div>
    <div class="fr">
      <div id="qrcode" ref="qrcode"></div>
      <p>扫一扫 在手机预览</p>
    </div>
  </div>
</template>

<script>
let QRCode = null
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  QRCode = require('qrcodejs2')
}
export default {
  layout: 'docPage',
  components: {
    QRCode
  },
  data () {
    return {
      articleUrl: 'http://www.baidu.com'
    }
  },
  methods: {
    qrcodeScan (url) {
      // 生成二维码
      let qrcode = new QRCode('qrcode', {
        width: 145,
        // 二维码宽度
        height: 145,
        // 二维码高度
        text: url || '页面暂不存在'
      })
    }
  },
  mounted () {
    this.qrcodeScan(this.articleUrl)
  }
}
</script>

<style lang="scss" scoped>
.articleWrapper{
  width: 760px;
  position: absolute;
  top:0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  >.fl{
    width: 480px;
    margin:25px;
    background-color: #f5f5f5;
    padding: 20px;
    box-sizing: border-box;
    .articleInner{
      background-color: #fff;
      >.title{
        margin:0;
        padding: 10px;
      }
      >.infos{
        padding-left: 10px;
        margin-right: 4px;
        >.tag{
          padding: 2px 4px;
          background-color: #ff9c00;
          border-radius: 2px;
          color: #fff;
        }
        >.ctime{
          margin:0 10px;
          color: #555;
        }
      }
      >.intro{
        padding: 10px;
        margin:10px;
        background: #f5f5f5;
        color: #555;
      }
      >.article{
        padding:0 10px 10px 10px;
        color:#555;
      }
    }
  }
  >.fr{
    width: 200px;
    height: 200px;
    border: 1px solid #ddd;
    margin:20px 20px 20px 0;
    padding: 0 15px;
    box-sizing: border-box;
    #qrcode{
      width: 145px;
      height: 145px;
      margin:15px auto 10px;
    }
    >p{
      margin:0;
      padding: 0;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>

