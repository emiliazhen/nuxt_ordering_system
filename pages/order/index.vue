<template>
  <div class="container">
    <div class="main tl">
      <h2>
        XXX供应商
      </h2>
      <div>
        <h3 class="borderGrayWithoutTopBottom">素金</h3>
        <el-table
          ref="multipleTable"
          :data="orderList"
          tooltip-effect="dark"
          style="width: 100%"
          border
          >
            <el-table-column
              label="图片"
              width="120">
              <template slot-scope="scope">
                <img :src="scope.row.imageUrl" height="50">
              </template>
            </el-table-column>
            <el-table-column
              prop="cId"
              label="款号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="descript"
              label="商品描述"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="variety"
              label="种类"
              width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="category"
              label="品类"
              width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="color"
              label="成色"
              width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="goDetail" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="clearfix borderGrayWithoutTop">
        <h3 class="fl">期望交货日期</h3>
        <el-date-picker
          v-model="expectDate"
          type="date"
          placeholder="选择日期"
          size="mini">
        </el-date-picker>
      </div>
      <div class="borderGrayWithoutTop addressBox">
        <div class="clearfix paddinglr20 addressTittle">
          <h3 class="fl">收货地址</h3>
          <span class="fr">+ 新增收货地址</span>
        </div>
        <ul class="paddinglr20">
          <li v-if="addressList.length === 0" class="noAddress">暂无收货地址</li>
          <li class="clearfix" v-for="(item,i) in addressList" :key="i" v-show="addressListShowAll || item.id === activeAddressId">
            <div :class="{'fl':true,'chooseBtn':true,'choosed':item.id === activeAddressId}" @click="chooseAddress(item.id)">总部</div>
            <div class="fl">
              <span>张三</span>
              <span>广东省深圳市罗湖区</span>
              <span>万山珠宝园A座10楼</span>
              <span>13812341234</span>
              <span class="defaultAddressTag" v-if="item.defaultAddress">默认地址</span>
            </div>
            <div class="fr">
              <span v-if="!item.defaultAddress">设为默认地址</span>
              <span>修改</span>
              <span>删除</span>
            </div>
          </li>
        </ul>
        <span @click="addressListShowAll = !addressListShowAll" v-show="addressList.length > 0">
          {{addressListShowAll? '收起地址' : '更多地址'}}
          <i :class="addressListShowAll ? 'el-icon-sort-up' : 'el-icon-sort-down'"></i>
        </span>
      </div>
      <div class="borderGrayWithoutTop">
        <h3>订单留言</h3>
        <div class="paddinglr20 messageContent">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            placeholder="请将需求在订单备注中详细说明，限200字"
            maxlength="200"
            v-model="messageContent">
          </el-input>
          <p>注：多种类型货品可同时提交订货单，系统自动按货品种类拆分订单</p>
        </div>
      </div>
    </div>
    <div class="btnRow tl">
      <el-button type="primary" @click="onSubmit" round>确认提交</el-button>
      <el-button  @click="applyDialogVisible = false" round>取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      expectDate: '',
      orderList: [],
      messageContent: '',
      addressList: [
        {
          id: 2,
          defaultAddress: true
        },
        {
          id: 3,
          defaultAddress: false
        },
        {
          id: 4,
          defaultAddress: false
        }
      ],
      activeAddressId: 2,
      addressListShowAll: false
    }
  },
  methods: {
    onSubmit () {
      this.$router.push('/orderDone')
    },
    chooseAddress (id) {
      this.activeAddressId = id
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  background-color: #fff;
  margin-top:10px;
  >h2{
    background-color: #f5f5f5;
    text-align: center;
    margin:0;
    line-height: 40px;
    border: 1px solid #ddd;
  }
  >div>h3{
    margin:0;
    line-height: 40px;
    padding:0 20px;
  }
  .paddinglr20{
    padding:0 20px;
    width: 100%;
  }
  .borderGrayWithoutTop{
    border: 1px solid #ddd;
    border-top: none;
    .el-date-editor{
      line-height: 40px;
    }
  }
  .borderGrayWithoutTopBottom{
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
  .addressBox{
    .addressTittle{
      .fr{
        line-height: 40px;
        color: #007ed5;
      }
    }
    >ul{
      margin:0;
      >li{
        width: 100%;
        margin:2px 0;
        background-color: #f5f5f5;
        line-height: 28px;
        &.noAddress{
          margin-bottom: 10px;
          padding-left: 20px;
          color: #555;
        }
        >div{
          >span{
            padding: 0 10px;
            &.defaultAddressTag{
              padding: 3px 4px;
              color: #fff;
              background-color: #007ed5;
              border-radius: 2px;
            }
          }
          &.chooseBtn{
            background-color: #fff;
            line-height: 26px;
            width: 80px;
            border:1px solid #ddd;
            text-align: center;
            cursor: pointer;
            margin-right: 10px;
          }
          &.fr{
            width: 1075px;
            padding-left: 20px;
            box-sizing: border-box;
            width: 200px;
            text-align: right;
            >span{
              padding:0 10px;
              color:#007ed5;
              cursor: pointer;
            }
          }
          &.choosed{
            border: 2px solid #007ed5;
            line-height: 24px;
            position: relative;
            &::before{
              content: "\e90a";
              font-family:'icomoon';
              font-size: 25px;
              position:absolute;
              right:-7px;
              bottom: -8px;
              color: #007ed5;
            }
          }
        }
      }
    }
    >span{
      padding: 10px 20px;
      color: #007ed5;
      display: inline-block;
      .el-icon-sort-up{
        margin-left: -6px;
      }
    }
  }
  .el-textarea{
    max-width: 1160px;
  }
  .messageContent{
    >p{
      color: #ff9c00;
      margin:10px 0;
    }
  }
}
.btnRow{
  width: 1200px;
  padding:20px 0;
  margin:0 auto;
  .el-button--primary{
    width: 140px;
  }
  .el-button--default{
    width: 100px;
  }
}
</style>
