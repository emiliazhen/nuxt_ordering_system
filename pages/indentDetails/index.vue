<template>
  <div class="container">
    <div class="main tl">
      <div class="stage">
        <h3>订货单详情</h3>
        <div>
          <div><span class="tagName">订单号：</span> XXX1601010001</div>
          <div class="stepShow">
            <el-steps :active="2" align-center>
              <el-step title="下单" icon="el-icon-circle-check" description="2017-01-01 10:00:03"></el-step>
              <el-step title="审核通过" icon="el-icon-circle-check" description="2017-01-01 10:00:03"></el-step>
              <el-step title="部分出库" icon="icon-step_circle_off" description="2017-01-01 10:00:03"></el-step>
              <el-step title="完成" icon="icon-step_circle_off" description="2017-01-01 10:00:03"></el-step>
            </el-steps>
          </div>
        </div>
      </div>
      <div class="stage">
        <h3 class="title">基本信息</h3>
        <div>
          <ul class="clearfix">
            <li>
              <span class="tagName">下单时间：</span>
              111
            </li>
            <li>
              <span class="tagName">期望交货日期：</span>
              111
            </li>
            <li>
              <span class="tagName">货品类型：</span>
              111
            </li>
            <li>
              <span class="tagName">供应商：</span>
              111
            </li>
            <li>
              <span class="tagName">下单数量：</span>
              111
            </li>
            <li>
              <span class="tagName">下单重量：</span>
              111
            </li>
          </ul>
        </div>
      </div>
      <div class="stage">
        <h3 class="title">收货地址</h3>
        <div>
          <ul class="clearfix">
            <li>
              <span class="tagName">地址标识：</span>
              111
            </li>
            <li>
              <span class="tagName">收货人：</span>
              111
            </li>
            <li>
              <span class="tagName">收货人电话：</span>
              111
            </li>
            <li class="addressLi">
              <span class="tagName">收货地址：</span>
              32423432412321332342342342423421231231321232341313131225253412312312
            </li>
          </ul>
        </div>
      </div>
      <div class="stage">
        <h3 class="title">订单留言</h3>
        <div>
          aaaaaaaaa
        </div>
      </div>
      <div class="stage">
        <h3 class="title">订单列表</h3>
        <div>
          <el-table
            ref="multipleTable"
            :data="favoritelist"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange">
              <el-table-column
                label="序号"
                type="index"
                width="50">
              </el-table-column>
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
          </el-table>
        </div>
      </div>
      <div class="stage">
        <h3 class="title">已配货</h3>
        <div>
          <div class="pinkingInfo clearfix">
            <ul class="fl clearfix">
              <li>配货单：AAAA</li>
              <li>发货日期： 2016-01-01</li>
              <li>快递公司： 顺风</li>
              <li>快递单号：201901909210</li>
            </ul>
            <span class="fr">导出Excel</span>
          </div>
          <el-table
            ref="multipleTable"
            :data="favoritelist"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange">
              <el-table-column
                label="序号"
                type="index"
                width="50">
              </el-table-column>
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
          </el-table>
        </div>
      </div>
    </div>
    <div class="tl printRow">
      <el-button type="primary" round>打印</el-button>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.main{
  margin:10px auto;
  border-bottom: 1px solid #ddd;
  .stage{
    background-color: #fff;
    >h3{
      border:1px solid #ddd;
      line-height: 40px;
      margin:0;
      padding-left: 20px;
      background-color: #f5f5f5;
    }
    >div{
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      padding: 20px;
      .tagName{
        color:#777;
      }
      >ul{
        margin:0;
        li{
          float: left;
          width: 340px;
          line-height: 24px;
          &.addressLi{
            width: 100%;
          }
        }
      }
      .pinkingInfo{
        >ul{
          margin:0px;
          >li{
            float: left;
            margin-right: 10px;
            line-height: 30px;
            &:first-child{
              width: 180px;
            }
            &:nth-child(2){
              width: 150px;
            }
            &:nth-child(3){
              width: 130px;
            }
          }
        }
        >span{
          line-height: 30px;
        }
      }
    }
    .stepShow{
      margin-top:20px;
      /deep/ .el-step__icon{
        width: 16px;
        .el-icon-circle-check{
          font-size: 22px;
        }
        .icon-step_circle_off{
          font-size: 18px;
        }
      }
      /deep/ .el-step__line{
        height: 6px;
        top:9px;
        .el-step__line-inner{
          border-width: 3px!important;
        }
      }
      /deep/ .el-step__main{
        .el-step__title{
          font-size: 12px;
          line-height: 22px;
        }
        .el-step__description{
          width: 70px;
          line-height: 1.2;
          margin: 0 auto;
          padding: 0;
        }
      }
    }
  }
}
.printRow{
  width: 1200px;
  margin:10px auto;
  >.el-button--primary {
    padding:12px 50px;
  }
}
</style>
