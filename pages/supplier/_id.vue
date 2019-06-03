<template>
  <div class="container">
    <div class="main">
      <div class="supplierBar clearfix">
        <div class="fl logoImg">
          <img :src="info.imageUrl" alt="">
        </div>
        <div class="fl tl">
          <h2>{{info.providerName}}</h2>
          <span><i class="el-icon-location"></i>{{info.cityName}}</span>
          <span><i class="icon-phone-round"></i>{{info.phone}}</span>
        </div>
      </div>
      <div>
        <el-tabs v-model="activeTag" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="1">
            <div class="tl tag1 p10 clearfix">
              <div class="fl">
                <ul>
                  <li>
                    <span>公司名称</span>
                    <span>{{info.cityName || '-' || '-'}}</span>
                  </li>
                  <li>
                    <span>公司简介</span>
                    <span>{{info.description || '-'}}</span>
                  </li>
                  <li>
                    <span>公司地址</span>
                    <span>{{info.provinceName + ' ' + info.cityName + ' ' + info.townName || '-'}}</span>
                  </li>
                  <li>
                    <span>公司电话</span>
                    <span>{{info.phone || '-'}}</span>
                  </li>
                  <li>
                    <span>联系人</span>
                    <span>{{info.contact || '-'}}</span>
                  </li>
                  <li>
                    <span>联系人手机</span>
                    <span>{{info.mobile || '-'}}</span>
                  </li>
                  <li>
                    <span>QQ</span>
                    <span>{{info.qq || '-'}}</span>
                  </li>
                  <li>
                    <span>微信</span>
                    <span>{{info.weChat || '-'}}</span>
                  </li>
                  <li>
                    <span>邮箱</span>
                    <span>{{info.mail || '-'}}</span>
                  </li>
                  <li>
                    <span>银行账号</span>
                    <span>{{info.accountCode || '-'}}</span>
                  </li>
                  <li>
                    <span>开户行</span>
                    <span>{{info.bankName || '-'}}</span>
                  </li>
                  <li>
                    <span>开户人</span>
                    <span>{{info.surname || '-'}}</span>
                  </li>
                  <li>
                    <span>主营产品或服务</span>
                    <span>{{info.serviceNote || '-'}}</span>
                  </li>
                  <li>
                    <span>主营行业</span>
                    <span>{{info.majorNote || '-'}}</span>
                  </li>
                  <li>
                    <span>经营模式</span>
                    <span>{{info.businessNote || '-'}}</span>
                  </li>
                  <li>
                    <span>是否提供加工/定制服务</span>
                    <span>{{info.state || '-'}}</span>
                  </li>
                  <li>
                    <span>注册资本</span>
                    <span>{{info.registeredNote || '-'}}</span>
                  </li>
                  <li>
                    <span>公司成立时间</span>
                    <span>{{info.estaNote || '-'}}</span>
                  </li>
                  <li>
                    <span>公司注册地</span>
                    <span>{{info.regisNote || '-'}}</span>
                  </li>
                  <li>
                    <span>企业类型</span>
                    <span>{{info.enterpNote || '-'}}</span>
                  </li>
                  <li>
                    <span>法定代表人</span>
                    <span>{{info.legalNote || '-'}}</span>
                  </li>
                  <li>
                    <span>工商注册号/统一社会信用代码</span>
                    <span>{{info.regisnoNote || '-'}}</span>
                  </li>
                  <li>
                    <span>产品质量认证</span>
                    <span>{{info.pQCNote || '-'}}</span>
                  </li>
                  <li>
                    <span>厂房面积</span>
                    <span>{{info.areaNote || '-'}}</span>
                  </li>
                  <li>
                    <span>员工人数</span>
                    <span>{{info.employeeAmt || '-'}}</span>
                  </li>
                </ul>
              </div>
              <div class="fr">
                <div class="rImg">
                  <img :src="info.imageUrl || '~/assets/images/pic_not_found.png'" alt="">
                </div>
                <div class="tokenShow">
                  <h4>供应商开放权限</h4>
                  <ul>
                    <li>款式查看：平台所有商家</li>
                    <li>款式下单：仅限授权客户</li>
                    <li>新款发布：授权客户/平台所有商家</li>
                    <li>热销推荐：平台所有商家</li>
                  </ul>
                </div>
                <div class="apply">
                  <h3>
                    <img src="~/assets/images/kingH.png" alt="">
                    申请为授权客户
                  </h3>
                  <div>
                    <h4>授权客户专属权益：</h4>
                    <p>1、接收供应商发送的专属信息（新款发布、热销推荐等）</p>
                    <p>2、查询供应商的发布款式</p>
                    <p>3、款式下单、提交订货</p>
                    <el-button type="primary" round @click="applyDialogVisible=true">立即申请</el-button>
                    <!-- <el-button icon="el-icon-time" round disabled>已申请（供应商审核中）</el-button> -->
                    <!-- <el-button type="warning" icon="el-icon-success" round disabled>已通过授权</el-button> -->
                    <!-- <el-button type="danger" icon="el-icon-error" round disabled>未通过授权</el-button> -->
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="公司简介" name="2">
            <div class="tl tag2 p10">
              {{info.description || '暂无'}}
            </div>
          </el-tab-pane>
          <el-tab-pane label="资质荣誉" name="3">
            <div class="tl tag3 p10">
              <el-row :gutter="10">
                <el-col :span="6" v-for="(v,i) in info.honorNote.split(',')" :key="i">
                  <img :src="v || '~/assets/images/pic_not_found.png'" alt="">
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="款式动态" name="4">
            <div class="tl tag4 p10">
              ..首页展示商品模块
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 提交申请弹出框 -->
    <el-dialog title="申请为授权客户" :visible.sync="applyDialogVisible" width="700px">
      <el-form ref="applyForm" :model="applyForm" label-width="100px">
        <div class="singleCol">
          <el-form-item label="客户名称：">
            <el-input v-model="applyForm.name"></el-input>
          </el-form-item>
        </div>
        <div class="doubleCol clearfix">
          <el-form-item label="客户类型：">
            <el-select v-model="applyForm.region" placeholder="请选择类型">
              <el-option label="门店" value="1"></el-option>
              <el-option label="其他" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在地区：">
            <el-cascader
              placeholder="选择地址"
              :options="addressObj"
              filterable
            ></el-cascader>
          </el-form-item>
        </div>
        <div class="singleCol">
          <el-form-item label="详细地址：">
            <el-input v-model="applyForm.name"></el-input>
          </el-form-item>
        </div>
        <div class="doubleCol clearfix">
          <el-form-item label="电话：">
            <el-input v-model="applyForm.name"></el-input>
          </el-form-item>
          <el-form-item label="银行账号：">
            <el-input v-model="applyForm.name"></el-input>
          </el-form-item>
        </div>
        <div class="doubleCol clearfix">
          <el-form-item label="开户行：">
            <el-input v-model="applyForm.name"></el-input>
          </el-form-item>
          <el-form-item label="开户人：">
            <el-input v-model="applyForm.name"></el-input>
          </el-form-item>
        </div>
        <div class="doubleCol clearfix">
          <el-form-item label="联系人姓名：">
            <el-input v-model="applyForm.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机：">
            <el-input v-model="applyForm.name"></el-input>
          </el-form-item>
        </div>
        <div class="doubleCol clearfix">
          <el-form-item label="联系人邮箱：">
            <el-input v-model="applyForm.name"></el-input>
          </el-form-item>
          <el-form-item label="联系人QQ：">
            <el-input v-model="applyForm.name"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="applyForm.desc" placeholder="100字以内" maxlength="100" :autosize="{ minRows: 3, maxRows: 6 }"></el-input>
        </el-form-item>
        <div class="dialogBtn">
          <el-form-item>
            <el-button type="primary" @click="onSubmit" round>提交申请</el-button>
            <el-button  @click="applyDialogVisible = false" round>取消</el-button>
          </el-form-item>
        </div>
        </el-form>
    </el-dialog>
    <!-- @END 提交申请弹出框 -->
  </div>
</template>

<script>
import { GETPROVIDERBYID } from '~/api'
export default {
  data () {
    return {
      activeTag: '1',
      info: [],
      applyDialogVisible: false,
      applyForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      addressObj: [{
        value: '01',
        label: '广东',
        children: [
          {
            value: '0101',
            label: '深圳',
            children: [
              {
                value: '010101',
                label: '罗湖区'
              }
            ]
          }
        ]
      }]
    }
  },
  async asyncData (ctx) {
    let data = await GETPROVIDERBYID(ctx.params.id)
    return {
      info: data.Data
    }
  },
  methods: {
    handleClick () {
      console.log(1)
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  margin: 10px auto;
  border: 1px solid #ddd;
  background-color: #fff;
  border-bottom: none;
  .supplierBar{
    padding: 10px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    >.logoImg{
      width: 80px;
      height: 80px;
      background-color: #ddd;
      img{
        width: 100%;
        height: 100%;
      }
    }
    >.tl{
      h2{
        margin:0;
        padding:6px 0 10px;
      }
      padding-left: 20px;
      >span{
        margin-right: 10px;
        font-size: 14px;
        >i{
          margin-right: 4px;
          color: #acc6d7;
          font-size: 14px;
        }
      }
    }
  }
  .tag1{
    >.fl{
      >ul{
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        >li{
          >span{
            display: inline-block;
            line-height: 30px;
            border-top: 1px solid #ddd;
            border-right: 1px solid #ddd;
            &:first-child{
              width: 240px;
              text-align: center;
              background-color: #f5f5f5;
            }
            &:last-child{
              box-sizing: border-box;
              padding-left: 20px;
              width: 500px;
            }
          }
        }
      }
    }
    >.fr{
      .rImg{
        width: 400px;
        height: 400px;
        background-color: #f5f5f5;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .tokenShow{
        margin:10px 0;
        >h4{
          margin:0;
          padding: 10px 30px;
          color: #fff;
          background-color: #008bdb;
        }
        >ul{
          border: 1px solid #ddd;
          margin:0;
          padding:10px 0;
          li{
            line-height: 24px;
            padding-left: 30px;
          }
        }
      }
      .apply{
        height: 240px;
        border: 1px solid #ddd;
        padding:10px 30px;
        box-sizing: border-box;
        background: #efe6d1 url('~assets/images/apply_bg.jpg') center center no-repeat;
        >h3{
          margin:0;
          padding: 15px 0;
          text-align: center;
          font-size: 24px;
          >img{
            vertical-align: middle;
            display: inline-block;
          }
        }
        >div{
          margin-bottom: 20px;
          h4{
            margin:0;
            line-height: 30px;
          }
          >p{
            margin:0;
            line-height: 24px;
          }
          >.el-button{
            margin-top:10px;
            width: 100%;
          }
        }
      }
    }
  }
  .tag2,.tag3{
    img{
      width: 100%;
    }
  }
  .tag3{
    .el-col{
      margin-bottom: 10px;
    }
  }
}
.doubleCol{
  width:600px;
  >.el-form-item{
    float: left;
    width: 50%;
  }
}
.singleCol >.el-form-item .el-input{
  /deep/ .el-input__inner{
    width: 500px;
  }
}
.dialogBtn {
  .el-button--primary{
    margin: 0 20px 0 90px;
    width: 140px;
  }
  .el-button--default{
    width: 100px;
  }
}
</style>
