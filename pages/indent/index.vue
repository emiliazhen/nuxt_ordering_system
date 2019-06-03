<template>
  <div class="container">
    <div class="main">
      <div class="chooseBar">
        <div class="fl">
          <el-select v-model="value" placeholder="请选择" size="small" v-for="(v, i) in 4" :key="i">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            v-model="dateChoose"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="fr">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              size="small"
              v-model="queryContent">
            </el-input>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="favoritelist"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '0',
        label: '所有分类'
      }, {
        value: '1',
        label: '戒指'
      }, {
        value: '2',
        label: '项链'
      }, {
        value: '3',
        label: '手镯'
      }, {
        value: '4',
        label: '耳环'
      }],
      value: '',
      queryContent: '',
      favoritelist: [
        {
          id: 1,
          cId: 'A001',
          imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534761258643&di=1315610293e25cf5a14c9263568cb493&imgtype=0&src=http%3A%2F%2Fwww.lgstatic.com%2Fthumbnail_300x300%2Fimage1%2FM00%2F3B%2F88%2FCgo8PFWwrL-AAkNOAAAmq7vfN-Q344.jpg%3Fcc%3D0.15560518018901348',
          goodsName: 'AU999项链',
          descript: '2017春季新款细链',
          variety: '素金',
          color: 'AU999',
          category: '项链'
        }
      ],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      dateChoose: ''
    }
  },
  methods: {
    goDetail () {
      this.$router.push('/indentDetails')
    },
    handleSelectionChange (v) {
      console.log(v)
    },
    initDateChoose () {
      let now = new Date()
      let startDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() - 30)).toISOString().slice(0, 10)
      let endDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().slice(0, 10)
      this.dateChoose = []
      this.dateChoose.push(startDate)
      this.dateChoose.push(endDate)
    }
  },
  mounted () {
    this.initDateChoose()
  }
}
</script>

<style lang="scss" scoped>
.chooseBar,
.submitBar{
  overflow: hidden;
}
.chooseBar{
  padding: 4px;
  margin: 10px 0;
  background-color: #fff;
  /deep/ .el-select .el-input__inner{
    width: 100px;
  }
}
</style>

