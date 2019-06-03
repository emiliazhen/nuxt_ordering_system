<template>
  <div class="container">
    <div class="main">
      <div class="cateChoose">
        <ul>
          <li>
            <span class="rowName">种类</span>
            <el-radio-group v-model="typeForm.largeType" size="small" style="margin-left: 10px">
              <el-radio-button label="0" :class="{'defaultBtn':typeForm.largeType === '0'}">不限</el-radio-button>
              <el-radio-button label="1">项链</el-radio-button>
              <el-radio-button label="2">手镯</el-radio-button>
              <el-radio-button label="3">耳环</el-radio-button>
              <el-radio-button label="4">脚链</el-radio-button>
            </el-radio-group>
          </li>
          <li>
            <span class="rowName">品类</span>
            <el-radio-group v-model="typeForm.categoryType" size="small" style="margin-left: 10px">
              <el-radio-button label="0" :class="{'defaultBtn':typeForm.categoryType === '0'}">不限</el-radio-button>
              <el-radio-button label="1">项链</el-radio-button>
              <el-radio-button label="2">手镯</el-radio-button>
              <el-radio-button label="3">耳环</el-radio-button>
              <el-radio-button label="4">脚链</el-radio-button>
            </el-radio-group>
          </li>
          <li>
            <span class="rowName">成色</span>
            <el-radio-group v-model="typeForm.goldType" size="small" style="margin-left: 10px">
              <el-radio-button label="0" :class="{'defaultBtn':typeForm.goldType === '0'}">不限</el-radio-button>
              <el-radio-button label="1">项链</el-radio-button>
              <el-radio-button label="2">手镯</el-radio-button>
              <el-radio-button label="3">耳环</el-radio-button>
              <el-radio-button label="4">脚链</el-radio-button>
            </el-radio-group>
          </li>
          <li>
            <span class="rowName">供应商</span>
            <el-radio-group v-model="supplierType" size="small" style="margin-left: 10px">
              <el-radio-button :label="0" :class="{'defaultBtn':supplierType === 0}">不限</el-radio-button>
              <el-radio-button :label="item.providerId" v-for="(item, i) in supplierTypeInfo" :key="i">{{item.providerName}}</el-radio-button>
            </el-radio-group>
          </li>
        </ul>
      </div>
      <div class="searchBar">
        <div class="fl">
          <span>综合</span><span>销量</span><span>新品</span>
        </div>
        <div class="fr">
          <el-input
            placeholder="在结果中搜索：商品名称/款号/关键字"
            suffix-icon="el-icon-search"
            size="small"
            v-model="queryContent">
          </el-input>
        </div>
      </div>
      <div class="goodsState">
        <el-row :gutter="10">
            <el-col v-for="(item, i) in goodsList" :key="i">
              <el-card shadow="hover" class="tl" :body-style="{ padding: '0px' }">
                <img :src="item.imagesUrl" alt="" @click="seeDetail(item.patternId)">
                <div class="desc">
                  <h5>{{item.title || '-'}}</h5>
                  <p>{{item.description}}</p>
                </div>
                <div class="addCartBtn">
                  <el-button icon="icon-shopping-cart" type="warning" round>加入购物车</el-button>
                </div>
                <div :class="{'favorite': true, 'isFavortie': item.favoriteType === 0}" @click="changeFavorite(item.providerId, item.favoriteType)">
                  <span :class="item.favoriteType === 0 ? 'icon-love-on' : 'icon-love-off'"></span>
                </div>
              </el-card>
            </el-col>
        </el-row>
      </div>
      <div class="bottomPagination" v-if="goodsTotal > 0">
        <pagination :pg="goodsPageActive" :total="goodsTotal" :size="goodsPageSize" @PageIndexChange="pageIndexChange" @PageSizeChange="pageSizeChange"></pagination>
      </div>
    </div>
    <el-dialog :title="tempForm.patternName" :visible.sync="goodsDialogShow" width="840px">
      <div class="yScroll">
        <div class="clearfix">
          <div class="fl">
            <div class="bigImgShow">
              <img :src="activeImgURL" alt="">
            </div>
            <div class="smallImgListsShow">
              <div class="imgShowWrapper">
                <ul class="clearfix" ref="imgSwiperWrap">
                  <li v-for="(item,i) in tempForm.imagesUrls" :key="i" @click="activeImgIndex = i" :class="{'activeLi':i === activeImgIndex}">
                    <img :src="item" alt="">
                  </li>
                </ul>
              </div>
              <span class="pevBtn" @click="goImgPev"><i class="el-icon-arrow-left"></i></span>
              <span class="nextBtn" @click="goImgNext"><i class="el-icon-arrow-right"></i></span>
            </div>
          </div>
          <div class="fr tl">
            <h4>{{tempForm.title}}</h4>
            <p>
              <span>{{tempForm.description}}</span>
            </p>
            <div class="clearfix intro">
              <nuxt-link :to="{name:'docView-id', params:{id: 5}}" target="_blank">
                xxxx供应商
              </nuxt-link>
              <span class="fr">2018-1-1创建</span>
            </div>
            <ul>
              <li>
                <div class="tr">款号：</div>
                <div>{{tempForm.patternCode}}</div>
              </li>
              <li>
                <div class="tr">参考克重：</div>
                <div>10-11g</div>
              </li>
              <li>
                <div class="tr">成色：</div>
                <div>
                  111
                </div>
              </li>
              <li>
                <div class="tr">字印：</div>
                <div>
                  <el-input v-model="tempForm.innerWord" placeholder="限20字" size="mini"></el-input>
                </div>
              </li>
              <li>
                <div class="tr">克重范围：</div>
                <div class="weightRange">
                  <el-input v-model="tempForm.minWeight" size="mini"></el-input>
                  ~
                  <el-input v-model="tempForm.maxWeight" size="mini"></el-input>
                  平均克重：15g
                </div>
              </li>
              <li>
                <div class="tr">数量：</div>
                <div>
                  <el-input-number size="mini" v-model="tempForm.num" :min="1" :max="10"></el-input-number>
                </div>
              </li>
              <li>
                <div class="tr">规格描述：</div>
                <div>
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="tempForm.desc">
                  </el-input>
                </div>
              </li>
            </ul>
            <div class="btnRow">
                <el-button type="primary" round>加入购物车</el-button>
                <el-button round><i class="icon-love-off"></i> 收藏</el-button>
            </div>
          </div>
        </div>
        <div class="cutLine">
        </div>
        <div class="tl">
          {{detail}}
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GETPROVIDERLIST, GETPATTERNBASICLIST, DELETEFAVORITE } from '~/api'
import pagination from '~/components/pagination'
export default {
  data () {
    return {
      typeForm: {
        largeType: 1,
        categoryType: 1,
        goldType: 1
      },
      supplierType: 0,
      supplierTypeInfo: [],
      goodsList: [],
      goodsPageSize: 20,
      goodsPageActive: 1,
      goodsTotal: 0,
      queryContent: '',
      goodsDialogShow: false,
      tempForm: {
        innerWord: '',
        minWeight: 1,
        maxWeight: 2,
        num: 1,
        desc: '',
        detail: '',
        imgList: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535611199662&di=100bdcd2b3408014faa4a1abe97dc4cc&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0110725542667e0000019ae98c6d2c.jpg%40900w_1l_2o_100sh.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4040247470,369653166&fm=26&gp=0.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535611222858&di=0b8d1bdc94dd6912bba8af6daaf03048&imgtype=0&src=http%3A%2F%2Fwww.ilovezuan.com%2Fimages%2Fupload%2FImage%2F8%2528230%2529.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535611233243&di=15db9063299e799c69ab5793d3136a25&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c41f57a038fa0000018c1b283bc1.jpg%40900w_1l_2o_100sh.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1535617659562&di=3de5b0fe39c9c53fb7d750b333609d24&imgtype=0&src=http%3A%2F%2Fimg11.360buyimg.com%2Fn0%2Fjfs%2Ft724%2F54%2F642328093%2F111531%2F72c1354b%2F54c8c7f5N02c72bf3.jpg'
        ]
      },
      detail: 'AAA',
      activeImgURL: '',
      activeImgIndex: 0
    }
  },
  async asyncData (ctx) {
    let allData = await Promise.all([GETPROVIDERLIST(), GETPATTERNBASICLIST({
      largeType: 0,
      categoryType: 0,
      goldType: 0,
      search: '',
      providerId: 0,
      pageIndex: 1,
      pageSize: 20
    })])
    return {
      supplierTypeInfo: allData[0].Data,
      goodsList: allData[1].Data.list,
      goodsTotal: allData[1].Data.total
    }
  },
  methods: {
    async updateGoodsData (){
      let data = await GETPATTERNBASICLIST(Object.assign(this.typeForm,{
        'search': this.queryContent,
        'supplierType': this.providerId,
        'pageIndex': this.goodsPageActive,
        'pageSize': this.goodsPageSize
      }))
      this.goodsList = data.Data
    },
    // 分页操作
    pageIndexChange (val) {
      this.goodsPageActive = val
      this.updateGoodsData()
    },
    pageSizeChange (val) {
      this.parameters.limit = val
      this.parameters.page = 1
      this.updateGoodsData()
    },
    // 收藏/取消收藏
    async changeFavorite (id,state) {
      let data = await DELETEFAVORITE(id)

    },
    // 点击图片显示详情
    seeDetail (id) {
      this.goodsDialogShow = true
      this.tempForm = this.goodsList.filter((v => v.patternId === id))[0]
    },
    // 详情轮播图
    moveMySwiper (index) {
      this.$refs.imgSwiperWrap.style.transform = 'translateX(-' + (100 * (index - 1)) + 'px)'
    },
    goImgPev () {
      if(this.activeImgIndex < 1){
        return
      }
      this.activeImgIndex--
    },
    goImgNext () {
      if(this.activeImgIndex === this.tempForm.imgList.length - 1){
        return
      }
      this.activeImgIndex++
    }
  },
  watch: {
    activeImgIndex: function (nV, oV) {
      this.activeImgURL = this.tempForm.imgList[nV]
      if(nV < 1 || nV === this.tempForm.imgList.length - 1){
        return
      }
      this.moveMySwiper(nV)
    }
  },
  components: {
    pagination
  }
}
</script>

<style lang="scss" scoped>
.container{
  .cateChoose{
    margin-top:10px;
    text-align: left;
    border: 1px solid #eee;
    background-color: #fff;
    padding: 15px 20px 20px 20px;
    ul{
      margin: 0;
      li{
        margin-bottom: 8px;
        &:last-child{
          margin-bottom: 0;
        }
        position: relative;
        .rowName{
          position: absolute;
          top:4px;
          left: 0;
          text-align-last: justify;
          width: 50px;
          height: 30px;
          font-weight: 700;
          font-size: 14px;
        }
        .el-radio-group{
          width: 100%;
          padding-left: 55px;
        }
        /deep/ .el-radio-button--small .el-radio-button__inner{
          border: none;
          border-radius: 0;
        }
        .defaultBtn /deep/ .el-radio-button__inner{
          background-color: #ececec;
          color:#555;
        }
      }
    }
  }
  .searchBar{
    overflow: hidden;
    padding: 10px 0;
    .fl{
      width: 220px;
      span{
        float: left;
        width: 60px;
        line-height: 28px;
        background-color: #fff;
        border: 1px solid #eee;
      }
    }
    .fr{
      width: 400px
    }
  }
  .goodsState{
    .el-col{
      width: 20%;
      margin-bottom: 10px;
      .el-card{
        position: relative;
        .favorite{
          display: none;
          width: 30px;
          height: 30px;
          border-radius: 2px;
          background-color: #fff;
          position: absolute;
          top:6px;
          right: 6px;
          >span{
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
            font-size: 22px;
            &.icon-love-on{
              color: #d50f10;
            }
          }
        }
        .isFavortie{
          display: block;
        }
        &:hover{
          background-color: #ececec;
          .desc{
            display: none;
          }
          .addCartBtn,
          .favorite{
            display: block;
          }
        }
      }
      img{
        cursor: pointer;
        width: 230px;
        height: 230px;
      }
      .desc{
        padding: 5px 10px;
        width: 100%;
        height: 100px;
        box-sizing: border-box;
        h5{
          margin:0;
          padding:0;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        p{
          margin:0;
          padding-top: 5px;
          display:-webkit-box;
          overflow:hidden;
          white-space:normal!important;
          text-overflow:ellipsis;
          word-wrap:break-word;
          -webkit-line-clamp:4;
          -webkit-box-orient:vertical;
        }
      }
      .addCartBtn{
        display: none;
        width: 100%;
        height: 100px;
        position: relative;
        .el-button{
          width: 170px;
          background-color: #ffa200;
          position: absolute;
          top:50%;
          left: 50%;
          transform: translate(-50%,-50%)
        }
      }
    }
  }
  .bottomPagination{
    background-color: #fff;
    border: 1px solid #eee;
    padding: 3px 5px;
  }
}
.el-dialog__body{
  .yScroll{
    width: 100%;
    height: 540px;
    overflow-y: auto;
    >div{
      padding:0 10px;
    }
    >.clearfix{
      >.fl{
        width: 360px;
        >.bigImgShow{
          width: 360px;
          height: 360px;
          >img{
            width: 100%;
            height: 100%;
          }
        }
        >.smallImgListsShow{
          width: 100%;
          height: 90px;
          margin-top:10px;
          position: relative;
          .imgShowWrapper{
            margin:0 auto;
            width: 290px;
            height: 90px;
            overflow: hidden;
            >ul{
              margin:0;
              width: 490px;
              transition: all .5s;
              >li{
                float: left;
                width: 90px;
                height: 90px;
                box-sizing: border-box;
                margin-right: 10px;
                &:last-child{
                  margin-right: 0;
                }
                &.activeLi{
                  border: 4px solid #007ed5;
                  >img{
                    width: 82px;
                    height: 82px;
                  }
                }
              }
            }
            img{
              width: 90px;
              height: 90px;
            }
          }
          >span{
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            &.pevBtn{
              left: 0;
            }
            &.nextBtn{
              right: 0;
            }
            >i{
              font-size: 30px
            }
          }
        }
      }
      >.fr{
        width: 390px;
        >h4{
          margin:0;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        >p{
          background-color: #f3f3f3;
          margin:8px 0 0 0;
          padding:5px 10px;
          >span{
            display:-webkit-box;
            overflow:hidden;
            white-space:normal!important;
            text-overflow:ellipsis;
            word-wrap:break-word;
            -webkit-line-clamp:3;
            -webkit-box-orient:vertical;
            font-size: 12px;
            line-height: 16px;
          }
        }
        >.intro{
          background-color: #eee;
          font-size: 12px;
          box-sizing: border-box;
          padding: 4px 10px;
        }
        >ul{
          margin:10px 0;
          >li{
            width: 100%;
            min-height: 28px;
            position: relative;
            padding: 5px 0 5px 75px;
            >.tr{
              width: 70px;
              position:absolute;
              top:4px;
              left: 0;
            }
            .weightRange{
              >div{
                text-align: center;
                display: inline-block;
                width: 80px;
              }
            }
          }
        }
        >.btnRow{
          >.el-button--primary{
            width: 140px;
          }
          >.el-button--default{
            width: 100px;
          }
        }
      }
    }
    >.cutLine{
      height: 4px;
      background-color: #eee;
      margin:15px 10px;
    }
  }
}
</style>

