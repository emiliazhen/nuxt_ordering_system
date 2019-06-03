<template>
  <div class="container">
    <div class="bannerImg">
    </div>
    <div class="swipperBgc">
      <div class="main">
        <div class="swipperTitle tl">
          <img src="../assets/images/medal.png" alt="">
          <h2>
            优质供应商
          </h2>
          <p>为金店挑选最好的供应商渠道</p>
        </div>
        <div class="swipper">
          <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, i) in swiperShowInfo" :key="i">
                <nuxt-link :to="{name:'supplier-id', params:{id: item.providerId}}"><img :data-src="item.imageUrl" class="swiper-lazy"></nuxt-link>
              </div>
            </div>
            <!-- <div class="swiper-pagination swiper-pagination-bullets"></div> -->
          </div>
        </div>
        <div class="el-icon-arrow-left" slot="button-prev"></div>
        <div class="el-icon-arrow-right" slot="button-next"></div>
      </div>
    </div>
    <div class="main">
      <!-- 珠宝圈 -->
      <div class="jwTitle">
        <h2>
          珠宝圈
        </h2>
        <p>
          <span></span>
          为您精选诚信可靠的供应商
          <span></span>
        </p>
      </div>
      <div  class="productShow">
        <el-row :gutter="10">
          <el-col :span="6" v-for="(o, i) in productList" :key="i">
            <el-card :body-style="{ padding: '0px' }">
              <nuxt-link :to="{name:'docView-id', params:{id: 5}}" target="_blank">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536124386638&di=ace175db7100fc1804683f3908b01138&imgtype=0&src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-35e0722b168ee5f34f5fd7a3c6b0b428_b.jpg" class="image">
                <div class="cardText">
                  <h3 class="title tl">
                    AAAAAAAAAAAAAAAA
                  </h3>
                  <P class="desc tl">图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍图文介绍</P>
                </div>
                <div class="tag">
                  新款发布
                </div>
              </nuxt-link>
              <div class="tagBottom clearfix">
                <nuxt-link :to="{name:'docView-id', params:{id: 5}}" class="fl">xxx公司</nuxt-link>
                <time class="fr">{{ time | filterDateFormatter('MM-dd hh:mm:ss') }}</time>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="endState">
      <div v-show="isListLoading" class="loadMore">
        <p>正在拼命加载</p>
        <i class="el-icon-loading"></i>
      </div>
      <div v-if="isListAll">- 已加载全部内容 -</div>
    </div>
    <!-- @END 珠宝圈 -->
  </div>
</template>

<script>
import { GETGRADEPROVIDERLIST } from '~/api'
export default {
  data (){
    return {
      time: new Date(),
      swiperShowInfo: [],
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 20,
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
          stopOnLastSlide: false
        },
        speed: 1000,
        // freeMode: true,
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true,
        // },
        navigation: {
          nextEl: '.el-icon-arrow-right',
          prevEl: '.el-icon-arrow-left'
        },
        loop: true,
        loopedSlides: 6,
        lazy: {
          loadPrevNext: true
        },
        // some swiper options...
        on: {
          slideChange () {
            // console.log('onSlideChangeEnd', this);
            // if(this.isEnd){
            //   this.navigation.$nextEl.css('display','none');
            // }else{
            //   this.navigation.$nextEl.css('display','block');  
            // }
            // if(this.isBeginning){
            //   this.navigation.$prevEl.css('display','none');
            // }else{
            //   this.navigation.$prevEl.css('display','block');  
            // }
          },
          tap () {
            // console.log('onTap', this);
          }
        }
      },
      productList: [1,2,3,4,5,6,7,8],
      isListLoading: false,
      isListAll: false
    }
  },
  async asyncData () {
    let data = await GETGRADEPROVIDERLIST()
    return {
      swiperShowInfo: data.Data
    }
  },
  mounted () {
    // this.mySwiper.slideTo(3, 1000, false)
    this.scroll()
    if(this.mySwiper.slides.length<=3){
      this.mySwiper.destroy()
    }
  },
  methods: {
    scroll () {
      window.onscroll = () => {
        // 获取窗口可视范围的高度
        var clientHeight = 0
        if(document.body.clientHeight && document.documentElement.clientHeight){
          clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
        }else{
          clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight
        }
        // 获取窗口滚动条高度
        var scrollTop = 0
        if(document.documentElement&&document.documentElement.scrollTop){
          scrollTop=document.documentElement.scrollTop
        }else if(document.body){
          scrollTop=document.body.scrollTop
        }
        // 获取文档内容实际高度
        let scrollHeight = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)
        // 距离底部100px时加载一次
        let bottomOfWindow = scrollHeight - clientHeight - scrollTop <= 20
        if (bottomOfWindow && this.isListLoading === false) {
          this.isListLoading = true
          setTimeout(() => {
            console.log(333)
            this.productList.push(1,2,3,4)
            this.isListLoading = false
          },1500)
        }
      }
    }
  },
  transition: 'indexAnimate'
}
</script>

<style lang="scss" scoped>
.indexAnimate-enter-active, .indexAnimate-leave-active {
  transition: all 1s;
}
.indexAnimate-enter, .indexAnimate-leave{
  opacity: 0.6;
}
.bannerImg{
  width: 100%;
  height: 240px;
  background: #1c4777 url('~assets/images/bannerImg.png') center center no-repeat;
}
.indexTitle{
  font-size: 16px;
  font-weight: 400;
}
.swipperBgc{
  background-color: #fff;
  padding: 20px 0;
  .main{
    position: relative;
    .swipperTitle{
      position: absolute;
      top:0;
      left: 50px;
      width: 150px;
      height: 100%;
      >img{
        position: absolute;
        top:0;
        left: 0;
        width: 22px;
        height: 26px;
      }
      >h2{
        margin:0;
        color: #ff9c00;
        font-size: 24px;
        text-indent: 1em;
        line-height: 1;
      }
      >p{
        font-size: 14px;
        color:#555;
        margin: 0;
        padding-top:10px;
      }
    }
    .el-icon-arrow-left,
    .el-icon-arrow-right{
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      font-size: 36px;
    }
    .el-icon-arrow-left{
      left: 0;
    }
    .el-icon-arrow-right{
      right: 0;
    }
  }
}
.swipper{
  width: 100%;
  padding: 0 50px 0 210px;
  .swiper-container{
    background-color: #fff;
    height: 80px;
    .swiper-slide{
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
.jwTitle{
  >h2{
    font-size: 36px;
    font-weight: 400;
    margin:0;
    padding: 10px 0;
  }
  >p{
    font-size: 14px;
    margin:0;
    color: #555;
    padding-bottom: 10px;
    >span{
      display:inline-block;
      width: 16px;
      height: 1px;
      background-color: #555;
      vertical-align: middle;
    }
  }
}
.productShow{
  .el-col{
    margin-bottom: 20px;
    .el-card{
      position: relative;
      .cardText{
        padding:0 10px;
      }
      img{
        width: 100%;
        height: 290px;
      }
      .title{
        margin: 0;
        padding-top: 10px;
        display:-webkit-box;
        overflow:hidden;
        white-space:normal!important;
        text-overflow:ellipsis;
        word-wrap:break-word;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
      }
      .desc{
        margin:10px 0;
        color:#555;
        display:-webkit-box;
        overflow:hidden;
        white-space:normal!important;
        text-overflow:ellipsis;
        word-wrap:break-word;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical;
      }
      .tagBottom{
        padding: 10px;
        .fl{
          font-weight: 700;
        }
        .fr{
          color: #aaa;
        }
      }
      .tag{
        position: absolute;
        top:10px;
        right: 10px;
        color: #f5f5f5;
        background-color: rgba(0,0,0,.7);
        border: 2px solid rgba(255,255,255,.4);
        width: 75px;
        line-height: 24px;
        border-radius: 14px;
      }
    }
  }
}
.endState{
  padding-bottom: 30px;
  .loadMore{
    p{
      font-size: 20px;
      margin:10px;
    }
    i{
      font-size: 36px;
    }
  }
}
</style>

