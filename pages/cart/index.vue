<template>
  <div class="container">
    <div class="main">
      <div class="chooseBar tl">
        <el-select v-model="compnyChoose" placeholder="请选择" size="mini">
          <el-option
            v-for="item in compnyList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-radio-group v-model="cateChoose" size="mini">
          <el-radio-button label="0" >素金</el-radio-button>
          <el-radio-button label="1">镶嵌</el-radio-button>
          <el-radio-button label="2">K金</el-radio-button>
          <el-radio-button label="3">其他</el-radio-button>
        </el-radio-group>
      </div>
      <!--startprint-->
      <el-table
        :data="tableList"
        style="width: 100%" id="out-table" v-show="true">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          type="selection"
          prop="choose"
          width="55">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.choose"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="操作">
        </el-table-column>
        <!-- <el-table-column :prop="item.code" :label="item.name" v-for="(item,i) in exList" :key="i">
        </el-table-column> -->
        <el-table-column prop="imgUrl" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" height="50">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="cId" label="供货商款号">
        </el-table-column>
        <el-table-column prop="color" label="成色">
        </el-table-column>
        <el-table-column prop="wordIn" label="字印">
        </el-table-column>
        <el-table-column prop="minWeight" label="最低克重">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-model="scope.row.minWeight"
              clearable>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="maxWeight" label="最高克重">
          <template slot-scope="scope">
            <el-input
              placeholder="请输入内容"
              v-model="scope.row.maxWeight"
              clearable>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="pevWeight" label="平均克重">
          <template slot-scope="scope">
            {{(scope.row.minWeight + scope.row.maxWeight) / 2}}
          </template>
        </el-table-column>
        <el-table-column prop="count" label="数量" class="countCell">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.count" controls-position="right" size="mini" :min="1" :max="10"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="totalWeight" label="总重量">
          <template slot-scope="scope">
            {{scope.row.pevWeight * scope.row.count}}
          </template>
        </el-table-column>
        <el-table-column prop="descript" label="规格描述">
        </el-table-column>
      </el-table>
      <!--endprint-->
      <div class="bottomBtn tl">
        <el-button type="primary" round>立即下单</el-button>
        <el-button round @click="printPage">打印</el-button>
        <el-button round @click="exportExcel">导出</el-button>
        (已选择2种不同规格商品，共100件，共1000.0克)
      </div>
    </div>

  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
// const villageList = [{value: "1", label: "姓名"}, {value: "2", label: "户编号"}, {value: "3", label: "人员编号"}, {value: "4", label: "政治面貌"}, {value: "5", label: "与户主关系"}, {value: "6", label: "性别"}, {value: "7", label: "民族"}, {value: "8", label: "证件类型"}, {value: "9", label: "证件号码"}];
export default {
  name: 'Export',
  props: {
    dialogShow: false
  },
  components: {
    FileSaver,
    XLSX
  },
  data () {
    return {
      // exList: [
      //   {id: "1", name: '图片', code: 'imgUrl'},
      //   {id: "2", name: '名称', code: 'name'},
      //   {id: "3", name: '供货商款号', code: 'cId'},
      //   {id: "4", name: '成色', code: 'color'},
      //   {id: "5", name: '字印', code: 'wordIn'},
      //   {id: "6", name: '最低克重', code: 'minWeight'},
      //   {id: "7", name: '最高克重', code: 'maxWeight'},
      //   {id: "8", name: '数量', code: 'count'},
      //   {id: "9", name: '平均克重', code: 'pevWeight'},
      //   {id: "10", name: '总重量', code: 'totalWeight'},
      //   {id: "10", name: '规格描述', code: 'descript'},
      // ],
      tableList: [
        {
          num: 1,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534761258643&di=1315610293e25cf5a14c9263568cb493&imgtype=0&src=http%3A%2F%2Fwww.lgstatic.com%2Fthumbnail_300x300%2Fimage1%2FM00%2F3B%2F88%2FCgo8PFWwrL-AAkNOAAAmq7vfN-Q344.jpg%3Fcc%3D0.15560518018901348',
          name: 'AU999项链',
          cId: 11,
          color: '白色',
          wordIn: 'xxx',
          minWeight: 0.1,
          maxWeight: 1.0,
          count: 1,
          pevWeight: 2,
          totalWeight: 1,
          descript: 'this is ..',
          choose: true
        }
      ],
      compnyList: [
        {
          value: '0',
          label: 'A公司'
        }, {
          value: '1',
          label: 'B公司'
        }, {
          value: '2',
          label: 'C公司'
        }, {
          value: '3',
          label: 'D公司'
        }, {
          value: '4',
          label: 'E公司'
        }
      ],
      compnyChoose: '0',
      cateChoose: '0'
    }
  },
  methods: {
    exportExcel () {
      console.log(this.tableList)
      // var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      // var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      // try {
      //   FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `导出表${new Date()}.xlsx`)
      // } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      // return wbout
    },
    printPage () {
      let bdhtml,sprnstr,eprnstr,prnhtml
      bdhtml = window.document.body.innerHTML
      sprnstr = '<!--startprint-->'
      eprnstr = '<!--endprint-->'
      prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr)+17)
      prnhtml = prnhtml.substring(0,prnhtml.indexOf(eprnstr))
      window.document.body.innerHTML=prnhtml
      window.print()
    }
  }
}
</script>

<style lang="scss" scoped>
.chooseBar{
  background-color: #fff;
  line-height: 40px;
  margin:10px 0;
  padding-left: 3px;
  .el-select{
    margin-right: 10px;
  }
  /deep/ .el-radio-button__inner{
    border: none;
    border-radius: 4px;
  }
}
.bottomBtn{
  margin:10px 0;
}
</style>
