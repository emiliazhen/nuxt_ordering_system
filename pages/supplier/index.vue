<template>
  <div>
    <div class="bannerImg tc" >
    </div>
    <div class="container">
      <div class="serchWrapper">
        搜索供应商：
        <el-input v-model="queryForm.keyValues" placeholder="供应商名称/简称/关键字" clearable @change="searchByQuery"></el-input>
        <el-button type="primary" icon="icon-seach-b" @click="searchByQuery">搜索</el-button>
      </div>
      <div class="main">
        <div v-if="supplierList.length === 0 && !isListLoading">暂无数据</div>
        <el-row :gutter="20" class="supplierShow" v-else>
          <el-col :span="12" v-for="(item, i) in supplierList" :key="i" class="itemRow">
            <el-card :body-style="{ padding: '10px' }" class="tl" shadow="hover">
              <nuxt-link :to="{name:'supplier-id', params:{id: item.providerId}}" target="_blank">
                <h4 class="supplierName">{{item.providerName}}</h4>
                <p class="compnyInfo">
                  <span><i class="el-icon-location"></i>{{item.cityName}}</span>
                  <span><i class="icon-phone-round"></i>{{item.phone}}</span>
                </p>
                <p class="tagRow">
                  <span v-for="(v,i) in item.serviceNote.split(',')" :key="i">{{v}}</span>
                </p>
                <div class="imgText">
                  <div class="fl">
                    <img :src="item.imageUrl" class="image">
                  </div>
                  <div class="fr">{{item.description}}</div>
                </div>
              </nuxt-link>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="endState">
        <div v-show="isListLoading" class="loadMore">
          <p>正在拼命加载</p>
          <i class="el-icon-loading"></i>
        </div>
        <div v-if="isListAll">- 没有更多信息 -</div>
      </div>
    </div>
  </div>
</template>

<script>
import { GETPROVIDERLIST } from '~/api'
export default {
  data () {
    return {
      queryForm: {
        keyValues: '',
        pageSize: 6,
        pageIndex: 1
      },
      supplierList: [],
      isListLoading: false,
      isListAll: false
    }
  },
  async asyncData (context) {
    let data = await GETPROVIDERLIST({
      keyValues: '',
      pageSize: 6,
      pageIndex: 1
    })
    return {
      isListAll: data.Data.length < 6,
      supplierList: data.Data
    }
  },
  mounted () {
    this.scroll()
  },
  methods: {
    // 加载更多数据
    async getMoreList (ctx) {
      this.queryForm.pageIndex++
      let data = await GETPROVIDERLIST(this.queryForm)
      this.isListLoading = false
      if(!data.Data || data.Data.length < this.queryForm.pageSize){
        this.isListAll = true
      }
      this.supplierList = [...this.supplierList,...data.Data]
    },
    // 按条件搜索
    async searchByQuery () {
      this.isListAll = false
      this.isListLoading = true
      this.queryForm.pageIndex = 1
      this.supplierList = []
      let data = await GETPROVIDERLIST(this.queryForm)
      this.isListLoading = false
      if (!data.Data || data.Data.length < this.queryForm.pageSize) {
        this.isListAll = true
        return
      }
      this.supplierList = data.Data
    },
    // 滑动到底部加载
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
          scrollTop = document.documentElement.scrollTop
        }else if(document.body){
          scrollTop = document.body.scrollTop
        }
        // 获取文档内容实际高度
        let scrollHeight = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)
        // 距离底部100px时加载一次
        let bottomOfWindow = scrollHeight - clientHeight - scrollTop <= 100
        if (bottomOfWindow && !this.isListLoading && !this.isListAll) {
          this.isListLoading = true
          this.getMoreList()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bannerImg{
  width: 100%;
  height: 240px;
  background:#1c4777 url('~assets/images/bannerImg.png') center center no-repeat;
}
.container{
  .serchWrapper{
    padding:0;
    margin:10px 0;
    height: 40px;
    .el-input{
      margin:0 10px;
      /deep/ .el-input__inner{
        border-radius: 2px;
      }
    }
    .el-button{
      border-radius: 2px;
      font-size: 16px;
      line-height: 38px;
      padding: 0 10px;
      /deep/ .icon-seach-b{
        margin-right: 4px;
      }
    }
  }
  .main{
    .supplierShow{
      a{
        color: #333;
      }
      >.el-col{
        margin-bottom: 10px;
        .supplierName{
          font-size: 16px;
          margin:0;
        }
        .compnyInfo{
          margin:0;
          padding: 10px 0;
          >span{
            >i{
              color: #acc6d7;
              margin-right: 6px;
              font-size: 14px;
            }
            margin-right: 10px;
            line-height: 1;
          }
        }
        .tagRow{
          margin: 0;
          padding-bottom: 10px;
          >span{
            padding: 2px 8px;
            border-radius: 2px;
            margin-right: 5px;
            color: #f5f5f5;
            background-color: #ff9c00;
          }
        }
        .imgText{
          height: 135px;
          .fl{
            img{
              width: 130px;
              height: 130px;
            }
          }
          .fr{
            width: 420px;
            font-size: 14px;
            line-height: 24px;
            display:-webkit-box;
            overflow:hidden;
            white-space:normal!important;
            text-overflow:ellipsis;
            word-wrap:break-word;
            -webkit-line-clamp:5;
            -webkit-box-orient:vertical
          }
        }
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
